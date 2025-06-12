import { ResearcherEmail } from "@/researcher/store/types";
import { Accordion, Box, Group, Stack, Text, Title } from "@mantine/core";
import { EmailStatusBadge, GroupsBadge } from "../ExperimentBadges";

export default function EmailInfo({ email }: { email: ResearcherEmail }) {
  return (
    <Accordion variant="contained" defaultValue={null}>
      <Accordion.Item value={email.id}>
        <Accordion.Control>
          <Group justify="space-between" align="center">
            <Stack gap="0">
              <Title order={6} c="blue.4">
                {email.title}
              </Title>
              <Text size="sm" fw={500}>
                From: {email.senderName}{" "}
                <Text span c="dimmed">
                  ({email.senderAddress})
                </Text>
              </Text>
            </Stack>

            <Group gap="xs">
              <EmailStatusBadge isPhishing={email.isPhishing} />
              <GroupsBadge groups={email.groups} />
              <Text size="xs" c="gray" mr="xs">
                View Details
              </Text>
            </Group>
          </Group>
        </Accordion.Control>
        <Accordion.Panel>
          <Box p="md">
            <Title order={5}>Email Details</Title>
            <Stack gap="xs" mt="xs">
              <Group>
                <Text size="sm" fw={600} w={100}>
                  ID:
                </Text>
                <Text size="sm">{email.id}</Text>
              </Group>
              <Group>
                <Text size="sm" fw={600} w={100}>
                  Type:
                </Text>
                <EmailStatusBadge
                  isPhishing={email.isPhishing}
                  variant="filled"
                />
              </Group>
              <Group>
                <Text size="sm" fw={600} w={100}>
                  Title:
                </Text>
                <Text size="sm">{email.title}</Text>
              </Group>
              <Group align="flex-start">
                <Text size="sm" fw={600} w={100}>
                  Content:
                </Text>
                <Text size="sm" style={{ flex: 1 }}>
                  {email.content}
                </Text>
              </Group>
              <Group>
                <Text size="sm" fw={600} w={100}>
                  Scheduled For:
                </Text>
                <Text size="sm">
                  {email.scheduledFor === 0
                    ? "Immediate"
                    : `${email.scheduledFor} minutes after login`}
                </Text>
              </Group>
              <Group>
                <Text size="sm" fw={600} w={100}>
                  Created At:
                </Text>
                <Text size="sm">
                  {new Date(email.createdAt).toLocaleString()}
                </Text>
              </Group>
            </Stack>
            {email.attachments.length > 0 && (
              <>
                <Text size="sm" mt="xs" fw={500}>
                  Attachments:
                </Text>
                {email.attachments.map((attachment) => (
                  <Text size="sm" key={attachment.id} ml="xs">
                    - {attachment.filename}
                  </Text>
                ))}
              </>
            )}
          </Box>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
}
