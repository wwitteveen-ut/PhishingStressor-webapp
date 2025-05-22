import { StateCreator } from 'zustand/vanilla';
import { EmailClientStore } from './EmailClientStore';
import { Email } from './types';

export interface UISlice {
  selectedCategory: string;
  emails: Email[];
  setEmails: (emails: Email[]) => void;
  selectedEmail: Email | null;
  selectEmailId: (emailId: string) => void;
  selectCategory: (category: string) => void;
}

export const createUISlice: StateCreator<
  EmailClientStore,
  [['zustand/devtools', never]],
  [],
  UISlice
> = (set) => ({
  selectedCategory: 'inbox',
  emails: [],
  selectedEmail: null,
  setEmails: (emails: Email[]) => 
    set({ emails }, undefined, 'ui/setEmails'),
  selectEmailId: (emailId: string) =>
    set((state) => ({ selectedEmail: state.emails.find((email) => email.id === emailId) }), undefined, 'ui/selectEmail'),
  selectCategory: (category: string) =>
    set({ selectedCategory: category }, undefined, 'ui/selectCategory'),
});