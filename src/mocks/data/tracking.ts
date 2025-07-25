import { participants } from "./accounts";
import { mockEmails } from "./emails";
import { mockExperiments } from "./experiments";

export const mockTrackingData = {
  [participants[0].id]: {
    groupId: mockExperiments[0].groups[0].id,
    loggedIn: new Date("2025-06-01T09:00:00.000Z"),
    emails: {
      [mockEmails[0].id]: {
        replies: [
          {
            content: "Thanks for the info, I'm available at 2 PM.",
            createdAt: new Date("2025-06-01T09:05:00.000Z"),
          },
        ],
        events: [
          { type: "TIME_OPENED", timestamp: "2025-06-01T09:01:00.000Z" },
          {
            type: "ATTACHMENT_DOWNLOADED",
            timestamp: "2025-06-01T09:02:00.000Z",
          },
          {
            type: "HEATMAP",
            timestamp: "2025-06-01T09:03:00.000Z",
            extra: JSON.stringify([
              { x: 0.188, y: 0.409, value: 100 },
              { x: 0.186, y: 0.403, value: 100 },
              { x: 0.309, y: 0.338, value: 100 },
              { x: 0.32, y: 0.288, value: 100 },
              { x: 0.322, y: 0.289, value: 100 },
            ]),
          },
          {
            type: "CLICK",
            timestamp: "2025-06-01T09:04:00.000Z",
            extra: JSON.stringify([
              { x: 0.200, y: 0.410, value: 100 },
              { x: 0.202, y: 0.412, value: 100 },
            ]),
          },
          {
            type: "LINK_CLICK",
            timestamp: "2025-06-01T09:06:00.000Z",
          },
          {
            type: "LINK_HOVERED",
            timestamp: "2025-06-01T09:07:00.000Z",
            extra: JSON.stringify({ duration: 1500 }),
          },
          { type: "TIME_CLOSED", timestamp: "2025-06-01T09:12:00.000Z" },
        ],
      },
      [mockEmails[1].id]: {
        replies: [],
        events: [
          { type: "TIME_OPENED", timestamp: "2025-06-01T09:10:00.000Z" },
          {
            type: "HEATMAP",
            timestamp: "2025-06-01T09:11:00.000Z",
            extra: JSON.stringify([
              { x: 0.374, y: 0.395, value: 100 },
              { x: 0.377, y: 0.34, value: 100 },
              { x: 0.376, y: 0.337, value: 100 },
              { x: 0.539, y: 0.326, value: 100 },
            ]),
          },
          {
            type: "LINK_HOVERED",
            timestamp: "2025-06-01T09:11:30.000Z",
            extra: JSON.stringify({ duration: 2000 }),
          },
          {
            type: "CLICK",
            timestamp: "2025-06-01T09:11:45.000Z",
            extra: JSON.stringify([
              { x: 0.380, y: 0.340, value: 100 },
              { x: 0.382, y: 0.342, value: 100 },
            ]),
          },
          { type: "TIME_CLOSED", timestamp: "2025-06-01T09:12:00.000Z" },
        ],
      },
      [mockEmails[3].id]: {
        replies: [],
        events: [
          { type: "TIME_OPENED", timestamp: "2025-06-01T09:15:00.000Z" },
          {
            type: "ATTACHMENT_DOWNLOADED",
            timestamp: "2025-06-01T09:16:00.000Z",
          },
          {
            type: "LINK_HOVERED",
            timestamp: "2025-06-01T09:16:30.000Z",
            extra: JSON.stringify({ duration: 1000 }),
          },
        ],
      },
    },
  },
  [participants[1].id]: {
    groupId: mockExperiments[0].groups[1].id,
    loggedIn: new Date("2025-06-01T09:15:00.000Z"),
    emails: {
      [mockEmails[0].id]: {
        replies: [],
        events: [
          { type: "TIME_OPENED", timestamp: "2025-06-01T09:16:00.000Z" },
          {
            type: "HEATMAP",
            timestamp: "2025-06-01T09:17:30.000Z",
            extra: JSON.stringify([
              { x: 0.683, y: 0.34, value: 100 },
              { x: 0.675, y: 0.335, value: 100 },
              { x: 0.509, y: 0.296, value: 100 },
            ]),
          },
          {
            type: "CLICK",
            timestamp: "2025-06-01T09:17:45.000Z",
            extra: JSON.stringify([
              { x: 0.680, y: 0.338, value: 100 },
              { x: 0.682, y: 0.340, value: 100 },
            ]),
          },
        ],
      },
      [mockEmails[2].id]: {
        replies: [
          {
            content: "Looks good, thanks for resolving!",
            createdAt: new Date("2025-06-01T09:20:00.000Z"),
          },
        ],
        events: [
          { type: "TIME_OPENED", timestamp: "2025-06-01T09:18:00.000Z" },
          {
            type: "HEATMAP",
            timestamp: "2025-06-01T09:19:00.000Z",
            extra: JSON.stringify([
              { x: 0.435, y: 0.297, value: 100 },
              { x: 0.345, y: 0.299, value: 100 },
              { x: 0.323, y: 0.293, value: 100 },
            ]),
          },
          {
            type: "LINK_CLICK",
            timestamp: "2025-06-01T09:19:30.000Z",
          },
          {
            type: "LINK_HOVERED",
            timestamp: "2025-06-01T09:19:15.000Z",
            extra: JSON.stringify({ duration: 1200 }),
          },
        ],
      },
    },
  },
  [participants[2].id]: {
    groupId: mockExperiments[0].groups[0].id,
    loggedIn: new Date("2025-06-01T09:30:00.000Z"),
    emails: {
      [mockEmails[4].id]: {
        replies: [
          {
            content: "I'll be there for the meeting!",
            createdAt: new Date("2025-06-01T09:35:00.000Z"),
          },
        ],
        events: [
          { type: "TIME_OPENED", timestamp: "2025-06-01T09:31:00.000Z" },
          {
            type: "ATTACHMENT_DOWNLOADED",
            timestamp: "2025-06-01T09:32:00.000Z",
          },
          {
            type: "HEATMAP",
            timestamp: "2025-06-01T09:33:00.000Z",
            extra: JSON.stringify([
              { x: 0.25, y: 0.45, value: 100 },
              { x: 0.26, y: 0.46, value: 100 },
              { x: 0.27, y: 0.47, value: 100 },
              { x: 0.28, y: 0.48, value: 100 },
              { x: 0.29, y: 0.49, value: 100 },
            ]),
          },
          {
            type: "CLICK",
            timestamp: "2025-06-01T09:33:30.000Z",
            extra: JSON.stringify([
              { x: 0.255, y: 0.455, value: 100 },
              { x: 0.257, y: 0.457, value: 100 },
            ]),
          },
          {
            type: "LINK_HOVERED",
            timestamp: "2025-06-01T09:34:00.000Z",
            extra: JSON.stringify({ duration: 1800 }),
          },
        ],
      },
      [mockEmails[5].id]: {
        replies: [],
        events: [
          { type: "TIME_OPENED", timestamp: "2025-06-01T09:40:00.000Z" },
          {
            type: "LINK_HOVERED",
            timestamp: "2025-06-01T09:41:00.000Z",
            extra: JSON.stringify({ duration: 900 }),
          },
          { type: "TIME_CLOSED", timestamp: "2025-06-01T09:42:00.000Z" },
        ],
      },
    },
  },
  [participants[3].id]: {
    groupId: mockExperiments[0].groups[1].id,
    loggedIn: new Date("2025-06-01T09:45:00.000Z"),
    emails: {
      [mockEmails[6].id]: {
        replies: [
          {
            content: "I'll review the benefits package soon.",
            createdAt: new Date("2025-06-01T09:50:00.000Z"),
          },
        ],
        events: [
          { type: "TIME_OPENED", timestamp: "2025-06-01T09:46:00.000Z" },
          {
            type: "HEATMAP",
            timestamp: "2025-06-01T09:48:00.000Z",
            extra: JSON.stringify([
              { x: 0.15, y: 0.35, value: 100 },
              { x: 0.16, y: 0.36, value: 100 },
              { x: 0.17, y: 0.37, value: 100 },
              { x: 0.18, y: 0.38, value: 100 },
            ]),
          },
          {
            type: "CLICK",
            timestamp: "2025-06-01T09:48:30.000Z",
            extra: JSON.stringify([
              { x: 0.155, y: 0.355, value: 100 },
              { x: 0.157, y: 0.357, value: 100 },
            ]),
          },
          {
            type: "LINK_CLICK",
            timestamp: "2025-06-01T09:49:00.000Z",
          },
          {
            type: "LINK_HOVERED",
            timestamp: "2025-06-01T09:48:45.000Z",
            extra: JSON.stringify({ duration: 2500 }),
          },
        ],
      },
    },
  },
};