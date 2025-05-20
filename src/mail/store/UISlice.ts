import { StateCreator } from 'zustand/vanilla';
import { EmailClientStore } from './EmailClientStore';

export interface UISlice {
  selectedCategory: string;
  selectCategory: (category: string) => void;
}

export const createUISlice: StateCreator<
  EmailClientStore,
  [['zustand/devtools', never]],
  [],
  UISlice
> = (set) => ({
  selectedCategory: 'inbox',
  selectCategory: (category: string) =>
    set({ selectedCategory: category }, undefined, 'ui/selectCategory'),
});