import { Email, UserEvent } from "@/mail/store/types";

export interface Experiment {
  id: string;
  name: string;
  duration: number;
  researchers: {
    id: string;
    username: string;
  }[];
  groups: IGroup[];
}

export interface ResearcherEmail extends Email {
  isPhishing: boolean;
  groups: IGroup[];
}

export interface ExperimentCreatePayload {
  name: string;
  duration: number;
  researcherIds: string[];
  groups: IGroupBase[];
}

export interface IGroupBase {
  name: string;
  capacity: number;
}

export interface IGroup extends IGroupBase {
  id: string;
  experimentId: string;
}

export interface EmailCreate
  extends Omit<
    ResearcherEmail,
    | "id"
    | "createdAt"
    | "experimentId"
    | "attachments"
    | "senderAddress"
    | "groups"
  > {
  senderEmail: string;
  groups: string[];
}

export interface EmailCreatePayload {
  metadata: EmailCreate;
  files: File[];
}

export interface ApiUser {
  id: string;
  username: string;
}

export type ExperimentStats = Record<string, ParticipantStats>;

export type ReplyData = {
  content: string;
  createdAt: Date;
};
export type EmailStats = {
  replies: ReplyData[];
  events: UserEvent[];
};

export interface ParticipantStats {
  groupId: string;
  loggedIn: Date;
  emails: Record<string, EmailStats>;
}
