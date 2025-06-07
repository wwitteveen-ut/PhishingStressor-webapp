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

export interface ApiUser {
  id: string;
  username: string;
}