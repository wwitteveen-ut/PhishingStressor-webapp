"use client";

import { UserEvent, UserEventType } from "@/mail/store/types";
import { getEmail } from "@/researcher/actions/actions";
import {
  EmailCreatePayload,
  EmailStats,
  ResearcherEmail,
} from "@/researcher/store/types";
import {
  Badge,
  Card,
  Container,
  Group,
  Loader,
  Paper,
  Tabs,
  Text,
  Title,
} from "@mantine/core";
import { IconClock, IconMail } from "@tabler/icons-react";
import HeatMap, { DataPoint } from "heatmap-ts";
import { useEffect, useMemo, useRef, useState } from "react";
import { useExperimentContext } from "../ExperimentContext/ExperimentContext";
import ExperimentEmailEventsTimeline from "../ExperimentEmailEventsTimeline/ExperimentEmailEventsTimeline";
import ExperimentEmailPreview from "../ExperimentEmailPreview";
import { useExperimentStatsContext } from "../ExperimentStatsContext/ExperimentStatsContext";

export default function ParticipantDetail({
  participantId,
}: {
  participantId: string;
}) {
  const experiment = useExperimentContext();
  const { experimentStats } = useExperimentStatsContext();
  const participantData = experimentStats[participantId];
  const [emailEvents, setEmailEvents] = useState<
    (UserEvent & { emailTitle: string; emailId: string })[]
  >([]);
  const [emails, setEmails] = useState<Record<string, ResearcherEmail>>({});
  const [isLoading, setIsLoading] = useState(true);

  const groupName =
    experiment.groups.find((g) => g.id === participantData.groupId)?.name ||
    "N/A";

  useEffect(() => {
    const fetchEmailData = async () => {
      setIsLoading(true);
      try {
        const eventsPromises = Object.entries(participantData.emails).map(
          async ([emailId, data]) => {
            const email = await getEmail(experiment.id, emailId);
            return {
              email,
              events: data.events.map((event: UserEvent) => ({
                ...event,
                emailTitle: email?.title || "Unknown Email",
                emailId,
              })),
            };
          }
        );

        const resolvedData = await Promise.all(eventsPromises);
        const events = resolvedData.flatMap((d) => d.events);
        const emailMap = resolvedData.reduce((acc, d) => {
          if (d.email) {
            acc[d.email.id] = d.email;
          }
          return acc;
        }, {} as Record<string, ResearcherEmail>);
        setEmailEvents(events);
        setEmails(emailMap);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEmailData();
  }, [experiment.id, participantData.emails]);
  if (!participantData) {
    return <Text>Participant not found</Text>;
  }
  if (isLoading) {
    return (
      <Container size="lg" py="xl">
        <Group justify="center">
          <Loader />
          <Text>Loading participant data...</Text>
        </Group>
      </Container>
    );
  }

  return (
    <Paper p="lg" shadow="md" radius={"sm"}>
      <Title order={2} mb="lg">
        Participant: {participantId}
      </Title>
      <Text>Group: {groupName}</Text>
      <Text>
        Logged In: {new Date(participantData.loggedIn).toLocaleString()}
      </Text>

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
              const email = emails[emailId];

              const emailEvents = emailData.events.map((event) => ({
                ...event,
                emailTitle: email.title,
                emailId,
              }));

              return (
                <ExperimentEmailEventsTimeline
                  key={emailId}
                  email={email}
                  emailEvents={emailEvents}
                />
              );
            }
          )}
        </Tabs.Panel>

        <Tabs.Panel value="emails" pt="xs">
          {Object.entries(participantData.emails).map(([emailId, data]) => {
            const emailStats = data as EmailStats;
            const email = emails[emailId];
            if (!email) return null;
            return (
              <Card
                key={emailId}
                shadow="sm"
                padding="lg"
                radius="md"
                withBorder
                mb="md"
              >
                <Text fw={500}>{email.title}</Text>
                <Text size="sm" c="dimmed">
                  From: {`${email.senderName} <${email.senderAddress}>`}
                </Text>
                <Text size="sm" mt="xs">
                  Replies: {emailStats.replies.length}
                </Text>
                {emailStats.replies.map((reply, index) => (
                  <Text key={index} size="sm" mt="xs">
                    Reply at {new Date(reply.createdAt).toLocaleString()}:{" "}
                    {reply.content}
                  </Text>
                ))}
                <Text size="sm" mt="xs">
                  Events: {data.events.length}
                </Text>
                {emailStats.events.map((event, index) => (
                  <Group key={index} gap={4} mt="xs">
                    <Badge>{event.type}</Badge>
                    <Text size="xs">
                      {new Date(event.timestamp).toLocaleString()}
                    </Text>
                  </Group>
                ))}
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
              </Card>
            );
          })}
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
  }, [experimentStats, emailId]);
  
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
    return <Text>No data for {eventType}</Text>;
  }
  return (
    <div ref={heatmapContainerRef}>
      <ExperimentEmailPreview emailData={{
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
      }} />
    </div>
  );
}
