import { StateCreator } from 'zustand/vanilla';
import { EmailClientState } from './EmailClientStore';
import { Email, EmailProperties, ZustandEmail } from './types';

export interface ParticipantSlice {
  emails: ZustandEmail[];
  emailProperties: Record<string, EmailProperties>;
  setEmails: (emails: ZustandEmail[]) => void;
  toggleEmailRead: (emailId: string) => void;
}

export const createParticipantSlice: StateCreator<
  EmailClientState,
  [['zustand/devtools', never]],
  [],
  ParticipantSlice
> = (set) => ({
  emails: [],
  emailProperties: {},
  setEmails: (emails: ZustandEmail[]) =>
    set(
      (state) => ({
        emails: emails
          .map((email) => ({
            ...email,
            isRead: state.emailProperties[email.id]?.isRead ?? email.isRead ?? false,
          }))
          .sort((a, b) => a.scheduledFor - b.scheduledFor),
        emailProperties: state.emailProperties,
      }),
      undefined,
      'ui/setEmails'
    ),
    toggleEmailRead: (emailId: string) =>
    set(
      (state) => ({
        emails: state.emails.map((email) =>
          email.id === emailId
            ? { ...email, isRead: !email.isRead }
            : email
        ),
        emailProperties: {
          ...state.emailProperties,
          [emailId]: {
            ...state.emailProperties[emailId] ?? { isArchived: false, isStarred: false },
            isRead: !(state.emailProperties[emailId]?.isRead ?? false),
          },
        },
      }),
      undefined,
      'ui/toggleEmailRead'
    ),
});