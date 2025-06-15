import { UserEvent, UserEventType } from "@/mail/store/types";
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
  
  function calculateTotalOpenTime(events: UserEvent[]) {
    const openEvents = events
      .filter((e) => e.type === UserEventType.TIME_OPENED)
      .sort(
        (a, b) =>
          new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      );
    const closeEvents = events
      .filter((e) => e.type === UserEventType.TIME_CLOSED)
      .sort(
        (a, b) =>
          new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      );

    let totalTime = 0;

    for (let i = 0; i < Math.min(openEvents.length, closeEvents.length); i++) {
      const openTime = new Date(openEvents[i].timestamp).getTime();
      const closeTime = new Date(closeEvents[i].timestamp).getTime();

      if (closeTime >= openTime) {
        totalTime += closeTime - openTime;
      }
    }

    return Math.round(totalTime / 1000);
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
      value: `${calculateTotalOpenTime(emailData.events)}s`,
      caption: "Duration email was open",
    },
    {
      title: "Replies",
      icon: MessageCircle,
      value: replyCount,
      caption: "Responses sent",
    },
    {
      title: "Interactions",
      icon: Link,
      value: interactionCount,
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
