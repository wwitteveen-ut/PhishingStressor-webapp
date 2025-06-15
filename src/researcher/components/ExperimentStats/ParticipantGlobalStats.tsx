import { UserEventType } from "@/mail/store/types";
import { SimpleGrid, Text } from "@mantine/core";
import {
  Clock,
  Link,
  Mail,
  MessageCircle,
  MousePointerClick,
  Paperclip,
  ShieldAlert,
  SquareStack,
} from "lucide-react";
import ExperimentStatsCard from "../ExperimentStatsCard/ExperimentStatsCard";
import { useExperimentStatsContext } from "../ExperimentStatsContext/ExperimentStatsContext";

export default function ParticipantGlobalStats({
  participantId,
}: {
  participantId: string;
}) {
  const { experimentStats, experimentEmails } = useExperimentStatsContext();
  const participantData = experimentStats?.[participantId];

  if (!participantData) {
    return <Text>No data available for participant</Text>;
  }

  const emailData = participantData.emails;
  const emailIds = Object.keys(emailData);

  let totalEmailsOpened = 0;
  let totalReplies = 0;
  let totalLinkClicks = 0;
  let totalAttachments = 0;
  let totalClicks = 0;
  let totalHoverTime = 0;
  let hoverCount = 0;
  let totalEvents = 0;
  let phishingEmails = 0;
  let phishingInteractions = 0;

  emailIds.forEach((emailId) => {
    const email = emailData[emailId];
    const emailInfo = experimentEmails[emailId];
    if (
      email.events.some((event) => event.type === UserEventType.TIME_OPENED)
    ) {
      totalEmailsOpened += 1;
    }
    totalReplies += email.replies.length;
    if (emailInfo.isPhishing) {
      phishingEmails += 1;
      let hasInteraction = false;
      email.events.forEach((event) => {
        totalEvents += 1;
        if (event.type === UserEventType.LINK_CLICKED) {
          totalLinkClicks += 1;
          if (emailInfo.isPhishing) {
            hasInteraction = true;
          }
        } else if (event.type === UserEventType.ATTACHMENT_OPENED) {
          totalAttachments += 1;
          if (emailInfo.isPhishing) {
            hasInteraction = true;
          }
        } else if (event.type === UserEventType.CLICK) {
          totalClicks += 1;
        } else if (event.type === UserEventType.LINK_HOVERED && event.extra) {
          const duration = JSON.parse(event.extra).duration;
          if (typeof duration === "number") {
            totalHoverTime += duration;
            hoverCount += 1;
          }
        }
      });
      if (hasInteraction) {
        phishingInteractions += 1;
      }
    } else {
      email.events.forEach((event) => {
        totalEvents += 1;
        if (event.type === UserEventType.LINK_CLICKED) {
          totalLinkClicks += 1;
        } else if (event.type === UserEventType.ATTACHMENT_OPENED) {
          totalAttachments += 1;
        } else if (event.type === UserEventType.CLICK) {
          totalClicks += 1;
        } else if (event.type === UserEventType.LINK_HOVERED && event.extra) {
          const duration = JSON.parse(event.extra).duration;
          if (typeof duration === "number") {
            totalHoverTime += duration;
            hoverCount += 1;
          }
        }
      });
    }
  });

  const avgHoverTime =
    hoverCount > 0 ? (totalHoverTime / hoverCount / 1000).toFixed(1) : "0";
  const phishingInteractionRate =
    phishingEmails > 0
      ? Math.round((phishingInteractions / phishingEmails) * 100)
      : 0;

  const stats = [
    {
      title: "Emails Opened",
      icon: Mail,
      value: totalEmailsOpened.toString(),
      caption: "Total emails viewed",
    },
    {
      title: "Replies Sent",
      icon: MessageCircle,
      value: totalReplies.toString(),
      caption: "Responses to emails",
    },
    {
      title: "Link Clicks",
      icon: Link,
      value: totalLinkClicks.toString(),
      caption: "Clicked links in emails",
    },
    {
      title: "Clicks",
      icon: MousePointerClick,
      value: totalClicks.toString(),
      caption: "General click events",
    },
    {
      title: "Attachments",
      icon: Paperclip,
      value: totalAttachments.toString(),
      caption: "Downloaded attachments",
    },
    {
      title: "Avg Hover Time",
      icon: Clock,
      value: `${avgHoverTime}s`,
      caption: "Average link hover duration",
    },
    {
      title: "Total Events",
      icon: SquareStack,
      value: totalEvents.toString(),
      caption: "All recorded events",
    },
    {
      title: "Phishing Interaction Rate",
      icon: ShieldAlert,
      value: `${phishingInteractionRate}%`,
      caption: "Phishing emails with link clicks or attachments opened",
    },
  ] as const;

  return (
    <SimpleGrid cols={{ base: 1, xs: 2, sm: 3, lg: 4 }}>
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
