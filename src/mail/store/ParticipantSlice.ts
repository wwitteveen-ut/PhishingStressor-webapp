import { StateCreator } from 'zustand/vanilla';
import { EmailClientState } from './EmailClientStore';
import { Email } from './types';

export interface ParticipantSlice {
  emails: Email[];
  setEmails: (emails: Email[]) => void;
}

export const createParticipantSlice: StateCreator<
  EmailClientState,
  [['zustand/devtools', never]],
  [],
  ParticipantSlice
> = (set) => ({
  emails: [],
  setEmails: (emails: Email[]) => 
    set({ emails }, undefined, 'ui/setEmails'),
});