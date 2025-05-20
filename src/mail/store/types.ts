export interface Email {
    id: number;
    senderEmail: string;
    senderName: string;
    content: string;
    subject: string;
    scheduledFor: Date;
}
