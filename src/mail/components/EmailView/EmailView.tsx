"use client";
import { useEmailClientStore } from "@/mail/providers/EmailClientStoreProvider";
import { UserEventType } from "@/mail/store/types";
import {
  Box,
  Center,
  Container,
  Group,
  Stack,
  Text,
  TypographyStylesProvider,
} from "@mantine/core";
import { useMouse } from "@mantine/hooks";
import { useCallback, useEffect, useRef } from "react";
import EmailAttachmentList from "../EmailAttachmentList";
import EmailReplySection from "../EmailReplySection";
import TrashActionButton from "../TrashActionButton";

export default function EmailView() {
  const emailId = useEmailClientStore((state) => state.selectedEmailId);
  const emails = useEmailClientStore((state) => state.emails);
  const email = emails.find((email) => email.id === emailId);

  const toggleEmailTrashed = useEmailClientStore(
    (state) => state.toggleEmailTrashed
  );
  const addHeatmapData = useEmailClientStore((state) => state.addHeatmapData);
  const addSimpleEvent = useEmailClientStore((state) => state.addSimpleEvent);
  const addComplexEvent = useEmailClientStore((state) => state.addComplexEvent);

  const { ref, x, y } = useMouse({ resetOnExit: true });
  const contentRef = useRef<HTMLDivElement>(null);

  const latestCoords = useRef({ x: 0, y: 0 });
  const heatmapInterval = useRef<NodeJS.Timeout | null>(null);

  const currentHoveredLink = useRef<string | null>(null);
  const hoverStartTime = useRef<number | null>(null);
  const lastMousePosition = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleHoverEnd = useCallback(() => {
    if (currentHoveredLink.current && hoverStartTime.current) {
      const duration = Date.now() - hoverStartTime.current;
      const linkHref = currentHoveredLink.current.split("-").slice(1).join("-");

      if (duration > 50) {
        addComplexEvent(
          UserEventType.LINK_HOVERED,
          JSON.stringify({
            duration_ms: duration,
            href: linkHref,
          })
        );
      }
    }

    currentHoveredLink.current = null;
    hoverStartTime.current = null;
  }, [addComplexEvent]);

  useEffect(() => {
    latestCoords.current = { x, y };
    lastMousePosition.current = { x, y };

    if (currentHoveredLink.current && contentRef.current) {
      const elementAtPoint = document.elementFromPoint(
        lastMousePosition.current.x +
          (contentRef.current.getBoundingClientRect().left || 0),
        lastMousePosition.current.y +
          (contentRef.current.getBoundingClientRect().top || 0)
      );

      const linkAtPoint = elementAtPoint?.closest("a");
      const currentLinkHref = currentHoveredLink.current
        .split("-")
        .slice(1)
        .join("-");

      if (!linkAtPoint || linkAtPoint.href !== currentLinkHref) {
        handleHoverEnd();
      }
    }
  }, [x, y, currentHoveredLink, contentRef, handleHoverEnd]);

  useEffect(() => {
    handleHoverEnd();
  }, [emailId, handleHoverEnd]);

  useEffect(() => {
    if (heatmapInterval.current) {
      clearInterval(heatmapInterval.current);
    }

    if (!email) return;

    heatmapInterval.current = setInterval(() => {
      if (
        ref.current &&
        (latestCoords.current.x !== 0 || latestCoords.current.y !== 0)
      ) {
        const { x, y } = latestCoords.current;
        const width = ref.current.clientWidth;
        const height = ref.current.clientHeight;

        if (width > 0 && height > 0) {
          addHeatmapData({
            x: x / width,
            y: y / height,
            value: 10,
          });
        }
      }
    }, 100);

    return () => {
      if (heatmapInterval.current) {
        clearInterval(heatmapInterval.current);
      }
    };
  }, [email, addHeatmapData, ref, handleHoverEnd]);

  const handleLinkClick = useCallback(
    (event: MouseEvent) => {
      if (!email) return;

      const target = event.target as HTMLElement;
      const link = target.closest("a");

      if (link) {
        handleHoverEnd();

        addSimpleEvent(UserEventType.LINK_CLICKED);
      }
    },
    [email, addSimpleEvent, handleHoverEnd]
  );

  const handleLinkMouseEnter = useCallback(
    (event: MouseEvent) => {
      if (!email) return;

      const target = event.target as HTMLElement;
      const link = target.closest("a");

      if (link?.href) {
        const linkId = `${email.id}-${link.href}`;

        if (
          currentHoveredLink.current &&
          currentHoveredLink.current !== linkId
        ) {
          handleHoverEnd();
        }

        if (currentHoveredLink.current !== linkId) {
          currentHoveredLink.current = linkId;
          hoverStartTime.current = Date.now();
        }
      }
    },
    [email, handleHoverEnd]
  );

  const handleLinkMouseLeave = useCallback(
    (event: MouseEvent) => {
      if (!email) return;

      const target = event.target as HTMLElement;
      const link = target.closest("a");

      if (link?.href) {
        const linkId = `${email.id}-${link.href}`;

        if (currentHoveredLink.current === linkId) {
          handleHoverEnd();
        }
      }
    },
    [email, handleHoverEnd]
  );

  const handleGeneralClick = useCallback(
    (event: MouseEvent) => {
      if (!email || !ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const width = ref.current.clientWidth;
      const height = ref.current.clientHeight;

      if (width > 0 && height > 0) {
        addComplexEvent(
          UserEventType.CLICK,
          JSON.stringify({
            x: x / width,
            y: y / height,
            value: 25,
          })
        );
      }
    },
    [email, addComplexEvent, ref]
  );

  useEffect(() => {
    const contentElement = contentRef.current;
    const mainElement = ref.current;

    if (!email || !contentElement || !mainElement) return;

    contentElement.addEventListener("click", handleLinkClick, false);
    contentElement.addEventListener("mouseenter", handleLinkMouseEnter, true);
    contentElement.addEventListener("mouseleave", handleLinkMouseLeave, true);
    mainElement.addEventListener("click", handleGeneralClick, false);

    return () => {
      contentElement.removeEventListener("click", handleLinkClick, false);
      contentElement.removeEventListener(
        "mouseenter",
        handleLinkMouseEnter,
        true
      );
      contentElement.removeEventListener(
        "mouseleave",
        handleLinkMouseLeave,
        true
      );
      mainElement.removeEventListener("click", handleGeneralClick, false);

      handleHoverEnd();
    };
  }, [
    email,
    handleLinkClick,
    handleLinkMouseEnter,
    handleLinkMouseLeave,
    handleGeneralClick,
    handleHoverEnd,
    ref,
  ]);

  useEffect(() => {
    return () => {
      if (heatmapInterval.current) {
        clearInterval(heatmapInterval.current);
      }
      handleHoverEnd();
    };
  }, [handleHoverEnd]);

  if (!email) {
    return (
      <Center bg="gray.0" h={"100vh"}>
        <Text fw={600} c="dimmed">
          Select an email to view
        </Text>
      </Center>
    );
  }

  return (
    <Box flex={1} bg={"white"}>
      <Stack gap={0}>
        <Box ref={ref}>
          <Group
            justify="space-between"
            p="md"
            className="border-b border-gray-200"
          >
            <Text size="xl" fw={500} truncate>
              {email.title}
            </Text>
            <TrashActionButton
              isTrashed={email.isTrashed}
              onClick={() => toggleEmailTrashed(email.id)}
            />
          </Group>

          <Box p="xl">
            <Group justify="space-between">
              <Stack gap="xs">
                <Group>
                  <Text fw={500}>{email.senderName || "<Sender Name>"}</Text>
                  <Text c="dimmed">•</Text>
                  <Text size="sm" c="dimmed">
                    {email.senderAddress}
                  </Text>
                </Group>

                <Text size="sm" c="dimmed">
                  To: me
                </Text>
              </Stack>
              <Text size="sm" c="dimmed">
                {new Date(email.sendAt).toLocaleString([], {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Text>
            </Group>

            <Container fluid p={0} mt="xl">
              <TypographyStylesProvider>
                <div
                  ref={contentRef}
                  dangerouslySetInnerHTML={{
                    __html: email.content,
                  }}
                />
              </TypographyStylesProvider>
            </Container>
          </Box>
        </Box>
        <Box px={"xl"}>
          <EmailAttachmentList
            emailId={email.id}
            attachments={email.attachments}
          />

          <EmailReplySection email={email} />
        </Box>
      </Stack>
    </Box>
  );
}
