"use client";

import { UserEventType } from "@/mail/store/types";
import { EmailStats } from "@/researcher/store/types";
import { getEventStyle } from "@/shared/utils/eventsHelper";
import {
  Badge,
  Box,
  Button,
  Card,
  Collapse,
  Group,
  Paper,
  ScrollArea,
  Select,
  Stack,
  Tabs,
  Text,
  Title,
  Tooltip,
} from "@mantine/core";
import {
  IconChevronDown,
  IconChevronUp,
  IconClock,
  IconMail,
} from "@tabler/icons-react";
import HeatMap, { DataPoint } from "heatmap-ts";
import { MessageCircleDashed } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import ExperimentEmailEventsTimeline from "../ExperimentEmailEventsTimeline/ExperimentEmailEventsTimeline";
import ExperimentEmailPreview from "../ExperimentEmailPreview";
import { useExperimentStatsContext } from "../ExperimentStatsContext/ExperimentStatsContext";

export default function ParticipantDetail({
  participantId,
}: {
  participantId: string;
}) {
  const { experimentStats, experimentEmails } = useExperimentStatsContext();
  const participantData = experimentStats[participantId];

  if (!participantData) {
    return <Text>Participant not found</Text>;
  }

  return (
    <Paper p="lg" shadow="md" radius={"sm"}>
      <Title order={2} mb="lg">
        Participant: {participantId}
      </Title>
      <Tabs defaultValue="timeline" mt="md">
        <Tabs.List>
          <Tabs.Tab value="timeline" leftSection={<IconClock size={16} />}>
            Interaction Timeline
          </Tabs.Tab>
          <Tabs.Tab value="emails" leftSection={<IconMail size={16} />}>
            Email Details
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="timeline" pt="xs">
          {Object.entries(participantData.emails).map(
            ([emailId, emailData]) => {
              const email = experimentEmails[emailId];

              const emailEvents = emailData.events.map((event) => ({
                ...event,
                emailTitle: email.title,
                emailId,
              }));

              return (
                <ExperimentEmailEventsTimeline
                  key={emailId}
                  emailEvents={emailEvents}
                />
              );
            }
          )}
        </Tabs.Panel>
        <Tabs.Panel value="emails" pt="xs">
          <EmailSelector participantId={participantId} />
        </Tabs.Panel>
      </Tabs>
    </Paper>
  );
}

interface EmailHeatmapOverlayProps {
  emailId: string;
  participantId: string;
  eventType: UserEventType;
}

