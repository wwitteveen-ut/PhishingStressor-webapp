import { useEmailClientStore } from '@/mail/providers/EmailClientStoreProvider';
import { ZustandEmail } from '@/mail/store/types';
import { Group, Box, Text, ThemeIcon, Tooltip } from '@mantine/core';
import { Paperclip } from 'lucide-react';
import classes from './EmailListItem.module.css';



export default function EmailListItem({email, isSelected}: {email:ZustandEmail, isSelected: boolean}) {
  const selectEmailId = useEmailClientStore((state) => state.selectEmailId);

  return (
    <Box
      onClick={() => selectEmailId(email.id)}
      p="md"
      className={`${classes.mailItem} ${!email.isRead ? classes.unread : ''} ${isSelected ? classes.active : ''}`}
    >
      <Group justify="space-between">
      <Box style={{ flex: 1, minWidth: 0 }}>
        <Tooltip openDelay={500} inline offset={4} label={email.senderAddress}>
          <Text
            size="sm"
            fw={email.isRead ? 400 : 600}
            c={email.isRead ? 'gray.7' : 'gray.9'}
            truncate
            >
            {email.senderName}
          </Text>
        </Tooltip>
        
      </Box>
      <Text size="xs" c="gray.6">
        {new Date(email.sendAt).toLocaleString([], {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })}
      </Text>
      </Group>
      <Box>
      <Text
        size="sm"
        fw={600}
        c={"blue.5"}
        truncate
      >
        {email.title}
      </Text>
      <Group justify="space-between">
        <Text size="xs" c="gray.6" truncate style={{ flex: 1 }}>
        {email.content}
        </Text>
        <Group gap="xs">
        {email.attachments.length > 0 && (
          <ThemeIcon color='gray.6' variant='transparent'>
            <Paperclip size={14} />
          </ThemeIcon>
        ) }
        </Group>
      </Group>
      </Box>
      </Box>
  )
}
