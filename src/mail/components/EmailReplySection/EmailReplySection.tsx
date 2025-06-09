"use client";

import { sendReply } from "@/mail/actions/actions";
import { useEmailClientStore } from "@/mail/providers/EmailClientStoreProvider";
import { ZustandEmail } from "@/mail/store/types";
import { Button, Container, Group, Text, Tooltip } from "@mantine/core";
import { useForm } from "@mantine/form";
import { Check, ReplyIcon, Send } from "lucide-react";
import EmailComposer from "../EmailComposer/EmailComposer";

export default function EmailReplySection({ email }: { email: ZustandEmail }) {
  const isReplying = useEmailClientStore((state) => state.isReplying);
  const setIsReplying = useEmailClientStore((state) => state.setIsReplying);
  const setHasReplied = useEmailClientStore((state) => state.setHasReplied);

  const form = useForm({
    initialValues: {
      content: "",
      attachments: [] as File[],
    },
  });

  const handleSubmit = (values: { content: string; attachments: File[] }) => {
    const formData = new FormData();
    formData.append("content", values.content);
    // values.attachments.forEach((file, index) => {
    //   formData.append(`attachment${index}`, file);
    // });
    sendReply(email.id, formData);
    setHasReplied(email.id);
    setIsReplying(false);
    form.reset();
  };

  if (email.hasReplied) {
    return (
      <Container fluid p={0} mt="md">
        <Group c="green" gap={5} px={"xs"}>
          <Check size={20} strokeWidth={2.5} />
          <Text fw={600}>Already replied</Text>
        </Group>
      </Container>
    );
  }

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
