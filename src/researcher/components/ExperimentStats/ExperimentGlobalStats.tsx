import { UserEventType } from "@/mail/store/types";
import { ExperimentStats, ResearcherEmail } from "@/researcher/store/types";
import { SimpleGrid } from "@mantine/core";
import {
  Clock,
  Link,
  Mail,
  MessageCircle,
  MousePointerClick,
  Paperclip,
  ShieldAlert,
  ShieldUser,
  SquareStack,
  Users,
} from "lucide-react";
import ExperimentStatsCard from "../ExperimentStatsCard/ExperimentStatsCard";
import { useExperimentStatsContext } from "../ExperimentStatsContext/ExperimentStatsContext";

export default function ExperimentGlobalStats() {
  const { experimentStats, experimentEmails } = useExperimentStatsContext();

  const computeStats = (stats: ExperimentStats, emails: ResearcherEmail[]) => {
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
    const participantsWithPhishingInteraction = new Set<string>();
    const totalParticipants = Object.keys(stats).length;

    const phishingEmailIds = new Set(
      emails.filter((e) => e.isPhishing).map((e) => e.id)
    );

    Object.values(stats).forEach((participant) => {
      const emailData = participant.emails;
      const emailIds = Object.keys(emailData);

      emailIds.forEach((emailId) => {
        const email = emailData[emailId];
        let hasInteraction = false;
        if (
          email.events.some((event) => event.type === UserEventType.TIME_OPENED)
        ) {
          totalEmailsOpened += 1;
        }
        totalReplies += email.replies.length;
        if (phishingEmailIds.has(emailId)) {
          phishingEmails += 1;
        }
        email.events.forEach((event) => {
          totalEvents += 1;
          if (event.type === UserEventType.LINK_CLICKED) {
            totalLinkClicks += 1;
            if (phishingEmailIds.has(emailId)) {
              hasInteraction = true;
            }
          } else if (event.type === UserEventType.ATTACHMENT_OPENED) {
            totalAttachments += 1;
            if (phishingEmailIds.has(emailId)) {
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
          participantsWithPhishingInteraction.add(participant.groupId);
        }
      });
    });

    const avgHoverTime =
      hoverCount > 0 ? (totalHoverTime / hoverCount / 1000).toFixed(1) : "0";
    const phishingInteractionRate =
      phishingEmails > 0
        ? Math.round((phishingInteractions / phishingEmails) * 100)
        : 0;
    const participantPhishingInteractionRate =
      totalParticipants > 0
        ? Math.round(
            (participantsWithPhishingInteraction.size / totalParticipants) * 100
          )
        : 0;

    return {
      totalEmailsOpened,
      totalReplies,
      totalLinkClicks,
      totalAttachments,
      totalClicks,
      avgHoverTime,
      totalEvents,
      phishingInteractionRate,
      participantPhishingInteractionRate,
      totalParticipants,
    };
  };

  const {
    totalEmailsOpened,
    totalReplies,
    totalLinkClicks,
    totalAttachments,
    totalClicks,
    avgHoverTime,
    totalEvents,
    phishingInteractionRate,
    participantPhishingInteractionRate,
    totalParticipants,
  } = computeStats(
    experimentStats || {},
    Object.values(experimentEmails || {})
  );

  const stats = [
    {
      title: "Emails Opened",
      icon: Mail,
      value: totalEmailsOpened.toString(),
      diff: 0,
      caption: "Total emails viewed",
    },
    {
      title: "Replies Sent",
      icon: MessageCircle,
      value: totalReplies.toString(),
      diff: 0,
      caption: "Total responses sent",
    },
    {
      title: "Link Clicks",
      icon: Link,
      value: totalLinkClicks.toString(),
      diff: 0,
      caption: "Total links clicked",
    },
    {
      title: "Clicks",
      icon: MousePointerClick,
      value: totalClicks.toString(),
      diff: 0,
      caption: "General click events",
    },
    {
      title: "Attachments",
      icon: Paperclip,
      value: totalAttachments.toString(),
      diff: 0,
      caption: "Total attachments downloaded",
    },
    {
      title: "Avg Hover Time",
      icon: Clock,
      value: `${avgHoverTime}s`,
      diff: 0,
      caption: "Average link hover duration",
    },
    {
      title: "Total Events",
      icon: SquareStack,
      value: totalEvents.toString(),
      diff: 0,
      caption: "All recorded events",
    },
    {
      title: "Phishing Interaction Rate",
      icon: ShieldAlert,
      value: `${phishingInteractionRate}%`,
      diff: 0,
      caption: "Phishing emails with link clicks or attachments opened",
    },
    {
      title: "Participants with Phishing Interaction",
      icon: ShieldUser,
      value: `${participantPhishingInteractionRate}%`,
      diff: 0,
      caption: "Participants who interacted with phishing emails",
    },
    {
      title: "Total Participants",
      icon: Users,
      value: totalParticipants.toString(),
      diff: 0,
      caption: "Participants in the experiment",
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
