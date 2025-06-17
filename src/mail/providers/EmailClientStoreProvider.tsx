"use client";
import createEmailClientStore, {
  EmailClientState,
} from "@/mail/store/EmailClientStore";
import { UserEventType } from "@/mail/store/types";
import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useRef,
} from "react";
import { useStore } from "zustand";

export type EmailClientStoreApi = ReturnType<typeof createEmailClientStore>;

export const EmailClientStoreContext =
  createContext<EmailClientStoreApi | null>(null);

export interface EmailClientStoreProviderProps {
  children: ReactNode;
}

export const EmailClientStoreProvider = ({
  children,
}: EmailClientStoreProviderProps) => {
  const storeRef = useRef<EmailClientStoreApi | null>(null);
  if (storeRef.current === null) {
    storeRef.current = createEmailClientStore();
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const store = storeRef.current;
      if (!store) return;

      const state = store.getState();
      if (
        state.userEvents.length > 0 &&
        !state.isProcessingEvents &&
        state.selectedEmailId
      ) {
        state.processEventBatch(state.selectedEmailId);
      }
    }, 15 * 1000);

    const handleUnload = () => {
      const store = storeRef.current;
      if (!store) return;
      const state = store.getState();
      if (state.userEvents.length > 0 && state.selectedEmailId) {
        state.addSimpleEvent(UserEventType.TIME_CLOSED);
        state.processEventBatch(state.selectedEmailId);
      }
    };

    window.addEventListener("beforeunload", handleUnload);

    return () => {
      clearInterval(interval);
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, []);

  return (
    <EmailClientStoreContext.Provider value={storeRef.current}>
      {children}
    </EmailClientStoreContext.Provider>
  );
};

export const useEmailClientStore = <T,>(
  selector: (store: EmailClientState) => T
): T => {
  const emailClientStoreContext = useContext(EmailClientStoreContext);
  if (!emailClientStoreContext) {
    throw new Error(
      `useEmailClientStore must be used within EmailClientStoreProvider`
    );
  }
  return useStore(emailClientStoreContext, selector);
};
