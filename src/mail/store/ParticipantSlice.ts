import { StateCreator } from "zustand/vanilla";
import { EmailClientState } from "./EmailClientStore";
import { ZustandEmail } from "./types";

export interface ParticipantSlice {
  emails: ZustandEmail[];
  startedAt: Date;
  setEmails: (emails: ZustandEmail[]) => void;
  setDate: (date: Date) => void;
}

export const initialParticipantState: ParticipantSlice = {
  emails: [],
  startedAt: new Date(),
  setEmails: () => {},
  setDate: () => {},
};

export const createParticipantSlice: StateCreator<
  EmailClientState,
  [["zustand/devtools", never]],
  [],
  ParticipantSlice
> = (set) => ({
  ...initialParticipantState,
  setEmails: (emails: ZustandEmail[]) =>
    set(
      (state) => ({
        emails: emails
          .map((email) => ({
            ...email,
            isRead:
              state.emailProperties[email.id]?.isRead ?? email.isRead ?? false,
          }))
          .sort((a, b) => b.scheduledFor - a.scheduledFor),
        emailProperties: state.emailProperties,
      }),
      undefined,
      "participant/setEmails",
    ),
});
