import { createStore } from 'zustand';
import { devtools } from 'zustand/middleware';
import { createUISlice, UISlice } from './UISlice';
import { createParticipantSlice, ParticipantSlice } from './ParticipantSlice';


export type EmailClientState = UISlice & ParticipantSlice;

export const initialEmailClientState: EmailClientState = {
    selectedCategory: 'inbox',
    selectedEmailId: null,
    emails: [],
    setEmails: () => {},
    selectCategory: () => {},
    selectEmailId: () => {},
};

const createEmailClientStore = () => {
  return createStore<EmailClientState>()(
  devtools((...args) => ({
    ...createUISlice(...args),
    ...createParticipantSlice(...args),
  })),
)
};

export default createEmailClientStore;