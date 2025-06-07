import { Email } from "@/mail/store/types";

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
  groups: {
    name: string;
    capacity: number;
  }[];
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
