import { StateCreator } from "zustand";
import { EmailClientState } from "./EmailClientStore";
import { EmailProperties, UserEventType } from "./types";

export interface UISlice {
  username: string;
  selectedCategory: string;
  emailProperties: Record<string, EmailProperties>;
  searchQuery: string;
  selectedEmailId: string | null;
  previousEmailId: string | null;
  isReplying: boolean;
  setUsername: (query: string) => void;
  setSearchQuery: (query: string) => void;
  selectEmailId: (emailId: string) => void;
  setIsReplying: (isReplying: boolean) => void;
  setHasReplied: (emailId: string) => void;
  toggleEmailRead: (emailId: string) => void;
  toggleEmailTrashed: (emailId: string) => void;
  selectCategory: (category: string) => void;
  getUnreadCount: () => number;
  reset: () => void;
}

export const initialUISliceState: UISlice = {
  username: "",
  selectedCategory: "inbox",
  emailProperties: {},
  searchQuery: "",
  selectedEmailId: null,
  previousEmailId: null,
  isReplying: false,
  setUsername: () => {},
  setSearchQuery: () => {},
  selectEmailId: () => {},
  setIsReplying: () => {},
  setHasReplied: () => {},
  toggleEmailRead: () => {},
  toggleEmailTrashed: () => {},
  selectCategory: () => {},
  getUnreadCount: () => 0,
  reset: () => {},
};

export const createUISlice: StateCreator<
  EmailClientState,
  [["zustand/devtools", never], ["zustand/subscribeWithSelector", never]],
  [],
  UISlice
> = (set, get) => ({
  ...initialUISliceState,
  setUsername: (username: string) =>
    set({ username: username }, undefined, "ui/setUsername"),
  setSearchQuery: (query: string) =>
    set({ searchQuery: query }, undefined, "ui/setSearchQuery"),

  selectEmailId: async (emailId: string) => {
    const state = get();
    const currentSelectedId = state.selectedEmailId;

    if (currentSelectedId === emailId) {
      return;
    }

    if (currentSelectedId) {
      if (state.heatmapData.length > 0) {
        state.addComplexEvent(
          UserEventType.HEATMAP,
          JSON.stringify(state.heatmapData)
        );
      }

      state.addSimpleEvent(UserEventType.TIME_CLOSED);

      try {
        await state.processEventBatch(currentSelectedId);
      } catch (error) {
        console.error("Failed to send events when switching emails:", error);
      }
    }

    set(
      (state) => {
        const isCurrentlyRead =
          state.emailProperties[emailId]?.isRead ??
          state.emails.find((email) => email.id === emailId)?.isRead ??
          false;

        if (!isCurrentlyRead) {
          state.toggleEmailRead(emailId);
        }

        state.setIsReplying(false);

        return {
          selectedEmailId: emailId,
          previousEmailId: currentSelectedId,
        };
      },
      undefined,
      "ui/selectEmailId"
    );

    state.addSimpleEvent(UserEventType.TIME_OPENED);
  },

  selectCategory: (category: string) =>
    set({ selectedCategory: category }, undefined, "ui/selectCategory"),

  setIsReplying: (isReplying: boolean) =>
    set({ isReplying: isReplying }, undefined, "ui/setIsReplying"),
  setHasReplied: (emailId: string) =>
    set(
      (state) => ({
        emails: state.emails.map((email) =>
          email.id === emailId ? { ...email, hasReplied: true } : email
        ),
        emailProperties: {
          ...state.emailProperties,
          [emailId]: {
            ...(state.emailProperties[emailId] ?? { hasReplied: false }),
            hasReplied: true,
          },
        },
      }),
      undefined,
      "ui/setHasReplied"
    ),

  getUnreadCount: () => {
    const { emails, emailProperties } = get();
    return emails.reduce((count, email) => {
      const isRead = emailProperties[email.id]?.isRead ?? email.isRead ?? false;
      return isRead ? count : count + 1;
    }, 0);
  },

  toggleEmailRead: (emailId: string) =>
    set(
      (state) => ({
        emails: state.emails.map((email) =>
          email.id === emailId ? { ...email, isRead: !email.isRead } : email
        ),
        emailProperties: {
          ...state.emailProperties,
          [emailId]: {
            ...(state.emailProperties[emailId] ?? { isRead: false }),
            isRead: !(state.emailProperties[emailId]?.isRead ?? false),
          },
        },
      }),
      undefined,
      "ui/toggleEmailRead"
    ),

  toggleEmailTrashed: (emailId: string) =>
    set(
      (state) => {
        const currentIsTrashed =
          state.emailProperties[emailId]?.isTrashed ?? false;
        const newIsTrashed = !currentIsTrashed;
        const currentSelectedIsTrashed = state.selectedEmailId === emailId;

        if (currentSelectedIsTrashed) {
          state.addSimpleEvent(UserEventType.TIME_CLOSED);
        }
        return {
          emails: state.emails.map((email) =>
            email.id === emailId ? { ...email, isTrashed: newIsTrashed } : email
          ),
          emailProperties: {
            ...state.emailProperties,
            [emailId]: {
              ...(state.emailProperties[emailId] ?? {}),
              isTrashed: newIsTrashed,
            },
          },
          selectedEmailId: currentSelectedIsTrashed
            ? null
            : state.selectedEmailId,
        };
      },
      undefined,
      "ui/toggleEmailTrashed"
    ),
  reset: () =>
    set(
      {
        emailProperties: {},
      },
      undefined,
      "ui/reset"
    ),
});
