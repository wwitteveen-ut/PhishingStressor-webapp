"use client";
import { useEmailClientStore } from "@/mail/providers/EmailClientStoreProvider";
import { ZustandEmail } from "@/mail/store/types";
import { fetchAndSetEmails } from "@/mail/utils/fetchEmails";
import { useEffect } from "react";
import EmailList from "../EmailList";
import EmailView from "../EmailView";
import RefreshButton from "../RefreshButton";

export function EmailClient({ emails = [] }: { emails: ZustandEmail[] }) {
  const setEmails = useEmailClientStore((state) => state.setEmails);

  useEffect(() => {
    setEmails(emails);

    const interval = setInterval(() => fetchAndSetEmails(setEmails), 1000 * 30);

    return () => clearInterval(interval);
  }, [emails, setEmails]);

  return (
    <>
      <div className="flex flex-1 overflow-hidden">
        <EmailList />
        <EmailView />
        <RefreshButton />
      </div>
    </>
  );
}
