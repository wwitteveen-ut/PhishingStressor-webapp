"use client";

import { addResearcherToExperiment } from "@/researcher/actions/actions";
import { ActionIcon, Group, Select } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { modals } from "@mantine/modals";
import { IconUserPlus } from "@tabler/icons-react";
import { useExperimentContext } from "../ExperimentContext/ExperimentContext";
import type { choice } from "../ExperimentForm/ExperimentForm";

export default function AddResearcherForm({
  researcherChoices = [],
}: {
  researcherChoices?: choice[];
}) {
  const experiment = useExperimentContext();

  researcherChoices = researcherChoices.filter(
    (choice) =>
      !experiment.researchers.some(
        (researcher) => researcher.id === choice.value
      )
  );

  const [loading, { open: startLoading, close: stopLoading }] = useDisclosure();

  const form = useForm({
    initialValues: {
      researcherId: null as string | null,
    },
    validate: {
      researcherId: (value) => {
        if (!value || !value.trim()) return "Please select a researcher";
        if (!researcherChoices.some((choice) => choice.value === value)) {
          return "Please select a valid researcher";
        }
        return null;
      },
    },
  });

  const handleSubmit = async (values: { researcherId: string | null }) => {
    startLoading();

    try {
      if (!values.researcherId) throw new Error("Researcher ID is required");
      await addResearcherToExperiment(experiment.id, values.researcherId);
      modals.closeAll();
      return true;
    } catch (error) {
      console.error("Failed to add researcher:", error);
      return false;
    } finally {
      form.reset();
      stopLoading();
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)} className="w-full max-w-md">
      <Group align="start" gap="xs" wrap="nowrap">
        <Select
          placeholder="Pick researcher"
          data={researcherChoices}
          checkIconPosition="right"
          searchable
          nothingFoundMessage="Nothing found..."
          error={form.errors.researcherId && "Invalid ID"}
          {...form.getInputProps("researcherId")}
        />
        <ActionIcon type="submit" variant="filled" size="lg" loading={loading}>
          <IconUserPlus size={18} />
        </ActionIcon>
      </Group>
    </form>
  );
}
