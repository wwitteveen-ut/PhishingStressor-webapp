import { StateCreator } from "zustand/vanilla";
import { EmailClientState } from "./EmailClientStore";
import { UserEvent, UserEventType, ZustandEmail } from "./types";
import { sendTrackingEvents } from "../actions/actions";

type SimpleEventType =
  | UserEventType.TIME_OPENED
  | UserEventType.TIME_CLOSED
  | UserEventType.ATTACHMENT_OPENED
  | UserEventType.ATTACHMENT_CLOSED;

export interface ParticipantSlice {
  emails: ZustandEmail[];
  userEvents: UserEvent[];
  pendingEventBatch: UserEvent[];
  isProcessingEvents: boolean;
  setEmails: (emails: ZustandEmail[]) => void;
  addSimpleEvent: (type: SimpleEventType) => void;
  sendEventsToAPI: (emailId: string, events: UserEvent[]) => Promise<void>;
  clearEvents: () => void;
  processEventBatch: (emailId: string) => Promise<void>;
}

export const initialParticipantState: ParticipantSlice = {
  emails: [],
  userEvents: [],
  pendingEventBatch: [],
  isProcessingEvents: false,
  setEmails: () => {},
  addSimpleEvent: () => {},
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
      (state) => ({
        emails: emails
          .map((email) => ({
            ...email,
            isRead:
              state.emailProperties[email.id]?.isRead ?? email.isRead ?? false,
            isTrashed:
              state.emailProperties[email.id]?.isTrashed ??
              email.isTrashed ??
              false,
          }))
          .sort((a, b) => b.scheduledFor - a.scheduledFor),
        emailProperties: state.emailProperties,
      }),
      undefined,
      "participant/setEmails",
    ),

  addSimpleEvent: (type: SimpleEventType) =>
    set(
      (state) => ({
        userEvents: [
          ...state.userEvents,
          {
            type,
            timestamp: Date.now().toString(),
          },
        ],
      }),
      undefined,
      "participant/addSimpleEvent",
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
    set({ userEvents: [] }, undefined, "participant/clearEvents"),

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
        "participant/endProcessing",
      );
    }
  },
});
