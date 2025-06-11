"use server";

import { auth, Role } from "@/auth";
import { getApiUrl } from "@/shared/utils/apiHelper";
import { makeAuthenticatedRequest } from "@/shared/utils/authHelper";
import { cookies } from "next/headers";
import { EmailAttachmentData, UserEvent, ZustandEmail } from "../store/types";

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
  const session = await auth();
  if (!session?.user?.apiToken) {
    throw new Error("Not authenticated or missing API token");
  }
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

  const response = await makeAuthenticatedRequest(
    `/experiments/${session.user.experimentId}/emails/${emailId}/attachments/${attachmentData.id}`,
    Role.PARTICIPANT
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

export const sendReply = async (
  emailId: string,
  replyData: { content: string }
) => {
  try {
    const session = await auth();
    if (!session?.user?.experimentId) {
      throw new Error("Authentication failed: Missing experiment ID");
    }

    const response = await makeAuthenticatedRequest(
      `/experiments/${session.user.experimentId}/emails/${emailId}/replies`,
      Role.PARTICIPANT,
      {
        method: "POST",
        body: JSON.stringify(replyData),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      return { success: false, error: error };
    }

    const result = await response.json();
    console.log("Reply sent successfully:", result);
    return { success: true, result };
  } catch (error) {
    console.error("Error sending reply:", error);
    return { success: false };
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
    console.log(userEvents);

    const response = await makeAuthenticatedRequest(
      `/experiments/${session.user.experimentId}/emails/${emailId}/tracking`,
      Role.PARTICIPANT,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          events: userEvents,
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to send tracking events: ${response.status} ${response.statusText} - ${errorText}`
      );
    }

    return true;
  } catch (error) {
    console.error("Error sending tracking events:", error);
    throw error;
  }
};
