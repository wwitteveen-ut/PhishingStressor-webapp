import { ExperimentStats, ResearcherEmail } from "@/researcher/store/types";
import {
  Group,
  Paper,
  SimpleGrid,
  Text,
  ThemeIcon,
  useMantineTheme,
} from "@mantine/core";
import {
  Clock,
  Link,
  Mail,
  MessageCircle,
  Paperclip,
  Shield,
  TextCursor,
} from "lucide-react";
import { ReactNode } from "react";
import { useExperimentContext } from "../ExperimentContext/ExperimentContext";
import { useExperimentStatsContext } from "../ExperimentStatsContext/ExperimentStatsContext";

interface StatsCardProps {
  title: string;
  icon: ReactNode;
  value: string;
  caption?: ReactNode;
}

export default function ExperimentStatsCard({
  title,
  icon,
  value,
  caption,
}: StatsCardProps) {
  return (
    <Paper withBorder shadow="none" p="md" radius="md">
      <Group justify="space-between">
        <Text
          size="xs"
          c="dimmed"
          style={{
            fontWeight: 700,
            textTransform: "uppercase",
          }}
        >
          {title}
        </Text>
        <ThemeIcon variant="transparent" color="blue">
          {icon}
        </ThemeIcon>
      </Group>

      <Group align="flex-end" gap="xs" mt={25}>
        <Text
          style={{
            fontSize: 24,
            fontWeight: 700,
            lineHeight: 1,
          }}
        >
          {value}
        </Text>
      </Group>

      <Text fz="xs" c="dimmed" mt={7}>
        {caption || "Activity metric"}
      </Text>
    </Paper>
  );
}

export function GlobalStats({ participantId }: { participantId: string }) {
  const theme = useMantineTheme();
  const { experimentStats } = useExperimentStatsContext();
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

  const avgHoverTime =
    hoverCount > 0 ? (totalHoverTime / hoverCount / 1000).toFixed(1) : "0";

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
      caption: "Responses to emails",
    },
    {
      title: "Link Clicks",
      icon: Link,
      value: totalLinkClicks.toString(),
      diff: 0,
      caption: "Clicked links in emails",
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
      caption: "Downloaded attachments",
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
  ] as const;

  return (
    <SimpleGrid cols={{ base: 3, xs: 3, sm: 3, md: 4, lg: 6, xl: 6 }}>
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

export function EmailStats({
  participantId,
  emailId,
}: {
  participantId: string;
  emailId: string;
}) {
  const theme = useMantineTheme();
  const { experimentStats } = useExperimentStatsContext();
  const emailData = experimentStats?.[participantId]?.emails[emailId];

  if (!emailData) {
    return <Text>No data available for email</Text>;
  }

  // Calculate time spent open
  const openEvent = emailData.events.find((e) => e.type === "TIME_OPENED");
  const closeEvent = emailData.events.find((e) => e.type === "TIME_CLOSED");
  let timeOpen = "N/A";
  if (openEvent) {
    const openTime = new Date(openEvent.timestamp).getTime();
    const closeTime = closeEvent
      ? new Date(closeEvent.timestamp).getTime()
      : openTime + 5 * 60 * 1000; // Assume 5 min if no close
    const seconds = Math.round((closeTime - openTime) / 1000);
    timeOpen =
      seconds >= 60
        ? `${Math.floor(seconds / 60)}m ${seconds % 60}s`
        : `${seconds}s`;
  }

  // Count replies
  const replyCount = emailData.replies.length.toString();

  // Count interactions (clicks, link clicks, link hovers, heatmap, attachments)
  const interactionCount = emailData.events
    .filter((e) =>
      [
        "CLICK",
        "LINK_CLICK",
        "LINK_HOVERED",
        "HEATMAP",
        "ATTACHMENT_DOWNLOADED",
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
    <div
      style={{
        padding: `calc(${theme.spacing.xl} * 1.5)`,
      }}
    >
      <SimpleGrid cols={{ base: 1, xs: 2, md: 3 }}>
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
    </div>
  );
}

export function ExperimentGlobalStats() {
  const theme = useMantineTheme();
  const { experimentStats, experimentEmails } = useExperimentStatsContext();
  const experiment = useExperimentContext();

  // Efficiently compute aggregates
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

    Object.values(stats).forEach((participant) => {
      const emailData = participant.emails;
      const emailIds = Object.keys(emailData);

      emailIds.forEach((emailId) => {
        const email = emailData[emailId];
        // Emails opened
        if (email.events.some((event) => event.type === "TIME_OPENED")) {
          totalEmailsOpened += 1;
        }
        // Replies
        totalReplies += email.replies.length;
        // Events processing
        email.events.forEach((event) => {
          totalEvents += 1;
          if (event.type === "LINK_CLICK") {
            totalLinkClicks += 1;
            if (phishingEmailIds.has(emailId)) {
              participantsWithPhishingClicks.add(participant.groupId);
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
    const phishingSusceptibility =
      Object.keys(stats).length > 0
        ? Math.round(
            (participantsWithPhishingClicks.size / Object.keys(stats).length) *
              100
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
    <SimpleGrid cols={{ base: 1, xs: 2, sm: 3, md: 4, lg: 4 }}>
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
