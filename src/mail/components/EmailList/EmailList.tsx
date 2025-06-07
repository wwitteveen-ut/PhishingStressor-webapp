"use client";

import EmailListFilters from "../EmailListFilters";
import EmailListItem from "../EmailListItem";
import { useEmailClientStore } from "@/mail/providers/EmailClientStoreProvider";

export default function EmailList() {
  const selectedEmailId = useEmailClientStore((state) => state.selectedEmailId);

  let emails = useEmailClientStore((state) => state.emails);
  const query = useEmailClientStore((state) => state.searchQuery);
  const selectedCategory = useEmailClientStore(
    (state) => state.selectedCategory,
  );

  emails = emails.filter(
    (email) =>
      email.title.search(query) !== -1 ||
      email.content.search(query) !== -1 ||
      email.senderName.search(query) !== -1 ||
      email.senderAddress.search(query) !== -1,
  );
  emails = emails.filter((email) => {
    if (selectedCategory === "inbox") {
      return !email.isTrashed;
    }
    if (selectedCategory === "trash") {
      return email.isTrashed;
    }
    return true;
  });

  return (
    <div className="w-80 border-r border-gray-200 bg-white flex flex-col h-full">
      <EmailListFilters />
      <div className="flex-1 overflow-y-auto">
        {emails.map((email) => (
          <EmailListItem
            key={email.id}
            email={email}
            isSelected={email.id === selectedEmailId}
          />
        ))}
      </div>
    </div>
  );
}
