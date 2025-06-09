"use server";

import { auth } from "@/auth";
import { getApiUrl } from "@/shared/utils/apiHelper";
import { getExternalApiUrl } from "@/shared/utils/externalApiHelper";
import { cookies } from "next/headers";
import { EmailAttachmentData, UserEvent, ZustandEmail } from "../store/types";

async function makeAuthenticatedExternalRequest(
  endpoint: string,
  options: RequestInit = {}
) {
  const session = await auth();

  if (!session?.user?.apiToken) {
    throw new Error("Not authenticated or missing API token");
  }

  const url = await getExternalApiUrl(endpoint);

  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${session.user.apiToken}`,
      ...(options.body instanceof FormData
        ? {}
        : { "Content-Type": "application/json" }),
    },
  });
}

async function makeAuthenticatedInternalRequest(
  endpoint: string,
  options: RequestInit = {}
) {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("authjs.session-token")?.value;
  const session = await auth();

  if (!session || !sessionCookie) {
    throw new Error("Unauthorized");
  }

  const url = getApiUrl(endpoint);

  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Cookie: `authjs.session-token=${sessionCookie}`,
      ...(options.body instanceof FormData
        ? {}
        : { "Content-Type": "application/json" }),
    },
  });
}

export const getParticipantEmails = async (): Promise<ZustandEmail[]> => {
  const response = await makeAuthenticatedInternalRequest(`/emails`);

  if (!response.ok) {
    throw new Error(`Failed to fetch emails: ${response.statusText}`);
  }

  const emails = (await response.json()) as ZustandEmail[];
  return emails;
};

export const downloadAttachment = async (
  emailId: string,
  attachmentData: EmailAttachmentData
) => {
  const session = await auth();
  if (!session?.user?.experimentId) {
    throw new Error("Authentication failed: Missing experiment ID");
  }

  const response = await makeAuthenticatedExternalRequest(
    `/experiments/${session.user.experimentId}/emails/${emailId}/attachments/${attachmentData.id}`
  );

  if (!response.ok) {
    throw new Error(`Failed to download attachment: ${response.statusText}`);
  }

  const contentType =
    response.headers.get("Content-Type") || "application/octet-stream";
  const fileBuffer = await response.arrayBuffer();

  return {
    buffer: fileBuffer,
    contentType,
    filename: attachmentData.filename,
  };
};

export const sendReply = async (emailId: string, formData: FormData) => {
  try {
    const session = await auth();
    if (!session?.user?.experimentId) {
      throw new Error("Authentication failed: Missing experiment ID");
    }

    const response = await makeAuthenticatedExternalRequest(
      `/experiments/${session.user.experimentId}/emails/${emailId}/replies`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to send reply: ${response.status} ${response.statusText} - ${errorText}`
      );
    }

    const result = await response.json();
    console.log("Reply sent successfully:", result);
    return result;
  } catch (error) {
    console.error("Error sending reply:", error);
    throw error;
  }
};

export const sendTrackingEvents = async (
  emailId: string,
  userEvents: UserEvent[]
): Promise<boolean> => {
  try {
    const session = await auth();
    if (!session?.user?.experimentId) {
      throw new Error("Authentication failed: Missing experiment ID");
    }

    const response = await makeAuthenticatedExternalRequest(
      `/experiments/${session.user.experimentId}/emails/${emailId}/tracking`,
      {
        method: "POST",
        body: JSON.stringify(userEvents),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to send tracking events: ${response.status} ${response.statusText} - ${errorText}`
      );
    }

    const result = await response.json();
    console.log("Tracking info sent successfully:", result);
    return true;
  } catch (error) {
    console.error("Error sending tracking events:", error);
    throw error;
  }
};
