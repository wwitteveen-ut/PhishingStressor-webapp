export interface Email {
    id: string;
    senderEmail: string;
    senderName: string;
    content: string;
    subject: string;
    scheduledFor: Date;
}

export interface EmailProperties {
  isRead: boolean;
}

export interface ZustandEmail extends Email, EmailProperties {}
