"use client";

import { createExperiment } from "@/researcher/actions/actions";
import { ExperimentCreatePayload } from "@/researcher/store/types";
import {
  ActionIcon,
  Box,
  Button,
  Group,
  LoadingOverlay,
  Modal,
  MultiSelect,
  NumberInput,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { hasLength, isInRange, useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { IconTrash } from "@tabler/icons-react";
import { PlusIcon } from "lucide-react";

export interface choice {
  label: string;
  value: string;
}

export default function ExperimentForm({
  researcherChoices,
  ownResearcherId,
}: {
  researcherChoices: choice[];
  ownResearcherId: string;
}) {
  const [opened, { open, close }] = useDisclosure(false);
  const [isLoading, { open: startLoading, close: stopLoading }] =
    useDisclosure(false);

  const form = useForm({
    initialValues: {
      name: "",
      duration: 0,
      researcherIds: [] as string[],
      groups: [{ name: "", capacity: 0 }],
    },
    validate: {
      name: hasLength({ min: 2, max: 20 }, "Name must be 2-10 characters long"),
      duration: isInRange({ min: 1 }, "Minimum duration is 1 minute"),
      groups: {
        name: hasLength(
          { min: 2, max: 20 },
          "Name must be 2-10 characters long"
        ),
        capacity: isInRange({ min: 1 }, "Minimum capacity is 1"),
      },
    },
  });

  const handleSubmit = async (values: ExperimentCreatePayload) => {
    startLoading();
    try {
      if (!values.researcherIds.includes(ownResearcherId)) {
        values.researcherIds.push(ownResearcherId);
      }
      const result = await createExperiment(values);
      if (result.success && result.accounts) {
        const csv = convertToCSV(result.accounts);
        triggerDownload(csv, `${form.getValues()["name"]}`);
      }
      form.reset();
      close();
      return true;
    } catch (error) {
      console.error("Failed to create experiment:", error);
      return false;
    } finally {
      stopLoading();
    }
  };

  const convertToCSV = (accounts: { username: string; password: string }[]) => {
    if (!accounts.length) return "";
    return [
      "username,password",
      ...accounts.map((acc) => `"${acc.username}","${acc.password}"`),
    ].join("\n");
  };

  const triggerDownload = (csvContent: string, fileName: string) => {
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const groups = form.getValues().groups.map((group, index) => (
    <Group key={index} align="center">
      <TextInput
        label="Group Name"
        placeholder="e.g. Alpha Team"
        withAsterisk
        style={{ flex: 1 }}
        {...form.getInputProps(`groups.${index}.name`)}
      />

      <NumberInput
        label="Capacity"
        placeholder="0"
        min={0}
        withAsterisk
        clampBehavior="strict"
        style={{ width: 120 }}
        allowNegative={false}
        allowDecimal={false}
        {...form.getInputProps(`groups.${index}.capacity`)}
      />

      <ActionIcon
        color="red"
        variant="outline"
        onClick={() => form.removeListItem("groups", index)}
        disabled={form.values.groups.length === 1}
        mt="md"
      >
        <IconTrash size={16} />
      </ActionIcon>
    </Group>
  ));

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        size={"xl"}
        title={"Create new experiment"}
      >
        <Box pos="relative">
          <LoadingOverlay
            visible={isLoading}
            zIndex={1000}
            overlayProps={{ radius: "sm", blur: 2 }}
          />
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack>
              <Group grow>
                <TextInput
                  data-autofocus
                  required
                  label="Experiment name"
                  placeholder="Experiment 1"
                  value={form.values.name}
                  onChange={(event) =>
                    form.setFieldValue("name", event.currentTarget.value)
                  }
                  error={form.errors.name && "Invalid name"}
                />
                <NumberInput
                  label="Duration"
                  placeholder="0"
                  required
                  min={0}
                  withAsterisk
                  clampBehavior="strict"
                  allowNegative={false}
                  allowDecimal={false}
                  style={{ maxWidth: 120 }}
                  {...form.getInputProps(`duration`)}
                />
              </Group>

              <MultiSelect
                label="Researchers"
                placeholder="Pick researchers"
                data={researcherChoices}
                checkIconPosition="right"
                searchable
                nothingFoundMessage="Nothing found..."
                onChange={(values) =>
                  form.setFieldValue("researcherIds", values)
                }
                error={form.errors.researchers && "Invalid name"}
              />
              <Box>
                <Text size="md" fw={600}>
                  Research groups
                </Text>

                {groups.length > 0 ? (
                  groups
                ) : (
                  <Text c="dimmed" ta="center">
                    No groups yet
                  </Text>
                )}

                <Button
                  mt="md"
                  onClick={() =>
                    form.insertListItem("groups", {
                      name: "",
                      capacity: 0,
                    })
                  }
                  leftSection={<PlusIcon size={16} />}
                  variant="light"
                >
                  Add group
                </Button>
              </Box>
              <Button type="submit" mt="lg">
                Submit
              </Button>
            </Stack>
          </form>
        </Box>
      </Modal>
      <Button leftSection={<PlusIcon size={16} />} onClick={open}>
        New Experiment
      </Button>
    </>
  );
}
