"use client";
import { useEmailClientStore } from "@/mail/providers/EmailClientStoreProvider";
import { Badge, Group, NavLink, Stack, Text, ThemeIcon } from "@mantine/core";
import { InboxIcon, TrashIcon } from "lucide-react";

export default function EmailCategoryList() {
  const selectCategory = useEmailClientStore((state) => state.selectCategory);
  const selectedCategory = useEmailClientStore(
    (state) => state.selectedCategory
  );
  const unreadCount = useEmailClientStore((state) => state.getUnreadCount());

  const menuItems = [
    {
      id: "inbox",
      label: "Inbox",
      icon: InboxIcon,
      count: unreadCount,
    },
    {
      id: "trash",
      label: "Trash",
      icon: TrashIcon,
    },
  ];

  return (
    <Stack flex={1} gap={0}>
      {menuItems.map((item) => (
        <NavLink
          key={item.id}
          label={
            <Group>
              <ThemeIcon
                variant="transparent"
                color={selectedCategory === item.id ? "blue.7" : "gray.6"}
              >
                <item.icon size={18} />
              </ThemeIcon>
              <Text
                fw={500}
                fz={"sm"}
                c={selectedCategory === item.id ? "blue.7" : "gray.8"}
              >
                {item.label}
              </Text>
            </Group>
          }
          rightSection={
            item.count ? (
              <Badge
                size="sm"
                variant="light"
                color={selectedCategory === item.id ? "blue.5" : "gray.6"}
                circle
              >
                {item.count}
              </Badge>
            ) : null
          }
          active={selectedCategory === item.id}
          onClick={() => selectCategory(item.id)}
          color="blue.6"
          variant="light"
          styles={{
            root: {
              borderRadius: "0.25rem",
              "&:hover": {
                backgroundColor: "#e6f0fa",
              },
            },
          }}
        />
      ))}
    </Stack>
  );
}
