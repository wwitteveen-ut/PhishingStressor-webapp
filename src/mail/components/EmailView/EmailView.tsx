"use client";
import { useEmailClientStore } from "@/mail/providers/EmailClientStoreProvider";
import { UserEventType } from "@/mail/store/types";
import {
  Box,
  Container,
  Group,
  Stack,
  Text,
  TypographyStylesProvider,
} from "@mantine/core";
import { useMouse } from "@mantine/hooks";
import { useEffect, useRef } from "react";
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
  const latestCoords = useRef({ x: 0, y: 0 });
  const hoverStartTime = useRef<{ [key: string]: number }>({});

  useEffect(() => {
    latestCoords.current = { x, y };
  }, [x, y]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!email) return;
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

    return () => clearInterval(interval);
  }, [addHeatmapData, email, ref]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
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
    };

    const currentRef = ref.current;
    currentRef?.addEventListener("click", handleClick);
    return () => currentRef?.removeEventListener("click", handleClick);
  }, [addHeatmapData, email, ref, addComplexEvent]);

  useEffect(() => {
    const handleLinkClick = (event: MouseEvent) => {
      if (!email || !(event.target instanceof HTMLAnchorElement)) return;
      addSimpleEvent(UserEventType.LINK_CLICK);
    };

    const handleMouseEnter = (event: MouseEvent) => {
      if (!email || !(event.target instanceof HTMLAnchorElement)) return;
      hoverStartTime.current[event.target.href] = Date.now();
    };

    const handleMouseLeave = (event: MouseEvent) => {
      if (!email || !(event.target instanceof HTMLAnchorElement)) return;

      const href = event.target.href;
      const startTime = hoverStartTime.current[href];
      if (startTime) {
        const duration = Date.now() - startTime;
        addComplexEvent(UserEventType.LINK_HOVER, JSON.stringify(duration));
        delete hoverStartTime.current[href];
      }
    };

    const links = ref.current?.querySelectorAll("a");

    links?.forEach((link: HTMLAnchorElement) => {
      link.addEventListener("click", handleLinkClick);
      link.addEventListener("mouseenter", handleMouseEnter);
      link.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      links?.forEach((link: HTMLAnchorElement) => {
        link.removeEventListener("click", handleLinkClick);
        link.removeEventListener("mouseenter", handleMouseEnter);
        link.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, [addHeatmapData, email, ref, addComplexEvent]);

  if (!email) {
    return (
      <div
        className="flex-1 flex items-center justify-center bg-gray-50 text-gray-500"
        ref={ref}
      >
        <p>Select an email to view</p>
      </div>
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

            <Container fluid p={0} my="xl">
              <TypographyStylesProvider>
                <div
                  dangerouslySetInnerHTML={{
                    __html: email.content,
                  }}
                />
              </TypographyStylesProvider>
            </Container>
          </Box>
        </Box>
        <Box p={"xl"}>
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
