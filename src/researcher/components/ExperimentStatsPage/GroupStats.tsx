"use client";
import { ExperimentStats, ResearcherEmail } from "@/researcher/store/types"; // Adjust import path for types
import { SimpleGrid, useMantineTheme } from "@mantine/core";
import {
  Clock,
  Link,
  Mail,
  MessageCircle,
  Paperclip,
  Shield,
  TextCursor,
} from "lucide-react";
import { useExperimentContext } from "../ExperimentContext/ExperimentContext"; // Adjust import path as needed
import ExperimentStatsCard from "../ExperimentStatsCard";
import { useExperimentStatsContext } from "../ExperimentStatsContext/ExperimentStatsContext";

interface GroupStatsProps {
  groupId: string;
}

export function GroupStats({ groupId }: GroupStatsProps) {
  const theme = useMantineTheme();
  const experiment = useExperimentContext();
  const { experimentStats, experimentEmails } = useExperimentStatsContext();
  const group = experiment?.groups.find((g) => g.id === groupId);

  // Efficiently compute aggregates for the group
  const computeStats = (stats: ExperimentStats, emails: ResearcherEmail[]) => {
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
    const participantsWithPhishingClicks = new Set<string>();

    Object.entries(stats).forEach(([participantId, participant]) => {
      if (participant.groupId !== groupId) return; // Filter by groupId
      const emailData = participant.emails;
      const emailIds = Object.keys(emailData);

      emailIds.forEach((emailId) => {
        const email = emailData[emailId];
        if (email.events.some((event) => event.type === "TIME_OPENED")) {
          totalEmailsOpened += 1;
        }
        totalReplies += email.replies.length;
        email.events.forEach((event) => {
          totalEvents += 1;
          if (event.type === "LINK_CLICK") {
            totalLinkClicks += 1;
            if (phishingEmailIds.has(emailId)) {
              participantsWithPhishingClicks.add(participantId);
            }
          } else if (event.type === "ATTACHMENT_DOWNLOADED") {
            totalAttachments += 1;
          } else if (event.type === "CLICK") {
            totalClicks += 1;
          } else if (event.type === "LINK_HOVERED" && event.extra) {
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
    const participantCount = Object.values(stats).filter(
      (p) => p.groupId === groupId
    ).length;
    const phishingSusceptibility =
      participantCount > 0
        ? Math.round(
            (participantsWithPhishingClicks.size / participantCount) * 100
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
      phishingSusceptibility,
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
    phishingSusceptibility,
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
      icon: TextCursor,
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
      icon: TextCursor,
      value: totalEvents.toString(),
      diff: 0,
      caption: "All recorded events",
    },
    {
      title: "Phishing Susceptibility",
      icon: Shield,
      value: `${phishingSusceptibility}%`,
      diff: 0,
      caption: "Participants clicking phishing links",
    },
  ] as const;

  return (
    <SimpleGrid cols={{ base: 1, xs: 3 }}>
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
