import type { Email } from "@/mail/store/types";

import EmailListFilters from "../EmailListFilters";
import EmailListItem from "../EmailListItem";

export default function EmailList({emails = []} : {emails?: Email[]}) {
  return (
    <div className="w-80 border-r border-gray-200 bg-white flex flex-col h-full">
      <EmailListFilters />
      <div className="flex-1 overflow-y-auto">
        {emails.map((email) => (
          <EmailListItem key={email.id} email={email} />
        ))}
      </div>
    </div>
  )
}
