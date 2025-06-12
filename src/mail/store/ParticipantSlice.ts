import { notifications } from "@mantine/notifications";
import { DataPoint } from "heatmap-ts";
import { StateCreator } from "zustand/vanilla";
import { sendTrackingEvents } from "../actions/actions";
import { EmailClientState } from "./EmailClientStore";
import { UserEvent, UserEventType, ZustandEmail } from "./types";

type SimpleEventType =
  | UserEventType.TIME_OPENED
  | UserEventType.TIME_CLOSED
  | UserEventType.LINK_CLICKED
  | UserEventType.ATTACHMENT_OPENED
  | UserEventType.ATTACHMENT_CLOSED;

type ComplexEventType =
  | UserEventType.HEATMAP
  | UserEventType.LINK_HOVERED
  | UserEventType.CLICK;

export interface ParticipantSlice {
  emails: ZustandEmail[];
  userEvents: UserEvent[];
  heatmapData: DataPoint[];
  pendingEventBatch: UserEvent[];
  isProcessingEvents: boolean;
  setEmails: (emails: ZustandEmail[]) => void;
  addSimpleEvent: (type: SimpleEventType) => void;
  addComplexEvent: (type: ComplexEventType, extra: string) => void;
  addHeatmapData: (data: DataPoint) => void;
  sendEventsToAPI: (emailId: string, events: UserEvent[]) => Promise<void>;
  clearEvents: () => void;
  processEventBatch: (emailId: string) => Promise<void>;
}

export const initialParticipantState: ParticipantSlice = {
  emails: [],
  userEvents: [],
  heatmapData: [],
  pendingEventBatch: [],
  isProcessingEvents: false,
  setEmails: () => {},
  addSimpleEvent: () => {},
  addComplexEvent: () => {},
  addHeatmapData: () => {},
  sendEventsToAPI: async () => {},
  clearEvents: () => {},
  processEventBatch: async () => {},
};

export const createParticipantSlice: StateCreator<
  EmailClientState,
  [["zustand/devtools", never]],
  [],
  ParticipantSlice
> = (set, get) => ({
  ...initialParticipantState,
  setEmails: (emails: ZustandEmail[]) =>
    set(
      (state) => {
        const existingEmailIds = new Set(Object.keys(state.emailProperties));
        const newEmails = emails.filter(
          (email) => !existingEmailIds.has(email.id)
        );

        if (newEmails.length > 0) {
          notifications.show({
            title: `Received ${newEmails.length} new email${
              newEmails.length === 1 ? "" : "s"
            }!`,
            message: "",
          });
        }

        return {
          emails: emails
            .map((email) => ({
              ...email,
              isRead:
                state.emailProperties[email.id]?.isRead ??
                email.isRead ??
                false,
              isTrashed:
                state.emailProperties[email.id]?.isTrashed ??
                email.isTrashed ??
                false,
              hasReplied:
                state.emailProperties[email.id]?.hasReplied ??
                email.hasReplied ??
                false,
            }))
            .sort((a, b) => b.scheduledFor - a.scheduledFor),
          emailProperties: {
            ...state.emailProperties,
            ...Object.fromEntries(
              newEmails.map((email) => [
                email.id,
                {
                  isTrashed: false,
                  isRead: false,
                  hasReplied: false,
                },
              ])
            ),
          },
        };
      },
      undefined,
      "participant/setEmails"
    ),

  addSimpleEvent: (type: SimpleEventType) =>
    set(
      (state) => {
        return {
          userEvents: [
            ...state.userEvents,
            {
              type,
              timestamp: new Date().toISOString(),
            },
          ],
        };
      },
      undefined,
      "participant/addSimpleEvent"
    ),
  addComplexEvent: (type: ComplexEventType, extra: string) =>
    set(
      (state) => ({
        userEvents: [
          ...state.userEvents,
          {
            type,
            timestamp: new Date().toISOString(),
            extra,
          },
        ],
      }),
      undefined,
      "participant/addComplexEvent"
    ),
  addHeatmapData: (data: DataPoint) =>
    set(
      (state) => ({
        heatmapData: [...state.heatmapData, data],
      }),
      undefined,
      "participant/addHeatmapData"
    ),

  sendEventsToAPI: async (emailId: string, events: UserEvent[]) => {
    try {
      const result = await sendTrackingEvents(emailId, events);

      if (!result) {
        throw new Error(`API call failed`);
      }
    } catch (error) {
      console.error("Failed to send events to API:", error);
      throw error;
    }
  },

  clearEvents: () =>
    set(
      { userEvents: [], heatmapData: [] },
      undefined,
      "participant/clearEvents"
    ),

  processEventBatch: async (emailId: string) => {
    const state = get();

    if (state.isProcessingEvents || state.userEvents.length === 0) {
      return;
    }

    set({ isProcessingEvents: true }, undefined, "participant/startProcessing");

    try {
      const eventsToSend = [...state.userEvents];

      await state.sendEventsToAPI(emailId, eventsToSend);

      state.clearEvents();
    } catch (error) {
      console.error("Failed to process event batch:", error);
    } finally {
      set(
        { isProcessingEvents: false },
        undefined,
        "participant/endProcessing"
      );
    }
  },
});
