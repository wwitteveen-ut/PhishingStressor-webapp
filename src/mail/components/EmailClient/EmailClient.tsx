"use client";
import { useEmailClientStore } from "@/mail/providers/EmailClientStoreProvider";
import { ZustandEmail } from "@/mail/store/types";
import { fetchAndSetEmails } from "@/mail/utils/fetchEmails";
import { ScrollArea } from "@mantine/core";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import EmailList from "../EmailList";
import EmailView from "../EmailView";
import RefreshButton from "../RefreshButton";

export function EmailClient({ emails = [] }: { emails: ZustandEmail[] }) {
  const setEmails = useEmailClientStore((state) => state.setEmails);
  const username = useEmailClientStore((state) => state.username);
  const setUsername = useEmailClientStore((state) => state.setUsername);
  const reset = useEmailClientStore((state) => state.reset);
  const { data: session } = useSession();

  useEffect(() => {
    if (!session) return;
    const currentUser = session?.user?.username || null;
    const storedUser = username;
    if (currentUser && currentUser !== storedUser) {
      reset();
      setUsername(currentUser);
    }

    setEmails(emails);
    const interval = setInterval(() => fetchAndSetEmails(setEmails), 1000 * 30);

    return () => clearInterval(interval);
  }, [session, reset, emails, setEmails, username, setUsername]);

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
