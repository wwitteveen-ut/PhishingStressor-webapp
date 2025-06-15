"use client";

import { createEmail } from "@/researcher/actions/actions";
import { EmailCreatePayload } from "@/researcher/store/types";
import {
  Box,
  Button,
  Checkbox,
  FileButton,
  Group,
  LoadingOverlay,
  MultiSelect,
  NumberInput,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { Files, SendIcon, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useExperimentContext } from "../ExperimentContext/ExperimentContext";
import ExperimentEmailAttachmentList from "../ExperimentEmailAttachmentList";
import ExperimentEmailComposer from "../ExperimentEmailComposer";
import { EmailFormValues } from "../ExperimentEmailFormPage/ExperimentEmailFormPage";

export default function ExperimentEmailForm({
  form,
}: {
  form: UseFormReturnType<
    EmailFormValues,
    (values: EmailFormValues) => EmailCreatePayload
  >;
}) {
  const [isSubmitting, { open: startSubmitting, close: stopSubmitting }] =
    useDisclosure(false);
  const experiment = useExperimentContext();
  const router = useRouter();

  const handleSubmit = async () => {
    startSubmitting();
    try {
      await createEmail(experiment.id, form.getTransformedValues());
    } catch (error) {
      console.error("Failed to save email:", error);
    } finally {
      router.push(`/researcher/experiments/${experiment.id}/emails`);
      stopSubmitting();
    }
  };
  const groupChoices = experiment.groups.map((g) => ({
    value: g.id,
    label: g.name,
  }));

  return (
    <Box pos="relative">
      <LoadingOverlay
        visible={isSubmitting}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
      />
      <Stack>
        <Group justify="space-between" align="center">
          <Title order={3}>Create New Email</Title>
        </Group>

        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack gap="md">
            <Group grow>
              <TextInput
                label="Email Subject"
                placeholder="e.g. Welcome to Our Service!"
                required
                error={form.errors.title}
                {...form.getInputProps("title")}
              />
              <NumberInput
                label="Scheduled For (minutes after participant has logged in)"
                placeholder="0"
                min={0}
                required
                error={form.errors.scheduledFor}
                {...form.getInputProps("scheduledFor")}
              />
            </Group>

            <Group grow>
              <TextInput
                label="Sender Name"
                placeholder="e.g. John Doe"
                required
                error={form.errors.senderName}
                {...form.getInputProps("senderName")}
              />
              <TextInput
                label="Sender Email"
                placeholder="e.g. john@example.com"
                required
                error={form.errors.senderEmail}
                {...form.getInputProps("senderEmail")}
              />
            </Group>
            <MultiSelect
              label="Groups which receive the mail"
              placeholder="Pick value"
              data={groupChoices}
              checkIconPosition="right"
              searchable
              nothingFoundMessage="Nothing found..."
              error={form.errors.groups}
              onChange={(values) => form.setFieldValue("groups", values)}
            />

            <ExperimentEmailComposer form={form} />

            <Group justify="space-between" align="start">
              <Checkbox
                label="This is a phishing email"
                checked={form.values.isPhishing}
                error={form.errors.isPhishing}
                {...form.getInputProps("isPhishing", { type: "checkbox" })}
              />
              <Stack gap="xs">
                {form.errors.files ? (
                  <Text fz="sm" c="red">
                    {form.errors.files}
                  </Text>
                ) : (
                  <Text fz="sm" c="dimmed">
                    Attachments must be less than 10MB
                  </Text>
                )}
                {form.values.files?.length > 0 ? (
                  <Button
                    variant="light"
                    color="red"
                    onClick={() => form.setFieldValue("files", [])}
                    leftSection={<X size={16} />}
                  >
                    Reset Attachments
                  </Button>
                ) : (
                  <FileButton
                    onChange={(payload: File[]) =>
                      form.setFieldValue("files", payload)
                    }
                    accept="application/pdf,text/plain,image/png,image/jpeg,image/gif"
                    multiple
                  >
                    {(props) => (
                      <Button {...props} leftSection={<Files size={16} />}>
                        Select Attachments
                      </Button>
                    )}
                  </FileButton>
                )}
              </Stack>
            </Group>
            <ExperimentEmailAttachmentList files={form.values.files} />

            <Group justify="end">
              <Button
                type="submit"
                leftSection={<SendIcon size={16} />}
                loading={isSubmitting}
              >
                Create Mail
              </Button>
            </Group>
          </Stack>
        </form>
      </Stack>
    </Box>
  );
}
