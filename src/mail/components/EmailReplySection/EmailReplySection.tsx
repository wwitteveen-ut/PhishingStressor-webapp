"use client";

import { Button, Container, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import EmailComposer from "../EmailComposer/EmailComposer";
import { ReplyIcon, Send } from "lucide-react";
import { sendReply } from "@/mail/actions/actions";
import { useEmailClientStore } from "@/mail/providers/EmailClientStoreProvider";

export default function EmailReplySection({ emailId }: { emailId: string }) {
  const isReplying = useEmailClientStore((state) => state.isReplying);
  const setIsReplying = useEmailClientStore(
    (state) => state.setIsReplying,
  );

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
    sendReply(emailId, formData);
    setIsReplying(false);
    form.reset();
  };

  return (
    <Container fluid p={0} mt="md">
      {isReplying ? (
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <EmailComposer
            replyTo={{ subject: "hello" }}
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
