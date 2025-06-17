"use client";
import { useEmailClientStore } from "@/mail/providers/EmailClientStoreProvider";
import { ZustandEmail } from "@/mail/store/types";
import { fetchAndSetEmails } from "@/mail/utils/fetchEmails";
import { Group, ScrollArea } from "@mantine/core";
import { getSession } from "next-auth/react";
import { useEffect } from "react";
import EmailList from "../EmailList";
import EmailView from "../EmailView";
import RefreshButton from "../RefreshButton";

export interface IEmailClientProps {
  emails: ZustandEmail[];
}

export function EmailClient({ emails = [] }: IEmailClientProps) {
  const setEmails = useEmailClientStore((state) => state.setEmails);
  const processEventBatch = useEmailClientStore(
    (state) => state.processEventBatch
  );
  const selectedEmailId = useEmailClientStore((state) => state.selectedEmailId);
  const reset = useEmailClientStore((state) => state.reset);

  useEffect(() => {
    const initiallize = async () => {
      const session = await getSession();
      const localstorageUsername = localStorage.getItem("username");
      if (
        session &&
        session.user?.username &&
        session.user?.username !== localstorageUsername
      ) {
        localStorage.setItem("username", session.user?.username);
        reset();
      }
    };

    initiallize();

    setEmails(emails);
    const interval = setInterval(() => fetchAndSetEmails(setEmails), 1000 * 30);

    return () => clearInterval(interval);
  }, [emails, setEmails, reset]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (selectedEmailId) {
        processEventBatch(selectedEmailId);
      }
    }, 1000 * 10);

    return () => clearInterval(interval);
  }, [selectedEmailId, processEventBatch]);

  return (
    <>
      <Group flex={1} align="stretch" style={{ overflow: "hidden" }}>
        <EmailList />
        <ScrollArea flex={1} h="100vh" type="hover" scrollbarSize={4}>
          <EmailView />
        </ScrollArea>
        <RefreshButton />
      </Group>
    </>
  );
}
