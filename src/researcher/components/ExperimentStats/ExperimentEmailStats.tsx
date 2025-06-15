import { UserEventType } from "@/mail/store/types";
import { SimpleGrid, Text } from "@mantine/core";
import { Clock, Link, MessageCircle } from "lucide-react";
import ExperimentStatsCard from "../ExperimentStatsCard/ExperimentStatsCard";
import { useExperimentStatsContext } from "../ExperimentStatsContext/ExperimentStatsContext";

export default function ExperimentEmailStats({
  participantId,
  emailId,
}: {
  participantId: string;
  emailId: string;
}) {
  const { experimentStats } = useExperimentStatsContext();
  const emailData = experimentStats?.[participantId]?.emails[emailId];

  if (!emailData) {
    return <Text>No data available for email</Text>;
  }

  const openEvent = emailData.events.find(
    (e) => e.type === UserEventType.TIME_OPENED
  );
  const closeEvent = emailData.events.find(
    (e) => e.type === UserEventType.TIME_CLOSED
  );
  let timeOpen = "N/A";
  if (openEvent) {
    const openTime = new Date(openEvent.timestamp).getTime();
    const closeTime = closeEvent
      ? new Date(closeEvent.timestamp).getTime()
      : openTime + 5 * 60 * 1000;
    const seconds = Math.round((closeTime - openTime) / 1000);
    timeOpen =
      seconds >= 60
        ? `${Math.floor(seconds / 60)}m ${seconds % 60}s`
        : `${seconds}s`;
  }

  const replyCount = emailData.replies.length.toString();

  const interactionCount = emailData.events
    .filter((e) =>
      [
        UserEventType.CLICK,
        UserEventType.LINK_CLICKED,
        UserEventType.LINK_HOVERED,
        UserEventType.HEATMAP,
        UserEventType.ATTACHMENT_OPENED,
      ].includes(e.type)
    )
    .length.toString();

  const stats = [
    {
      title: "Time Open",
      icon: Clock,
      value: timeOpen,
      diff: 0,
      caption: "Duration email was open",
    },
    {
      title: "Replies",
      icon: MessageCircle,
      value: replyCount,
      diff: 0,
      caption: "Responses sent",
    },
    {
      title: "Interactions",
      icon: Link,
      value: interactionCount,
      diff: 0,
      caption: "Clicks, hovers, downloads",
    },
  ] as const;

  return (
    <SimpleGrid cols={{ base: 1, xs: 1, md: 2, lg: 3, xl: 4 }}>
      {stats.map((stat) => (
        <ExperimentStatsCard
          key={stat.title}
          title={stat.title}
          icon={<stat.icon size={22} strokeWidth={1.5} />}
          value={stat.value}
          caption={stat.caption}
        />
      ))}
    </SimpleGrid>
  );
}
