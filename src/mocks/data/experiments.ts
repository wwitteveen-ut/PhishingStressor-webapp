import { Experiment, IGroup } from "@/researcher/store/types";
import { researchers } from "./accounts";

export const mockGroups: IGroup[] = [
  {
    id: "d4e5f6a7-8b9c-0d1e-2f3a-4b5c6d7e8f9a",
    experimentId: "a1b2c3d4-5e6f-7a8b-9c0d-1e2f3a4b5c6d",
    name: "GROUP_A",
    capacity: 15,
  },
  {
    id: "e5f6a7b8-9c0d-1e2f-3a4b-5c6d7e8f9a0b",
    experimentId: "a1b2c3d4-5e6f-7a8b-9c0d-1e2f3a4b5c6d",
    name: "GROUP_B",
    capacity: 10,
  },
  {
    id: "f2a3b4c5-6d7e-8f9a-0b1c-2d3e4f5a6b7c",
    experimentId: "c9d0e1f2-3a4b-5c6d-7e8f-9a0b1c2d3e4f",
    name: "GROUP_Y",
    capacity: 12,
  },
  {
    id: "a3b4c5d6-7e8f-9a0b-1c2d-3e4f5a6b7c8d",
    experimentId: "c9d0e1f2-3a4b-5c6d-7e8f-9a0b1c2d3e4f",
    name: "GROUP_Z",
    capacity: 18,
  },
];

export const mockExperiments: Experiment[] = [
  {
    id: "a1b2c3d4-5e6f-7a8b-9c0d-1e2f3a4b5c6d",
    name: "experiment101",
    duration: 45,
    researchers: [researchers[0], researchers[1]],
    groups: mockGroups,
  },
  {
    id: "f6a7b8c9-0d1e-2f3a-4b5c-6d7e8f9a0b1c",
    name: "experiment102",
    duration: 90,
    researchers: [researchers[2]],
    groups: [mockGroups[0], mockGroups[1]],
  },
  {
    id: "c9d0e1f2-3a4b-5c6d-7e8f-9a0b1c2d3e4f",
    name: "experiment103",
    duration: 30,
    researchers: [researchers[3], researchers[4]],
    groups: [mockGroups[0]],
  },
  {
    id: "b4c5d6e7-8f9a-0b1c-2d3e-4f5a6b7c8d9e",
    name: "experiment104",
    duration: 120,
    researchers: [researchers[4]],
    groups: [mockGroups[0], mockGroups[2]],
  },
  {
    id: "e7f8a9b0-1c2d-3e4f-5a6b-7c8d9e0f1a2b",
    name: "experiment105",
    duration: 75,
    researchers: [researchers[0], researchers[1]],
    groups: [mockGroups[0], mockGroups[1]],
  },
  {
    id: "d2e3f4a5-6b7c-8d9e-0f1a-2b3c4d5e6f7a",
    name: "experiment106",
    duration: 60,
    researchers: [researchers[0], researchers[1]],
    groups: [mockGroups[1], mockGroups[2]],
  },
];
