"use client";

import { modals } from '@mantine/modals';
import { Group, ActionIcon, Select } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { addResearcherToExperiment } from '@/researcher/actions/actions';
import { useExperimentContext } from '../ExperimentContext/ExperimentContext';
import { IconUserPlus } from '@tabler/icons-react';
import type { choice } from '../ExperimentForm/ExperimentForm';

export default function AddResearcherForm({researcherChoices = []}: {researcherChoices?: choice[]}) {
    const experiment = useExperimentContext();

    researcherChoices = researcherChoices.filter(choice => 
        !experiment.researchers.some(researcher => researcher.id === choice.value)
    );

    const [loading, { open: startLoading, close: stopLoading }] = useDisclosure();

    const form = useForm({
      initialValues: {
        researcherId: '',
      },
      validate: {
        researcherId: (value) => {
          if (!value.trim()) return 'Please select a researcher';
          if (!researcherChoices.some(choice => choice.value === value)) {
            return 'Please select a valid researcher';
          }
          return null;
        },
      },
    });

    const handleSubmit = async (values: { researcherId: string }) => {
        startLoading();

        try {
            await addResearcherToExperiment(experiment.id, values.researcherId);
            modals.closeAll();
            return true;
        } catch (error) {
            console.error('Failed to add researcher:', error);
            return false;
        } finally {
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
            error={form.errors.researcherId && 'Invalid ID'}
            {...form.getInputProps('researcherId')}
        />
        <ActionIcon
          type="submit"
          variant="filled"
          size="lg"
          loading={loading}
        >
          <IconUserPlus size={18} />
        </ActionIcon>
      </Group>
    </form>
  );
}