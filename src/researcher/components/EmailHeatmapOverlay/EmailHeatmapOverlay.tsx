"use client";

import { UserEventType } from "@/mail/store/types";
import { getEventStyle } from "@/shared/utils/eventsHelper";
import { Box, Button, Collapse, Group, Paper, Tooltip } from "@mantine/core";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import HeatMap, { DataPoint } from "heatmap-ts";
import { useEffect, useMemo, useRef, useState } from "react";
import ExperimentEmailPreview from "../ExperimentEmailPreview";
import { useExperimentStatsContext } from "../ExperimentStatsContext/ExperimentStatsContext";

interface EmailHeatmapOverlayProps {
  emailId: string;
  participantId: string;
  eventType: UserEventType;
}

export default function EmailHeatmapOverlay({
  emailId,
  participantId,
  eventType,
}: EmailHeatmapOverlayProps) {
  const { experimentStats, experimentEmails } = useExperimentStatsContext();
  const emailData = experimentEmails[emailId];
  const heatmapContainerRef = useRef<HTMLDivElement>(null);
  const heatmapInstanceRef = useRef<HeatMap | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const heatmapData = useMemo(() => {
    const heatmapEvents =
      experimentStats[participantId].emails[emailId]?.events?.filter(
        (event) => event.type === eventType
      ) || [];

    const allDataPoints = heatmapEvents.reduce<DataPoint[]>((res, event) => {
      try {
        if (event?.extra && typeof event.extra === "string") {
          const parsed = JSON.parse(event.extra);
          if (Array.isArray(parsed)) {
            return res.concat(parsed as DataPoint[]);
          } else {
            return res.concat([parsed as DataPoint]);
          }
        }
      } catch (error) {
        console.warn(
          `Failed to parse extra data for event: ${JSON.stringify(event)}`,
          error
        );
      }
      return res;
    }, []);

    return allDataPoints;
  }, [experimentStats, emailId, eventType, participantId]);

  useEffect(() => {
    if (!heatmapContainerRef.current || !heatmapData.length) {
      return;
    }

    const updateHeatmapSize = () => {
      if (!heatmapContainerRef.current) return;
      const { width, height } =
        heatmapContainerRef.current.getBoundingClientRect();

      if (width === 0 || height === 0) {
        return;
      }

      if (!heatmapInstanceRef.current) {
        heatmapInstanceRef.current = new HeatMap({
          container: heatmapContainerRef.current!,
          maxOpacity: 0.6,
          width: width,
          height: height + 30,
          radius: 30,
          blur: 0.9,
        });
      }

      const points = heatmapData.map((point) => ({
        x: Math.round(point.x * width),
        y: Math.round(point.y * height),
        value: point.value,
        radius: 20,
      }));

      heatmapInstanceRef.current.setData({
        max: 100,
        min: 1,
        data: points,
      });
    };

    updateHeatmapSize();

    const resizeObserver = new ResizeObserver(() => {
      updateHeatmapSize();
    });
    resizeObserver.observe(heatmapContainerRef.current);

    return () => {
      resizeObserver.disconnect();
      if (heatmapInstanceRef.current) {
        heatmapInstanceRef.current.setData({ max: 0, min: 0, data: [] });
        heatmapInstanceRef.current = null;
      }
    };
  }, [heatmapData, emailId, participantId]);

  if (!heatmapData.length) {
    return (
      <Box>
        <Tooltip label="No data for this event type">
          <Button
            variant="transparent"
            disabled
            onClick={() => setIsCollapsed(!isCollapsed)}
            leftSection={getEventStyle(eventType, 16).icon}
          >
            Heatmap data {emailData.title} ({eventType})
          </Button>
        </Tooltip>
      </Box>
    );
  }

  return (
    <Box py="md">
      <Group justify="space-between" align="center">
        <Button
          variant={isCollapsed ? "light" : "filled"}
          onClick={() => setIsCollapsed(!isCollapsed)}
          leftSection={getEventStyle(eventType, 16).icon}
          style={{
            borderBottomLeftRadius: isCollapsed ? "0.3rem" : 0,
            borderBottomRightRadius: isCollapsed ? "0.3rem" : 0,
          }}
          rightSection={
            isCollapsed ? (
              <IconChevronDown size={16} />
            ) : (
              <IconChevronUp size={16} />
            )
          }
        >
          Heatmap for {emailData.title} ({eventType})
        </Button>
      </Group>
      <Collapse in={!isCollapsed}>
        <Paper
          pb="md"
          withBorder
          radius="sm"
          shadow="xs"
          style={{
            borderColor: "var(--mantine-color-blue-5)",
            borderTopLeftRadius: "0",
          }}
        >
          <Box ref={heatmapContainerRef}>
            <ExperimentEmailPreview
              emailData={{
                metadata: {
                  title: emailData.title,
                  senderName: emailData.senderName,
                  senderEmail: emailData.senderAddress,
                  content: emailData.content,
                  scheduledFor: emailData.scheduledFor,
                  groups: [],
                  isPhishing: false,
                },
                files: [],
              }}
            />
          </Box>
        </Paper>
      </Collapse>
    </Box>
  );
}
