import { StateCreator } from 'zustand/vanilla';
import { EmailClientState } from './EmailClientStore';

export interface UISlice {
  selectedCategory: string;
  selectedEmailId: string | null;
  selectEmailId: (emailId: string) => void;
  selectCategory: (category: string) => void;
  getUnreadCount: () => number;
}

export const createUISlice: StateCreator<
  EmailClientState,
  [['zustand/devtools', never]],
  [],
  UISlice
> = (set, get) => ({
  selectedCategory: 'inbox',
  selectedEmailId: null,
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
});