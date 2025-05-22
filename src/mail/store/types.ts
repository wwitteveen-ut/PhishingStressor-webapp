export interface Email {
    id: string;
    senderEmail: string;
    senderName: string;
    content: string;
    subject: string;
    scheduledFor: Date;
}
