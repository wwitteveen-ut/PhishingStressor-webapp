"use client";

import { UserEventType } from "@/mail/store/types";
import { EmailStats } from "@/researcher/store/types";
import {
  Badge,
  Box,
  Card,
  Group,
  Paper,
  ScrollArea,
  Select,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";
import { MessageCircleDashed } from "lucide-react";
import { useRouter } from "next/navigation";
import EmailHeatmapOverlay from "../EmailHeatmapOverlay";
import { useExperimentContext } from "../ExperimentContext/ExperimentContext";
import ExperimentEmailEventsTimeline from "../ExperimentEmailEventsTimeline/ExperimentEmailEventsTimeline";
import { useExperimentStatsContext } from "../ExperimentStatsContext/ExperimentStatsContext";

interface ParticipantEmailStatsPageProps {
  participantId: string;
  emailId: string;
}

export default function ParticipantEmailStatsOverview({
  participantId,
  emailId,
}: ParticipantEmailStatsPageProps) {
  const router = useRouter();
  const experiment = useExperimentContext();
  const { experimentStats, experimentEmails } = useExperimentStatsContext();

  const emailOptions = Object.entries(experimentEmails).map(
    ([emailId, email]) => ({
      value: emailId,
      label: email.title,
      disabled:
        !experimentStats[participantId]?.emails[emailId]?.events?.length,
      isPhishing: email.isPhishing,
    })
  );

  const selectedEmail = emailId ? experimentEmails[emailId] : null;
  const emailStats = emailId
    ? (experimentStats[participantId]?.emails[emailId] as EmailStats)
    : null;

  if (!selectedEmail || !emailStats) {
    return <Text>Email not found</Text>;
  }

  const handleEmailChange = (emailId: string) => {
    if (experimentEmails[emailId]) {
      router.push(
        `/researcher/experiments/${experiment.id}/statistics/${participantId}/${emailId}`
      );
    }
  };

  return (
    <Paper shadow="sm" p="lg" radius="sm">
      <Group align="center" gap="xs" mb="md">
        <Title order={4} c="blue.5">
          Selected Email
        </Title>
        <Select
          variant="filled"
          placeholder="Choose an email to view details"
          onChange={(value) => {
            if (value) {
              handleEmailChange(value);
            }
          }}
          data={[
            {
              group: "Phishing",
              items: emailOptions.filter(
                (email) => email.isPhishing && !email.disabled
              ),
            },
            {
              group: "Non-Phishing",
              items: emailOptions.filter(
                (email) => !email.isPhishing && !email.disabled
              ),
            },
            {
              group: "No Data",
              items: emailOptions.filter((email) => email.disabled),
            },
          ]}
          value={emailId}
          nothingFoundMessage="No emails found"
          flex={1}
          searchable
          rightSection={<IconChevronDown size={16} />}
        />
      </Group>
      {selectedEmail && emailStats ? (
        <Card shadow="none" radius="md" p="0">
          <Stack>
            <Group>
              <Text size="sm" c="dimmed">
                From:{" "}
                {`${selectedEmail.senderName} <${selectedEmail.senderAddress}>`}
              </Text>
              {selectedEmail.isPhishing && <Badge color="red">Phishing</Badge>}
              {selectedEmail.groups.length > 0 && (
                <Badge color="blue">
                  {selectedEmail.groups.map((group) => group).join(", ")}
                </Badge>
              )}
            </Group>

            <Group flex={1} align="flex-start">
              <Box style={{ flex: 1 }}>
                {emailStats.replies.length > 0 ? (
                  <Stack gap="sm" mt="xs" align="flex-start">
                    {emailStats.replies.map((reply, index) => (
                      <Paper
                        key={index}
                        shadow="xs"
                        p="sm"
                        radius="md"
                        withBorder
                        style={{ width: "100%" }}
                      >
                        <Group align="center" gap="xs">
                          <MessageCircleDashed size={16} color="gray" />
                          <Stack gap={4}>
                            <Text size="xs" fw={500} c="dimmed">
                              {new Date(reply.createdAt).toLocaleString()}
                            </Text>
                            <Text size="sm" style={{ lineHeight: 1.5 }}>
                              {reply.content}
                            </Text>
                          </Stack>
                        </Group>
                      </Paper>
                    ))}
                  </Stack>
                ) : (
                  <Text size="sm" c="dimmed" mt="xs">
                    No replies available.
                  </Text>
                )}
                <EmailHeatmapOverlay
                  emailId={emailId}
                  participantId={participantId}
                  eventType={UserEventType.HEATMAP}
                />
                <EmailHeatmapOverlay
                  emailId={emailId}
                  participantId={participantId}
                  eventType={UserEventType.CLICK}
                />
              </Box>
              <ScrollArea h={350} type="always" scrollbarSize={4}>
                <ExperimentEmailEventsTimeline
                  collapsable={false}
                  emailEvents={emailStats.events.map((event) => ({
                    ...event,
                    emailTitle: selectedEmail.title,
                    emailId: emailId,
                  }))}
                />
              </ScrollArea>
            </Group>
          </Stack>
        </Card>
      ) : (
        <Text c="dimmed">Select an email to view its details.</Text>
      )}
    </Paper>
  );
}
