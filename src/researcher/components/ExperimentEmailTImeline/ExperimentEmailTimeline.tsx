"use client";
import { ResearcherEmail } from "@/researcher/store/types";
import {
  ActionIcon,
  Button,
  Container,
  Group,
  Modal,
  Stack,
  Text,
  ThemeIcon,
  Timeline,
  Tooltip,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { modals } from "@mantine/modals";
import { IconClock, IconEye, IconMail } from "@tabler/icons-react";
import { EmailStatusBadge, GroupsBadge } from "../ExperimentBadges";
import { useExperimentContext } from "../ExperimentContext/ExperimentContext";
import ExperimentEmailPreview from "../ExperimentEmailPreview";

export default function ExperimentEmailTimeline({
  emails,
}: {
  emails: ResearcherEmail[];
}) {
  const experiment = useExperimentContext();
  const [opened, { open, close }] = useDisclosure(false);

  const sortedEmails = [...emails].sort(
    (a, b) => a.scheduledFor - b.scheduledFor
  );

  const formatScheduledTime = (minutes: number) => {
    if (minutes === 0) return "At login";
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return hours > 0
      ? `${hours}h ${remainingMinutes}m after login`
      : `${remainingMinutes}m after login`;
  };

  const openModal = (email: ResearcherEmail) => {
    modals.open({
      title: "Email Details",
      size: "xl",
      children: (
        <ExperimentEmailPreview
          emailData={{
            metadata: {
              title: email.title,
              senderName: email.senderName,
              senderEmail: email.senderAddress,
              groups: [],
              content: email.content,
              isPhishing: false,
              scheduledFor: 0,
            },
            files: [],
          }}
        />
      ),
    });
  };

  return (
    <>
      <Button leftSection={<IconClock size={18} />} onClick={open}>
        View Timeline
      </Button>
      <Modal
        opened={opened}
        onClose={close}
        size="lg"
        centered
        title={
          <Text fw={600} size="lg" c="blue.6">
            Email Timeline ({emails.length} emails)
          </Text>
        }
      >
        <Stack>
          <Container size="sm" px={0}>
            <Timeline
              active={emails.length}
              bulletSize={32}
              lineWidth={2}
              color="blue"
            >
              {sortedEmails.map((email) => (
                <Timeline.Item
                  key={email.id}
                  bullet={<IconMail size={18} />}
                  title={
                    <Group justify="space-between">
                      <div style={{ flex: 1 }}>
                        <Text size="md" fw={600}>
                          {email.title}
                        </Text>
                      </div>
                      <Tooltip label={"View email"}>
                        <ActionIcon
                          variant="light"
                          size="sm"
                          color="blue"
                          onClick={() => openModal(email)}
                        >
                          <IconEye size={14} />
                        </ActionIcon>
                      </Tooltip>
                    </Group>
                  }
                >
                  <Stack gap="sm" mt="xs" pl="md">
                    <Group gap="xs">
                      <Text size="xs" c="dimmed" fw={500}>
                        Time:
                      </Text>
                      <Text size="xs" c="blue.5" fw={600}>
                        {formatScheduledTime(email.scheduledFor)}
                      </Text>
                    </Group>
                    <Group gap="xs">
                      <Text size="xs" c="dimmed" fw={500}>
                        From:
                      </Text>
                      <Text size="xs" c="dimmed">
                        {email.senderName} &lt;{email.senderAddress}&gt;
                      </Text>
                    </Group>

                    <Group gap="xs" align="center">
                      <Text size="xs" c="dimmed" fw={500}>
                        Type:
                      </Text>
                      <EmailStatusBadge isPhishing={email.isPhishing} />
                    </Group>
                    <Group gap="xs" align="center">
                      <Text size="xs" c="dimmed" fw={500}>
                        Groups:
                      </Text>
                      <GroupsBadge groups={email.groups} maxNumOfGroups={2} />
                    </Group>
                  </Stack>
                </Timeline.Item>
              ))}
              <Timeline.Item
                bullet={
                  <ThemeIcon color="red" radius="xl">
                    <IconClock size={22} />
                  </ThemeIcon>
                }
                color="red"
                title={
                  <Text size="md" fw={600}>
                    Experiment ended after {experiment.duration} minutes
                  </Text>
                }
              />
            </Timeline>
          </Container>
        </Stack>
      </Modal>
    </>
  );
}
