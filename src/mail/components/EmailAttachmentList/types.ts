import { EmailAttachmentData } from "@/mail/store/types";

export type EmailAttachmentListProps = {
  emailId: string;
  attachments: EmailAttachmentData[];
  isPreview ?: boolean;
};