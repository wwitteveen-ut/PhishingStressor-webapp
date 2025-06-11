import { UserEventType } from "@/mail/store/types";
import { ResearcherEmail } from "@/researcher/store/types";
import {  Badge,
  Button,
  Card,
  Collapse,
  Group,
  Text,
  Timeline,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconTimelineEvent } from "@tabler/icons-react";
import { CircleDot, FileDown, Link, MailOpen, MailX, MousePointer, MousePointerClick, SquareArrowOutUpRight } from "lucide-react";

export default function ExperimentEmailEventsTimeline({
  email,
  emailEvents,
}: {
  email: ResearcherEmail;
  emailEvents: {
    emailTitle: string;
    emailId: string;
    type: UserEventType;
    timestamp: string;
    extra?: string;
  }[];
}) {
  const [opened, { toggle }] = useDisclosure(true);
  return (
    <Card shadow="none" padding="lg" radius="md" mb="md">
      <Group mb={"xs"} align="center">
        <Button onClick={toggle} variant="outline" size="xs">
          {opened ? "Hide events" : "Show events"}
        </Button>
        <Title order={3}>{email.title}</Title>
        <Badge>
          {email.scheduledFor === 0
            ? "immediate"
            : `${email.scheduledFor} ${
                email.scheduledFor === 1 ? "minute" : "minutes"
              }`}
        </Badge>
      </Group>
      <Collapse in={opened}>
        <Timeline active={emailEvents.length - 1} bulletSize={24} lineWidth={2}>
          {emailEvents.map((event, index) => (
            <Timeline.Item
              key={index}
              color={
                event.type === UserEventType.TIME_OPENED ? "blue.4" :
                event.type === UserEventType.TIME_CLOSED ? "gray.4" :
                event.type === UserEventType.HEATMAP ? "orange.5" :
                event.type === UserEventType.CLICK ? "green.4" :
                event.type === UserEventType.LINK_CLICK ? "red.4" :
                event.type === UserEventType.LINK_HOVER ? "yellow.4" :
                event.type === UserEventType.ATTACHMENT_DOWNLOADED ? "violet.4" :
                "gray.5"
              }
              bullet={
                event.type === UserEventType.TIME_OPENED ? (
                  <MailOpen size={16} />
                ) : event.type === UserEventType.TIME_CLOSED ? (
                  <MailX size={16} />
                ) : event.type === UserEventType.HEATMAP ? (
                  <MousePointer size={16} />
                ) : event.type === UserEventType.CLICK ? (
                  <MousePointerClick size={16} />
                ) : event.type === UserEventType.LINK_CLICK ? (
                  <SquareArrowOutUpRight size={16} />
                ) : event.type === UserEventType.LINK_HOVER ? (
                  <Link size={16} />
                ) : event.type === UserEventType.ATTACHMENT_DOWNLOADED ? (
                  <FileDown size={16} />
                ) : (
                  <CircleDot size={16} />
                )
              }
            >
              <Text size="sm">{event.type.replace("_", " ").toLowerCase()}</Text>
              <Text size="xs" c="dimmed">
                {new Date(event.timestamp).toLocaleString()}
              </Text>
              {event.type === "HEATMAP" && (
                <Text size="xs">Heatmap points: {event.extra?.length}</Text>
              )}
            </Timeline.Item>
          ))}
        </Timeline>
      </Collapse>
    </Card>
  );
}
