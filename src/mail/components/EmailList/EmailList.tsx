"use client";

import { useEffect } from "react";
import type { Email } from "@/mail/store/types";

import EmailListFilters from "../EmailListFilters";
import EmailListItem from "../EmailListItem";
import { useEmailClientStore } from "@/mail/providers/EmailClientStoreProvider";

export default function EmailList({initialEmails = []} : {initialEmails?: Email[]}) {
  const setEmails = useEmailClientStore((state) => state.setEmails);
   

  useEffect(() => {
    if (initialEmails.length > 0) {
      setEmails(initialEmails);
    }
  }, [initialEmails, setEmails]);
  
  const emails = useEmailClientStore((state) => state.emails);

  return (
    <div className="w-80 border-r border-gray-200 bg-white flex flex-col h-full">
      {/* <EmailListFilters /> */}
      <div className="flex-1 overflow-y-auto">
        {emails.map((email) => (
          <EmailListItem key={email.id} email={email} />
        ))}
      </div>
    </div>
  )
}
