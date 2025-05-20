import { createStore } from 'zustand';
import { devtools } from 'zustand/middleware';
import { createUISlice, UISlice } from './UISlice';

export type EmailClientState = UISlice;
export type EmailClientStore = UISlice;

export const initialEmailClientState: EmailClientState = {
    selectedCategory: 'inbox',
    selectedEmail: null,
    selectCategory: () => {},
    selectEmail: () => {},
};

const createEmailClientStore = () => {
  return createStore<EmailClientState>()(
  devtools((...args) => ({
    ...createUISlice(...args),
  })),
)
};

export default createEmailClientStore;