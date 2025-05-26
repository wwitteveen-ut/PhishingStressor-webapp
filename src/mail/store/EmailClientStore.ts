import { createStore } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { createUISlice, initialUISliceState, UISlice } from './UISlice';
import { createParticipantSlice, initialParticipantState, ParticipantSlice } from './ParticipantSlice';


export type EmailClientState = UISlice & ParticipantSlice;

export const initialEmailClientState: EmailClientState = {
  ...initialParticipantState,
  ...initialUISliceState,
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
          partialize: (state) => ({ ...initialEmailClientState, emailProperties: state.emailProperties }) as EmailClientState,
        }
      ),
      { name: 'EmailClientStore' }
    )
  );

export default createEmailClientStore;