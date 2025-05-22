"use client";

import { useEffect } from "react";
import type { Email, ZustandEmail } from "@/mail/store/types";

import EmailListFilters from "../EmailListFilters";
import EmailListItem from "../EmailListItem";
import { useEmailClientStore } from "@/mail/providers/EmailClientStoreProvider";

export default function EmailList({initialEmails = []} : {initialEmails?: ZustandEmail[]}) {
  const setEmails = useEmailClientStore((state) => state.setEmails);
  const selectedEmailId = useEmailClientStore((state) => state.selectedEmailId);
   
  useEffect(() => {
    if (initialEmails.length > 0) {
      setEmails(initialEmails);
    }
  }, [initialEmails, setEmails]);
  
  const emails = useEmailClientStore((state) => state.emails);

  return (
    <div className="w-80 border-r border-gray-200 bg-white flex flex-col h-full">
      <EmailListFilters />
      <div className="flex-1 overflow-y-auto">
        {emails.map((email) => (
          <EmailListItem key={email.id} email={email} isSelected={email.id === selectedEmailId} />
        ))}
      </div>
    </div>
  )
}
