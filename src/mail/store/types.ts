export interface EmailAttachmentData {
  filename: string;
  id: string;
}

export interface Email {
  id: string;
  createdAt: string;
  isPhishing: boolean;
  senderName: string;
  senderAddress: string;
  title: string;
  content: string;
  scheduledFor: number;
  experimentId: string;
  attachments: EmailAttachmentData[];
}

export interface EmailProperties {
  isRead: boolean;
  isTrashed: boolean;
}

export interface ZustandEmail extends Email, EmailProperties {}
