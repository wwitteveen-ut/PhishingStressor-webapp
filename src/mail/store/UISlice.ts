import { StateCreator } from 'zustand/vanilla';
import { EmailClientState } from './EmailClientStore';

export interface UISlice {
  selectedCategory: string;
  selectedEmailId: string | null;
  selectEmailId: (emailId: string) => void;
  selectCategory: (category: string) => void;
}

export const createUISlice: StateCreator<
  EmailClientState,
  [['zustand/devtools', never]],
  [],
  UISlice
> = (set) => ({
  selectedCategory: 'inbox',
  selectedEmailId: null,
  selectEmailId: (emailId: string) =>
     set({ selectedEmailId: emailId }, undefined, 'ui/selectEmailId'),
  selectCategory: (category: string) =>
    set({ selectedCategory: category }, undefined, 'ui/selectCategory'),
});