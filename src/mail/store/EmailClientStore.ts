import { createStore } from "zustand";
import { devtools, persist, subscribeWithSelector } from "zustand/middleware";
import {
  createParticipantSlice,
  initialParticipantState,
  ParticipantSlice,
} from "./ParticipantSlice";
import { createUISlice, initialUISliceState, UISlice } from "./UISlice";

export type EmailClientState = UISlice & ParticipantSlice;

export const initialEmailClientState: EmailClientState = {
  ...initialParticipantState,
  ...initialUISliceState,
};

const createEmailClientStore = () =>
  createStore<EmailClientState>()(
    devtools(
      subscribeWithSelector(
        persist(
          (...args) => ({
            ...createUISlice(...args),
            ...createParticipantSlice(...args),
          }),
          {
            name: "emailclient-storage",
            partialize: (state) =>
              ({
                ...initialEmailClientState,
                emailProperties: state.emailProperties,
              } as EmailClientState),
          }
        )
      ),
      { name: "EmailClientStore" }
    )
  );

export default createEmailClientStore;
