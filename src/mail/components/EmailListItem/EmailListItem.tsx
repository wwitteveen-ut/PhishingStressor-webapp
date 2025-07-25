import { useEmailClientStore } from "@/mail/providers/EmailClientStoreProvider";
import { ZustandEmail } from "@/mail/store/types";
import {
  ActionIcon,
  Box,
  Group,
  Text,
  ThemeIcon,
  Tooltip,
} from "@mantine/core";
import { htmlToText } from "html-to-text";
import { Paperclip, Trash, Undo } from "lucide-react";
import classes from "./EmailListItem.module.css";

interface IEmailListItemProps {
  email: ZustandEmail;
  isSelected: boolean;
}

export default function EmailListItem({
  email,
  isSelected,
}: IEmailListItemProps) {
  const selectEmailId = useEmailClientStore((state) => state.selectEmailId);
  const toggleEmailTrashed = useEmailClientStore(
    (state) => state.toggleEmailTrashed
  );
  const plainTextBody = htmlToText(email.content);
  return (
    <Box
      onClick={() => selectEmailId(email.id)}
      p="md"
      className={`${classes.mailItem} ${!email.isRead ? classes.unread : ""} ${
        isSelected ? classes.active : ""
      }`}
    >
      <Group justify="space-between">
        <Box style={{ flex: 1, minWidth: 0 }}>
          <Tooltip
            openDelay={500}
            inline
            offset={4}
            label={email.senderAddress}
          >
            <Text
              size="sm"
              fw={email.isRead ? 400 : 600}
              c={email.isRead ? "gray.7" : "gray.9"}
              truncate
            >
              {email.senderName}
            </Text>
          </Tooltip>
        </Box>
        <Text size="xs" c="gray.6">
          {new Date(email.sendAt).toLocaleString([], {
            weekday: "short",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Text>
        <Tooltip label={email.isTrashed ? "Restore email" : "Trash email"}>
          <ActionIcon
            variant="transparent"
            color="gray"
            styles={{
              root: {
                "--ai-hover-color": !email.isTrashed ? "red" : "green",
              },
            }}
            onClick={(e) => {
              toggleEmailTrashed(email.id);
              e.stopPropagation();
            }}
          >
            {email.isTrashed ? <Undo size={15} /> : <Trash size={15} />}
          </ActionIcon>
        </Tooltip>
      </Group>
      <Box>
        <Text size="sm" fw={600} c={"blue.5"} truncate>
          {email.title}
        </Text>
        <Group justify="space-between">
          <Text size="xs" c="gray.6" truncate style={{ flex: 1 }}>
            {plainTextBody}
          </Text>
          {email.attachments.length > 0 && (
            <ThemeIcon color="gray.6" variant="transparent">
              <Paperclip size={13} />
            </ThemeIcon>
          )}
        </Group>
      </Box>
    </Box>
  );
}
