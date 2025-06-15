"use client";
import { UserEventType } from "@/mail/store/types";
import { ExperimentStats, ResearcherEmail } from "@/researcher/store/types";
import { SimpleGrid } from "@mantine/core";
import { IconUsersGroup } from "@tabler/icons-react";
import {
  Clock,
  Link,
  Mail,
  MessageCircle,
  MousePointerClick,
  Paperclip,
  ShieldAlert,
  SquareStack,
  Users,
} from "lucide-react";
import { useExperimentContext } from "../ExperimentContext/ExperimentContext";
import ExperimentStatsCard from "../ExperimentStatsCard";
import { useExperimentStatsContext } from "../ExperimentStatsContext/ExperimentStatsContext";

interface GroupStatsProps {
  groupId: string;
}

export default function GroupStats({ groupId }: GroupStatsProps) {
  const { experimentStats, experimentEmails } = useExperimentStatsContext();
  const experiment = useExperimentContext();
  const group = experiment.groups.find((g) => g.id === groupId);

  const computeStats = (stats: ExperimentStats, emails: ResearcherEmail[]) => {
    let participantCount = 0;
    let totalEmailsOpened = 0;
    let totalReplies = 0;
    let totalLinkClicks = 0;
    let totalAttachments = 0;
    let totalClicks = 0;
    let totalHoverTime = 0;
    let hoverCount = 0;
    let totalEvents = 0;
    const phishingEmailIds = new Set(
      emails.filter((e) => e.isPhishing).map((e) => e.id)
    );
    const compromisedParticipants = new Set<string>();

    Object.entries(stats).forEach(([participantId, participant]) => {
      if (participant.groupId !== groupId) return;
      participantCount += 1;
      const emailData = participant.emails;
      const emailIds = Object.keys(emailData);

      emailIds.forEach((emailId) => {
        const email = emailData[emailId];
        if (
          email.events.some((event) => event.type === UserEventType.TIME_OPENED)
        ) {
          totalEmailsOpened += 1;
        }
        totalReplies += email.replies.length;
        if (phishingEmailIds.has(emailId)) {
          compromisedParticipants.add(participantId);
        }
        email.events.forEach((event) => {
          totalEvents += 1;
          if (event.type === UserEventType.LINK_CLICKED) {
            totalLinkClicks += 1;
            if (phishingEmailIds.has(emailId)) {
              compromisedParticipants.add(participantId);
            }
          } else if (event.type === UserEventType.ATTACHMENT_OPENED) {
            totalAttachments += 1;
            if (phishingEmailIds.has(emailId)) {
              compromisedParticipants.add(participantId);
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
      });
    });

    const avgHoverTime =
      hoverCount > 0 ? (totalHoverTime / hoverCount / 1000).toFixed(1) : "0";
    const phishingSusceptibility =
      participantCount > 0
        ? Math.round((compromisedParticipants.size / participantCount) * 100)
        : 0;

    return {
      participantCount,
      totalEmailsOpened,
      totalReplies,
      totalLinkClicks,
      totalAttachments,
      totalClicks,
      avgHoverTime,
      totalEvents,
      phishingSusceptibility,
    };
  };

  const {
    participantCount,
    totalEmailsOpened,
    totalReplies,
    totalLinkClicks,
    totalAttachments,
    totalClicks,
    avgHoverTime,
    totalEvents,
    phishingSusceptibility,
  } = computeStats(
    experimentStats || {},
    Object.values(experimentEmails || {})
  );

  const stats = [
    {
      title: "Group Capacity",
      icon: IconUsersGroup,
      value: group?.capacity.toString() || "0",
      caption: "Total participants in the group",
    },
    {
      title: "Participants",
      icon: Users,
      value: participantCount.toString(),
      caption: "Total participants participated in the experiment",
    },
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
      caption: "Total replies sent",
    },
    {
      title: "Link Clicks",
      icon: Link,
      value: totalLinkClicks.toString(),
      caption: "Total links clicked",
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
      caption: "Total attachments downloaded",
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
      title: "Phishing Susceptibility",
      icon: ShieldAlert,
      value: `${phishingSusceptibility}%`,
      caption:
        "Participants clicking phishing links, downloading attachments, and sending replies",
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
