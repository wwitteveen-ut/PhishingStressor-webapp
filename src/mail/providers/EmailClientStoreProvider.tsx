"use client";
import { type ReactNode, createContext, useRef, useContext } from "react";
import { useStore } from "zustand";
import createEmailClientStore, {
  EmailClientState,
} from "@/mail/store/EmailClientStore";

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
  return (
    <EmailClientStoreContext.Provider value={storeRef.current}>
      {children}
    </EmailClientStoreContext.Provider>
  );
};

export const useEmailClientStore = <T,>(
  selector: (store: EmailClientState) => T,
): T => {
  const emailClientStoreContext = useContext(EmailClientStoreContext);
  if (!emailClientStoreContext) {
    throw new Error(
      `useEmailClientStore must be used within EmailClientStoreProvider`,
    );
  }
  return useStore(emailClientStoreContext, selector);
};
