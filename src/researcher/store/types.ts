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