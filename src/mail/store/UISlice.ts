import { StateCreator } from 'zustand/vanilla';
import { EmailClientState } from './EmailClientStore';
import { Email, EmailProperties, ZustandEmail } from './types';


export interface UISlice {
  selectedCategory: string;
  emailProperties: Record<string, EmailProperties>;
  searchQuery: string;
  selectedEmailId: string | null;
  setSearchQuery: (query: string) => void;
  selectEmailId: (emailId: string) => void;
  toggleEmailRead: (emailId: string) => void;
  toggleEmailTrashed: (emailId: string) => void;
  selectCategory: (category: string) => void;
  getUnreadCount: () => number;
}

export const initialUISliceState: UISlice = {
  selectedCategory: 'inbox',
  emailProperties: {},
  searchQuery: '',
  selectedEmailId: null,
  setSearchQuery: () => {},
  selectEmailId: () => {},
  toggleEmailRead: () => {},
  toggleEmailTrashed: () => {},
  selectCategory: () => {},
  getUnreadCount: () => 0,
};

export const createUISlice: StateCreator<
  EmailClientState,
  [['zustand/devtools', never]],
  [],
  UISlice
> = (set, get) => ({
  selectedCategory: 'inbox',
  selectedEmailId: null,
  emailProperties: {},
  searchQuery: '',
  setSearchQuery: (query: string) =>
    set({ searchQuery: query }, undefined, 'ui/setSearchQuery'),
  selectEmailId: (emailId: string) =>
    set(
      (state) => {
        const isCurrentlyRead =
          state.emailProperties[emailId]?.isRead ??
          state.emails.find((email) => email.id === emailId)?.isRead ??
          false;
        if (!isCurrentlyRead) {
          state.toggleEmailRead(emailId);
        }
        return { selectedEmailId: emailId };
      },
      undefined,
      'ui/selectEmailId'
    ),
  selectCategory: (category: string) =>
    set({ selectedCategory: category }, undefined, 'ui/selectCategory'),
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
          email.id === emailId
            ? { ...email, isRead: !email.isRead }
            : email
        ),
        emailProperties: {
          ...state.emailProperties,
          [emailId]: {
            ...state.emailProperties[emailId] ?? { isTrashed: false },
            isRead: !(state.emailProperties[emailId]?.isRead ?? false),
          },
        },
      }),
      undefined,
      'ui/toggleEmailRead'
    ),
    toggleEmailTrashed: (emailId: string) =>
    set(
      (state) => ({
        emails: state.emails.map((email) =>
          email.id === emailId
            ? { ...email, isTrashed: !email.isTrashed }
            : email
        ),
        emailProperties: {
          ...state.emailProperties,
          [emailId]: {
            ...state.emailProperties[emailId] ?? { isRead: false },
            isTrashed: !(state.emailProperties[emailId]?.isTrashed ?? false),
          },
        },
        selectedEmailId: null,
      }),
      undefined,
      'ui/toggleEmailTrashed'
    ),
});