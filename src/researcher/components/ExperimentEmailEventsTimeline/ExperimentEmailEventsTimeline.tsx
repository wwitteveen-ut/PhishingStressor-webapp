import { UserEventType } from "@/mail/store/types";
import { getEventStyle } from "@/shared/utils/eventsHelper";
import { Button, Card, Collapse, Group, Text, Timeline } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";

export default function ExperimentEmailEventsTimeline({
  emailEvents,
  collapsable = true,
}: {
  emailEvents: {
    emailTitle: string;
    emailId: string;
    type: UserEventType;
    timestamp: string;
    extra?: string;
  }[];
  collapsable?: boolean;
}) {
  console.log(emailEvents);
  const [opened, { toggle }] = useDisclosure(!collapsable);
  return (
    <Card shadow="none" padding="lg" radius="md" pl="0">
      <Group mb={"xs"} align="center">
        <Group gap={0} align="center">
          {collapsable && (
            <Button
              variant="transparent"
              pl="0"
              onClick={() => toggle()}
              rightSection={
                !opened ? (
                  <IconChevronDown size={16} />
                ) : (
                  <IconChevronUp size={16} />
                )
              }
            >
              <Text c="blue.6" fw={500}>
                Events: {emailEvents.length}
              </Text>
            </Button>
          )}
        </Group>
      </Group>
      <Collapse in={opened}>
        <Timeline active={emailEvents.length - 1} bulletSize={24} lineWidth={2}>
          {emailEvents.map((event, index) => {
            const { color, icon } = getEventStyle(event.type);
            return (
              <Timeline.Item key={index} color={color} bullet={icon}>
                <Text size="sm">{getEventStyle(event.type).text}</Text>
                <Text size="xs" c="dimmed">
                  {new Date(event.timestamp).toLocaleString()}
                </Text>
                {event.type === UserEventType.HEATMAP && (
                  <Text size="xs">Heatmap points: {event.extra?.length}</Text>
                )}
              </Timeline.Item>
            );
          })}
        </Timeline>
      </Collapse>
    </Card>
  );
}
