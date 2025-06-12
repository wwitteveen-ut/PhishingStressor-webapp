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
  Tooltip,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
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
    <Card shadow="none" padding="lg" radius="md" pl="0">
      <Group mb={"xs"} align="center">
        <Group gap={0} align="center">
          <Button
            variant="transparent"
            pl="0"
            onClick={() => toggle()}
            rightSection={!opened ? <IconChevronDown size={16} /> : <IconChevronUp size={16} />}
          >
          <Text c="blue.6" fw={500}>Events: {emailEvents.length}</Text>
          </Button>
        </Group>
        <Badge>
          {email.scheduledFor === 0
            ? "immediate"
            : `${email.scheduledFor} ${
                email.scheduledFor === 1 ? "minute" : "minutes"
              }`}
        </Badge>
        <Tooltip bg="gray.4" label={email.groups.map((group) =>(
          <Badge key={group.id} variant="white" color="blue" size="xs">{group.name}</Badge>
        ))}>
        <Badge variant="outline" color="blue">
          Groups: {email.groups.length}
        </Badge> 
        </Tooltip>

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