export function EmailHeatmapOverlay({
  emailId,
  participantId,
  eventType,
}: EmailHeatmapOverlayProps) {
  const { experimentStats, experimentEmails } = useExperimentStatsContext();
  const emailData = experimentEmails[emailId];
  const heatmapContainerRef = useRef<HTMLDivElement>(null);
  const heatmapInstanceRef = useRef<HeatMap | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const heatmapData = useMemo(() => {
    const heatmapEvents =
      experimentStats[participantId].emails[emailId]?.events?.filter(
        (event) => event.type === eventType
      ) || [];

    const allDataPoints = heatmapEvents.reduce<DataPoint[]>((res, event) => {
      try {
        if (event?.extra && typeof event.extra === "string") {
          const parsed = JSON.parse(event.extra);
          if (Array.isArray(parsed)) {
            return res.concat(parsed);
          }
        }
      } catch (error) {
        console.warn(
          `Failed to parse extra data for event: ${JSON.stringify(event)}`,
          error
        );
      }
      return res;
    }, []);

    return allDataPoints;
  }, [experimentStats, emailId, participantId]);

  useEffect(() => {
    if (!heatmapContainerRef.current || !heatmapData.length) {
      return;
    }

    const updateHeatmapSize = () => {
      if (!heatmapContainerRef.current) return;
      const { width, height } =
        heatmapContainerRef.current.getBoundingClientRect();

      if (width === 0 || height === 0) {
        return;
      }

      if (!heatmapInstanceRef.current) {
        heatmapInstanceRef.current = new HeatMap({
          container: heatmapContainerRef.current!,
          maxOpacity: 0.6,
          width: width,
          height: height,
          radius: 30,
          blur: 0.9,
        });
      }

      const points = heatmapData.map((point) => ({
        x: Math.round(point.x * width),
        y: Math.round(point.y * height),
        value: point.value,
        radius: 20,
      }));

      heatmapInstanceRef.current.setData({
        max: 100,
        min: 1,
        data: points,
      });
    };

    updateHeatmapSize();

    const resizeObserver = new ResizeObserver(() => {
      updateHeatmapSize();
    });
    resizeObserver.observe(heatmapContainerRef.current);

    return () => {
      resizeObserver.disconnect();
      if (heatmapInstanceRef.current) {
        heatmapInstanceRef.current.setData({ max: 0, min: 0, data: [] });
        heatmapInstanceRef.current = null;
      }
    };
  }, [heatmapData, emailId, participantId]);

  if (!heatmapData.length) {
    return (
      <Box py="md">
        <Tooltip label="No data for this event type">
          <Button
            variant="transparent"
            disabled
            onClick={() => setIsCollapsed(!isCollapsed)}
            leftSection={getEventStyle(eventType, 16).icon}
          >
            Heatmap for {emailData.title} ({eventType})
          </Button>
        </Tooltip>
      </Box>
    );
  }

  return (
    <Box py="md">
      <Group justify="space-between" align="center" mb="sm">
        <Button
          variant="subtle"
          onClick={() => setIsCollapsed(!isCollapsed)}
          leftSection={getEventStyle(eventType, 16).icon}
          rightSection={
            isCollapsed ? (
              <IconChevronDown size={16} />
            ) : (
              <IconChevronUp size={16} />
            )
          }
        >
          Heatmap for {emailData.title} ({eventType})
        </Button>
      </Group>
      <Collapse in={!isCollapsed}>
        <div ref={heatmapContainerRef}>
          <ExperimentEmailPreview
            emailData={{
              metadata: {
                title: emailData.title,
                senderName: emailData.senderName,
                senderEmail: emailData.senderAddress,
                content: emailData.content,
                scheduledFor: emailData.scheduledFor,
                groups: [],
                isPhishing: false,
              },
              files: [],
            }}
          />
        </div>
      </Collapse>
    </Box>
  );
}

export function EmailSelector({ participantId }: { participantId: string }) {
  const { experimentStats, experimentEmails } = useExperimentStatsContext();
  const [selectedEmailId, setSelectedEmailId] = useState<string | null>(null);

  const emailOptions = Object.entries(experimentEmails).map(
    ([emailId, email]) => ({
      value: emailId,
      label: email.title,
      disabled:
        !experimentStats[participantId]?.emails[emailId]?.events?.length,
      isPhishing: email.isPhishing,
    })
  );

  const selectedEmail = selectedEmailId
    ? experimentEmails[selectedEmailId]
    : null;
  const emailStats = selectedEmailId
    ? (experimentStats[participantId]?.emails[selectedEmailId] as EmailStats)
    : null;

  return (
    <Box p="md">
      <Group align="center" gap="xs" mb="md">
        <Title order={4} c="blue.5">
          Selected Email
        </Title>
        <Select
          variant="filled"
          placeholder="Choose an email to view details"
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
          value={selectedEmailId}
          nothingFoundMessage="No emails found"
          flex={1}
          onChange={setSelectedEmailId}
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
                  emailId={selectedEmailId!}
                  participantId={participantId}
                  eventType={UserEventType.HEATMAP}
                />
                <EmailHeatmapOverlay
                  emailId={selectedEmailId!}
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
                    emailId: selectedEmailId!,
                  }))}
                />
              </ScrollArea>
            </Group>
          </Stack>
        </Card>
      ) : (
        <Text c="dimmed">Select an email to view its details.</Text>
      )}
    </Box>
  );
}
