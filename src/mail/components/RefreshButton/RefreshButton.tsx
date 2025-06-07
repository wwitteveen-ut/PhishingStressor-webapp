"use client";

import { useEmailClientStore } from "@/mail/providers/EmailClientStoreProvider";
import { fetchAndSetEmails } from "@/mail/utils/fetchEmails";
import { ActionIcon, Affix } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { RotateCw } from "lucide-react";

export default function RefreshButton() {
  const [loading, { toggle, close }] = useDisclosure();
  const setEmails = useEmailClientStore((state) => state.setEmails);

  const handleRefresh = async () => {
    toggle();
    try {
      await fetchAndSetEmails(setEmails);
    } catch (err) {
      console.error("Error refreshing emails:", err);
    } finally {
      close();
    }
  };

  return (
    <Affix position={{ bottom: 20, right: 20 }}>
      <ActionIcon size="xl" loading={loading} onClick={handleRefresh}>
        <RotateCw />
      </ActionIcon>
    </Affix>
  );
}
