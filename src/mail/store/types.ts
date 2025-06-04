import { DataPoint } from 'heatmap-ts';

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

export interface ZustandEmail extends Email, EmailProperties {
  sendAt: Date;
}

export enum UserEventType {
  TIME_OPENED = "TIME_OPENED",
  TIME_CLOSED = "TIME_CLOSED",
  ATTACHMENT_OPENED = "ATTACHMENT_OPENED",
  ATTACHMENT_CLOSED = "ATTACHMENT_CLOSED",
  HEATMAP = "HEATMAP",
  OTHER = "OTHER"
}

export interface UserEvent {
  type: UserEventType;
  timestamp: string;
  extra?: DataPoint[];
}
