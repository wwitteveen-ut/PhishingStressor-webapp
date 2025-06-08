"use client";

import { EmailCreatePayload } from "@/researcher/store/types";
import {
  Box,
  Container,
  Group,
  Stack,
  Text,
  TypographyStylesProvider,
} from "@mantine/core";
import { ArrowLeftIcon } from "lucide-react";
import ExperimentEmailAttachmentList from "../ExperimentEmailAttachmentList";

export default function ExperimentEmailPreview({
  emailData: { metadata, files },
}: {
  emailData: EmailCreatePayload;
}) {
  return (
    <Box className="flex-1 flex flex-col h-full bg-white overflow-y-auto">
      <Group
        justify="space-between"
        p="md"
        className="border-b border-gray-200"
      >
        <Group>
          <button className="mr-4 text-gray-500 hover:text-gray-700 md:hidden">
            <ArrowLeftIcon size={20} />
          </button>
          <Text size="xl" fw={500} truncate>
            {metadata.title || "<Email Subject>"}
          </Text>
        </Group>
      </Group>

      <Box p="xl">
        <Group justify="space-between">
          <Stack gap="xs">
            <Group>
              <Text fw={500}>{metadata.senderName || "<Sender Name>"}</Text>
              <Text c="dimmed">•</Text>
              <Text size="sm" c="dimmed">
                {metadata.senderAddress || "<sender@email.com>"}
              </Text>
            </Group>

            <Text size="sm" c="dimmed">
              To: me
            </Text>
          </Stack>
          <Text size="sm" c="dimmed">
            {new Date(
              metadata.scheduledFor * 60 * 1000 + Date.now()
            ).toLocaleString([], {
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
                __html: metadata.content || "<Email Content>",
              }}
            />
          </TypographyStylesProvider>
        </Container>
        <ExperimentEmailAttachmentList isPreview={true} files={files} />
      </Box>
    </Box>
  );
}
