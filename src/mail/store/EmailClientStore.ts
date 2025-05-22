import { createStore } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { createUISlice, UISlice } from './UISlice';
import { createParticipantSlice, ParticipantSlice } from './ParticipantSlice';


export type EmailClientState = UISlice & ParticipantSlice;

export const initialEmailClientState: EmailClientState = {
  selectedCategory: 'inbox',
  selectedEmailId: null,
  emails: [],
  emailProperties: {},
  setEmails: () => {},
  selectCategory: () => {},
  selectEmailId: () => {},
  toggleEmailRead: () => {},
  getUnreadCount: () => 0,
};

const createEmailClientStore = () =>
  createStore<EmailClientState>()(
    devtools(
      persist(
        (...args) => ({
          ...createUISlice(...args),
          ...createParticipantSlice(...args),
        }),
        {
          name: 'emailclient-storage',
          storage: {
            getItem: (name) => {
              const value = sessionStorage.getItem(name);
              return value ? JSON.parse(value) : null;
            },
            setItem: (name, value) => sessionStorage.setItem(name, JSON.stringify(value)),
            removeItem: (name) => sessionStorage.removeItem(name),
          },
          partialize: (state) => ({ ...initialEmailClientState, emailProperties: state.emailProperties }) as EmailClientState,
        }
      ),
      { name: 'EmailClientStore' }
    )
  );

export default createEmailClientStore;