"use client";
import { useEmailClientStore } from "@/mail/providers/EmailClientStoreProvider";
import { ZustandEmail } from "@/mail/store/types";
import { fetchAndSetEmails } from "@/mail/utils/fetchEmails";
import { ScrollArea } from "@mantine/core";
import { useEffect } from "react";
import EmailList from "../EmailList";
import EmailView from "../EmailView";
import RefreshButton from "../RefreshButton";

export function EmailClient({
  emails = [],
  initialUsername,
}: {
  emails: ZustandEmail[];
  initialUsername: string;
}) {
  const setEmails = useEmailClientStore((state) => state.setEmails);
  const username = useEmailClientStore((state) => state.username);
  const setUsername = useEmailClientStore((state) => state.setUsername);
  const reset = useEmailClientStore((state) => state.reset);

  useEffect(() => {
    const storedUser = username;
    if (initialUsername && initialUsername !== storedUser) {
      reset();
      setUsername(initialUsername);
    }

    setEmails(emails);
    const interval = setInterval(() => fetchAndSetEmails(setEmails), 1000 * 30);

    return () => clearInterval(interval);
  }, [initialUsername, reset, emails, setEmails, username, setUsername]);

  return (
    <>
      <div className="flex flex-1 overflow-hidden">
        <EmailList />
        <ScrollArea flex={1} type="hover" scrollbarSize={4}>
          <EmailView />
        </ScrollArea>
        <RefreshButton />
      </div>
    </>
  );
}
