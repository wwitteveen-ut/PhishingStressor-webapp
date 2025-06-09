import { Email, UserEvent } from "@/mail/store/types";

export interface Experiment {
  id: string;
  name: string;
  duration: number;
  researchers: {
    id: string;
    username: string;
  }[];
  groups: {
    id: string;
    experimentId: string;
    name: string;
    capacity: number;
  }[];
}

export interface ResearcherEmail extends Email {
  isPhishing: boolean;
}

export interface ExperimentCreatePayload {
  name: string;
  duration: number;
  researchers: string[];
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
    "id" | "createdAt" | "experimentId" | "attachments"
  > {
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

export type ExperimentStats = Map<string, ParticipantStats>;

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
  emails: Map<string, EmailStats>;
}
