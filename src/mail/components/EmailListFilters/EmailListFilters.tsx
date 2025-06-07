"use client";
import { useEmailClientStore } from "@/mail/providers/EmailClientStoreProvider";
import { Input } from "@mantine/core";
import { useDebouncedCallback } from "@mantine/hooks";
import { SearchIcon } from "lucide-react";

export default function EmailListFilters() {
  const setSearchQuery = useEmailClientStore((state) => state.setSearchQuery);

  const handleSearchChange = useDebouncedCallback(async (query: string) => {
    setSearchQuery(query);
  }, 150);

  return (
    <div className="p-3 border-b border-gray-200">
      <Input
        variant="filled"
        placeholder="Search Mails"
        leftSection={<SearchIcon size={18} />}
        onInput={(e) => handleSearchChange(e.currentTarget.value)}
      />
    </div>
  );
}
