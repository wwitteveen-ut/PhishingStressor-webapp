"use client";

import { InternalUserEventType, UserEventType } from "@/mail/store/types";
import { EmailStats } from "@/researcher/store/types";
import {
  ActionIcon,
  Box,
  Button,
  Card,
  Collapse,
  Divider,
  Flex,
  Group,
  Paper,
  ScrollArea,
  Select,
  Stack,
  Text,
  Title,
  Tooltip,
} from "@mantine/core";
import {
  BarChart,
  ChevronDown,
  ChevronLeft,
  ChevronUp,
  Eye,
  MessageCircle,
  MessageCircleDashed,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import EmailHeatmapOverlay from "../EmailHeatmapOverlay";
import { useExperimentContext } from "../ExperimentContext/ExperimentContext";
import ExperimentEmailEventsTimeline from "../ExperimentEmailEventsTimeline/ExperimentEmailEventsTimeline";
import EmailInfo from "../ExperimentEmailInfo";
import { useExperimentStatsContext } from "../ExperimentStatsContext/ExperimentStatsContext";
import { ExperimentEmailStats } from "../ExperimentStatsPage";

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
  const [statsOpen, setStatsOpen] = useState(true);
  const [repliesOpen, setRepliesOpen] = useState(true);

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
        `/researcher/experiments/${experiment.id}/statistics/participants/${participantId}/${emailId}`
      );
    }
  };

  const timelineEvents: {
    emailTitle: string;
    emailId: string;
    type: UserEventType | InternalUserEventType;
    timestamp: string;
    extra?: string;
  }[] = [
    ...emailStats.events.map((event) => ({
      ...event,
      emailTitle: selectedEmail.title,
      emailId: emailId,
    })),
    ...emailStats.replies.map((reply) => ({
      type: InternalUserEventType.REPLY,
      timestamp: new Date(reply.createdAt).toISOString(),
      emailTitle: selectedEmail.title,
      emailId: emailId,
      content: reply.content,
    })),
  ].sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );

  return (
    <Paper
      shadow="sm"
      p="lg"
      radius="sm"
      h="93vh"
      style={{ display: "flex", flexDirection: "column", overflow: "hidden" }}
    >
      <Group align="center" gap="xs" mb="md">
        <Button
          variant="outline"
          leftSection={<ChevronLeft size={16} />}
          color="gray"
          component={Link}
          href={`/researcher/experiments/${experiment.id}/statistics/participants/${participantId}`}
        >
          Participant
        </Button>
        <Title order={5} c="blue.4">
          Selected Email:
        </Title>
        <Select
          placeholder="Choose an email to view details"
          variant="filled"
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
          styles={{
            input: {
              fontWeight: 600,
              fontSize: "1.1rem",
              color: "var(--mantine-color-blue-5)",
            },
          }}
          value={emailId}
          nothingFoundMessage="No emails found"
          searchable
          rightSection={<ChevronDown size={16} />}
        />
        <Tooltip label="View Email">
          <ActionIcon variant="light" size="lg">
            <Eye size={20} />
          </ActionIcon>
        </Tooltip>
      </Group>

      {selectedEmail && emailStats ? (
        <Card
          shadow="0"
          radius="md"
          p="0"
          style={{ flex: 1, overflow: "hidden" }}
        >
          <Stack h="100%" gap="md">
            <EmailInfo email={selectedEmail} />
            <Divider />

            <Flex flex={1} direction="row" style={{ overflow: "hidden" }}>
              <ScrollArea
                style={{ flex: 1, minWidth: 0 }}
                type="always"
                scrollbarSize={4}
              >
                <Button
                  variant={statsOpen ? "filled" : "light"}
                  leftSection={<BarChart size={18} />}
                  rightSection={
                    statsOpen ? (
                      <ChevronUp size={18} />
                    ) : (
                      <ChevronDown size={18} />
                    )
                  }
                  mb="md"
                  onClick={() => setStatsOpen((o) => !o)}
                >
                  Email Statistics
                </Button>
                <Collapse in={statsOpen}>
                  <Box mb="md">
                    <ExperimentEmailStats
                      participantId={participantId}
                      emailId={emailId}
                    />
                  </Box>
                </Collapse>

                <Button
                  variant={repliesOpen ? "filled" : "light"}
                  leftSection={<MessageCircle size={18} />}
                  rightSection={
                    repliesOpen ? (
                      <ChevronUp size={18} />
                    ) : (
                      <ChevronDown size={18} />
                    )
                  }
                  onClick={() => setRepliesOpen((o) => !o)}
                >
                  Replies
                </Button>
                <Collapse in={repliesOpen}>
                  <Box mb="md">
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
                            <Stack gap={4} style={{ flex: 1, minWidth: 0 }}>
                              <Text size="xs" fw={500} c="dimmed">
                                {new Date(reply.createdAt).toLocaleString()}
                              </Text>
                              <Text
                                size="sm"
                                style={{
                                  lineHeight: 1.5,
                                  wordWrap: "break-word",
                                }}
                              >
                                {reply.content}
                              </Text>
                            </Stack>
                          </Group>
                        </Paper>
                      ))}
                    </Stack>
                  </Box>
                </Collapse>

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
              </ScrollArea>
              <Divider size="xs" mx="xs" orientation="vertical" />
              <ScrollArea
                style={{ width: "300px" }}
                type="always"
                scrollbarSize={5}
              >
                <Title order={5} c="blue.4">
                  Email Events
                </Title>
                <ExperimentEmailEventsTimeline
                  collapsable={false}
                  emailEvents={timelineEvents}
                />
              </ScrollArea>
            </Flex>
          </Stack>
        </Card>
      ) : (
        <Text c="dimmed">Select an email to view its details.</Text>
      )}
    </Paper>
  );
}
