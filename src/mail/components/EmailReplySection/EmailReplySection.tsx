"use client";

import { sendReply } from "@/mail/actions/actions";
import { useEmailClientStore } from "@/mail/providers/EmailClientStoreProvider";
import { ZustandEmail } from "@/mail/store/types";
import { Button, Container, Group, Text, Tooltip } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { Check, ReplyIcon, Send } from "lucide-react";
import EmailComposer from "../EmailComposer/EmailComposer";

export default function EmailReplySection({ email }: { email: ZustandEmail }) {
  const isReplying = useEmailClientStore((state) => state.isReplying);
  const setIsReplying = useEmailClientStore((state) => state.setIsReplying);
  const setHasReplied = useEmailClientStore((state) => state.setHasReplied);

  const form = useForm({
    initialValues: {
      content: "",
    },
    validate: {
      content: (value) =>
        value.trim().length === 0 ? "Content cannot be empty" : null,
    },
  });

  const handleSubmit = async (values: { content: string }) => {
    const response = await sendReply(email.id, values);
    if (response) {
      setHasReplied(email.id);
      notifications.show({
        title: `Sent reply!`,
        color: "green",
        message: "",
      });
      setIsReplying(false);
      form.reset();
    }
  };

  if (email.isTrashed) {
    return (
      <Container fluid p={0} mt="md">
        <Tooltip label={"Cannot reply on trashed email"}>
          <Button
            disabled
            rightSection={<ReplyIcon size={18} className="mr-2" />}
          >
            Reply
          </Button>
        </Tooltip>
      </Container>
    );
  }

  return (
    <Container fluid p={0} mt="md">
      {email.hasReplied && (
        <Group c="green" gap={5} mb={"xs"}>
          <Check size={20} strokeWidth={2.5} />
          <Text fw={600}>Already replied</Text>
        </Group>
      )}

      {isReplying ? (
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <EmailComposer
            replyTo={email.title}
            form={form}
            onCancel={() => {
              setIsReplying(false);
              form.reset();
            }}
          />
          <Group justify="flex-start" mt="md">
            <Button type="submit" leftSection={<Send size={18} />}>
              Send
            </Button>
          </Group>
        </form>
      ) : (
        <Button
          onClick={() => setIsReplying(true)}
          rightSection={<ReplyIcon size={18} className="mr-2" />}
        >
          Reply
        </Button>
      )}
    </Container>
  );
}
