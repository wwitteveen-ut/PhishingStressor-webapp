import { EmailAttachmentData } from "@/mail/store/types";

export type EmailAttachmentListItemProps = {
  emailId: string;
  attachmentData: EmailAttachmentData;
};
