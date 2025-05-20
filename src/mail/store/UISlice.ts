import { StateCreator } from 'zustand/vanilla';
import { EmailClientStore } from './EmailClientStore';

export interface UISlice {
  selectedCategory: string;
  selectedEmail: number | null;
  selectEmail: (emailId: number) => void;
  selectCategory: (category: string) => void;
}

export const createUISlice: StateCreator<
  EmailClientStore,
  [['zustand/devtools', never]],
  [],
  UISlice
> = (set) => ({
  selectedCategory: 'inbox',
  selectedEmail: null,
  selectEmail: (emailId: number) =>
    set({ selectedEmail: emailId }, undefined, 'ui/selectEmail'),
  selectCategory: (category: string) =>
    set({ selectedCategory: category }, undefined, 'ui/selectCategory'),
});