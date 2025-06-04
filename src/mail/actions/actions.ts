"use server";
import { auth } from "@/auth";
import { Email, EmailAttachmentData, ZustandEmail } from "../store/types";
import { getExternalApiUrl } from "@/shared/utils/externalApiHelper";
import { getApiUrl } from "@/shared/utils/apiHelper";
import { cookies } from "next/headers";

export const getEmail = async (id: number): Promise<Email> => {
    const token = await auth();
    if (!token){
        throw new Error("not good!");
    }
    const path = await getExternalApiUrl(`/api/experiments/${token.user.experimentId}/emails/${id}`);
    const response = await fetch(path);

    const data = await response.json();
    return data;
}

export const getParticipantEmails = async ():Promise<ZustandEmail[]> => {

  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("authjs.session-token")?.value;
  const session = await auth();
  if (!session || !sessionCookie) {
      throw new Error("Unauthorized");
  }


  const path = getApiUrl(`/api/emails`);
  const response = await fetch(path, {
    headers: {
      Cookie: `authjs.session-token=${sessionCookie}`,
    },
  });

  if(response.ok){
    const emails = await response.json() as ZustandEmail[];
    return emails;
  }
  throw new Error(`Failed to fetch emails: ${response.statusText}`);
}

export const downloadAttachment = async (emailId: string, attachmentData: EmailAttachmentData) => {
    const token = await auth();
    if (!token) {
        throw new Error("not good!");
    }
    
    const path = await getExternalApiUrl(`/api/experiments/${token.user.experimentId}/emails/${emailId}/attachments/${attachmentData.id}`);
    const response = await fetch(path);
    
    if (!response.ok) {
        throw new Error(`Failed to download attachment: ${response.statusText}`);
    }
    
    const contentType = response.headers.get("Content-Type") || "application/octet-stream";
    const fileBuffer = await response.arrayBuffer();
    
    return {
        buffer: fileBuffer,
        contentType,
        filename: attachmentData.filename
    };
}

export const sendReply = async (emailId: string, formData: FormData) => {
  try {
    const token = await auth();
    if (!token) {
      throw new Error("Authentication failed: No token received");
    }

    const path = await getExternalApiUrl(
      `/api/experiments/${token.user.experimentId}/emails/${emailId}/replies`
    );

    const response = await fetch(path, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to send reply: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const result = await response.json();
    console.log("Reply sent successfully:", result);
    return result;
  } catch (error) {
    console.error("Error sending reply:", error);
    throw error;
  }
};