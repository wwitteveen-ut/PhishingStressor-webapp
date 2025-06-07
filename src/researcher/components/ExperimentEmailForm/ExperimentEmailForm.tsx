"use client";
import {
  TextInput,
  Textarea,
  Checkbox,
  Button,
  Group,
  Stack,
  Title,
  Box,
  LoadingOverlay,
  NumberInput,
  MultiSelect,
  FileButton,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Files, SendIcon, X } from "lucide-react";
import { useExperimentContext } from "../ExperimentContext/ExperimentContext";
import { createEmail } from "@/researcher/actions/actions";
import { UseFormReturnType } from "@mantine/form";
import { EmailCreatePayload } from "@/researcher/store/types";
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

  const handleSubmit = async () => {
    startSubmitting();
    try {
      await createEmail(experiment.id, form.getTransformedValues());
    } catch (error) {
      console.error("Failed to save campaign:", error);
    } finally {
      stopSubmitting();
    }
  };

  const groupChoices = experiment.groups.map((g) => {
    return { value: g.id, label: g.name };
  });

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
                {...form.getInputProps("title")}
              />
              <NumberInput
                label="Scheduled For (minutes after participant has logged in)"
                placeholder="0"
                min={0}
                required
                {...form.getInputProps("scheduledFor")}
              />
            </Group>

            <Group grow>
              <TextInput
                label="Sender Name"
                placeholder="e.g. John Doe"
                required
                {...form.getInputProps("senderName")}
              />
              <TextInput
                label="Sender Email"
                placeholder="e.g. john@example.com"
                required
                {...form.getInputProps("senderAddress")}
              />
            </Group>
            <MultiSelect
              label="Groups which receive the mail"
              placeholder="Pick value"
              data={groupChoices}
              checkIconPosition="right"
              searchable
              nothingFoundMessage="Nothing found..."
              onChange={(values) => form.setFieldValue("groups", values)}
              error={form.errors.groups && "Invalid group"}
            />

            <Textarea
              label="Content"
              placeholder="Enter email content here..."
              minRows={6}
              required
              {...form.getInputProps("content")}
            />

            <Group justify="space-between" align="start">
              <Checkbox
                label="This is a phishing email"
                checked={form.values.isPhishing}
                {...form.getInputProps("isPhishing", { type: "checkbox" })}
              />
              <Stack>
                <Stack>
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
                      onChange={(payload) =>
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
              </Stack>
            </Group>

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
