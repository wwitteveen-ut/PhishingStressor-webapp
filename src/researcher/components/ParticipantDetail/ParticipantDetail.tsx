"use client";

import { UserEvent } from "@/mail/store/types";
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
  Tabs,
  Text,
  Timeline,
  Title,
} from "@mantine/core";
import { IconClock, IconFile, IconMail } from "@tabler/icons-react";
import HeatMap, { DataPoint } from "heatmap-ts";
import { useEffect, useMemo, useRef, useState } from "react";
import { useExperimentContext } from "../ExperimentContext/ExperimentContext";
import ExperimentEmailPreview from "../ExperimentEmailPreview";
import { useExperimentStatsContext } from "../ExperimentStatsContext/ExperimentContext";

export default function ParticipantDetail({
  participantId,
}: {
  participantId: string;
}) {
  const experiment = useExperimentContext();
  const experimentStats = useExperimentStatsContext();
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
    <Container size="lg" py="xl">
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
          <Timeline
            active={emailEvents.length - 1}
            bulletSize={24}
            lineWidth={2}
          >
            {emailEvents.map((event, index) => (
              <Timeline.Item
                key={index}
                bullet={
                  event.type === "TIME_OPENED" ? (
                    <IconMail size={16} />
                  ) : event.type === "ATTACHMENT_OPENED" ? (
                    <IconFile size={16} />
                  ) : (
                    <IconClock size={16} />
                  )
                }
                title={event.emailTitle}
              >
                <Text size="sm">
                  {event.type.replace("_", " ").toLowerCase()}
                </Text>
                <Text size="xs" c="dimmed">
                  {new Date(event.timestamp).toLocaleString()}
                </Text>
                {event.type === "HEATMAP" && (
                  <Text size="xs">Heatmap points: {event.extra?.length}</Text>
                )}
              </Timeline.Item>
            ))}
          </Timeline>
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
                  emailData={{
                    metadata: {
                      title: email.title,
                      senderName: email.senderName,
                      senderAddress: email.senderAddress,
                      content: email.content,
                      scheduledFor: email.scheduledFor,
                      groups: [],
                      isPhishing: false,
                    },
                    files: [],
                  }}
                  emailId={emailId}
                  participantId={participantId}
                />
              </Card>
            );
          })}
        </Tabs.Panel>
      </Tabs>
    </Container>
  );
}

interface EmailHeatmapOverlayProps {
  emailData: EmailCreatePayload;
  emailId: string;
  participantId: string;
}

export function EmailHeatmapOverlay({
  emailData,
  emailId,
  participantId,
}: EmailHeatmapOverlayProps) {
  const experimentStats = useExperimentStatsContext();
  const heatmapContainerRef = useRef<HTMLDivElement>(null);
  const heatmapInstanceRef = useRef<HeatMap | null>(null);
  const heatmapJSON = experimentStats[participantId].emails[
    emailId
  ].events?.find((event) => event.type === "HEATMAP")?.extra;

  const heatmapData = useMemo(
    () => (heatmapJSON ? JSON.parse(heatmapJSON) : []),
    [heatmapJSON]
  ) as DataPoint[];

  useEffect(() => {
    if (!heatmapContainerRef.current || !heatmapData.length) {
      console.log("Heatmap: No container or data", {
        heatmapContainerRef,
        heatmapData,
        emailId,
        participantId,
      });
      return;
    }

    const updateHeatmapSize = () => {
      if (!heatmapContainerRef.current) return;
      const { width, height } =
        heatmapContainerRef.current.getBoundingClientRect();

      if (width === 0 || height === 0) {
        console.warn("Heatmap: Container has zero dimensions", {
          width,
          height,
        });
        return;
      }

      if (!heatmapInstanceRef.current) {
        heatmapInstanceRef.current = new HeatMap({
          container: heatmapContainerRef.current!,
          maxOpacity: 0.6,
          radius: 50,
          blur: 0.9,
        });
      }
      const canvas = heatmapContainerRef.current!.querySelector("canvas");
      if (canvas) {
        canvas.width = width;
        canvas.height = height;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
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

      console.log("Heatmap: Initialized/Updated with points", points);
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

  return (
    <div ref={heatmapContainerRef}>
      <ExperimentEmailPreview emailData={emailData} />
    </div>
  );
}
