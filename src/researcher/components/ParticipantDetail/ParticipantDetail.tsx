"use client";

import { participants } from "@/mocks/data/accounts";
import { mockEmails } from "@/mocks/data/emails";
import { mockExperiments } from "@/mocks/data/experiments";
import { mockTrackingData } from "@/mocks/data/tracking";
import { EmailCreatePayload } from "@/researcher/store/types";
import {
  Badge,
  Card,
  Container,
  Group,
  Tabs,
  Text,
  Timeline,
  Title,
} from "@mantine/core";
import { IconClick, IconClock, IconFile, IconMail } from "@tabler/icons-react";
import HeatMap from "heatmap-ts";
import { useEffect, useRef } from "react";
import { useExperimentContext } from "../ExperimentContext/ExperimentContext";
import ExperimentEmailPreview from "../ExperimentEmailPreview";

export default function ParticipantDetail({
  participantId,
}: {
  participantId: string;
}) {
  const experiment = useExperimentContext();
  const participant = participants.find((p) => p.id === participantId);
  const participantData = mockTrackingData[experiment.id]?.[participantId];

  if (!participant || !participantData) {
    return <Text>Participant not found</Text>;
  }

  const groupName =
    mockExperiments[0].groups.find((g) => g.id === participantData.groupId)
      ?.name || "N/A";
  const emailEvents = Object.entries(participantData.emails)
    .flatMap(([emailId, data]) => {
      const email = mockEmails.find((e) => e.id === emailId);
      return data.events.map((event) => ({
        ...event,
        emailTitle: email?.title || "Unknown Email",
        emailId,
      }));
    })
    .sort(
      (a, b) =>
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );

  return (
    <Container size="lg" py="xl">
      <Title order={2} mb="lg">
        Participant: {participant.username}
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
                  ) : event.type === "CLICK" ? (
                    <IconClick size={16} />
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
            const email = mockEmails.find((e) => e.id === emailId);
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
                  Replies: {data.replies.length}
                </Text>
                {data.replies.map((reply, index) => (
                  <Text key={index} size="sm" mt="xs">
                    Reply at {new Date(reply.createdAt).toLocaleString()}:{" "}
                    {reply.content}
                  </Text>
                ))}
                <Text size="sm" mt="xs">
                  Events: {data.events.length}
                </Text>
                {data.events.map((event, index) => (
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
                  emailId={email.id}
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
  const experiment = useExperimentContext();
  const heatmapContainerRef = useRef<HTMLDivElement>(null);
  const heatmapInstanceRef = useRef<HeatMap | null>(null);

  const heatmapData = participantId
    ? mockTrackingData[experiment.id]?.[participantId]?.emails?.[
        emailId
      ]?.events?.find((event) => event.type === "HEATMAP")?.extra || []
    : [];
  useEffect(() => {
    if (!heatmapContainerRef.current || !heatmapData.length) {
      console.log("Heatmap: No container or data", {
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
    <div style={{ position: "relative" }} ref={heatmapContainerRef}>
      <ExperimentEmailPreview emailData={emailData} />
    </div>
  );
}
