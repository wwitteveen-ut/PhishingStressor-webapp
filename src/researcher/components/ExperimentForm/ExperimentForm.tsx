"use client";

import { Text, ActionIcon, Box, Button, Group, NumberInput, Stack, TextInput, MultiSelect } from "@mantine/core";
import { hasLength, isInRange, useForm } from "@mantine/form";
import { IconTrash } from "@tabler/icons-react";
import { PlusIcon } from "lucide-react";

export default function ExperimentForm() {
    const form = useForm({
        initialValues: {
            name: '',
            groups: [{ name: '', capacity: 0 }],
        },
        validate: {
            name: hasLength({ min: 2, max: 20 }, 'Name must be 2-10 characters long'),
            groups: {
                name: hasLength({ min: 2, max: 20 }, 'Name must be 2-10 characters long'),
                capacity: isInRange({ min: 1 }, 'Minimum capacity is 1')
            }
        },
    });

    const groups = form.getValues().groups.map((group, index) => (
    <Group key={index} mt="xs" align="flex-end">
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
        style={{ width: 120 }}
        {...form.getInputProps(`groups.${index}.capacity`)}
      />

      <ActionIcon
        color="red"
        variant="outline"
        onClick={() => form.removeListItem('groups', index)}
        disabled={form.values.groups.length === 1}
        mt="md"
      >
        <IconTrash size={16} />
      </ActionIcon>
    </Group>
  ));
    return (
        <form onSubmit={form.onSubmit(() => {})}>
            <Stack>
                <TextInput
                    required
                    label="Experiment name"
                    placeholder="Experiment 1"
                    value={form.values.name}
                    onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
                    error={form.errors.email && 'Invalid name'}
                    radius="md"
                />
                <MultiSelect
                label="Researchers"
                placeholder="Pick value"
                data={['React', 'Angular', 'Vue', 'Svelte']}
                checkIconPosition="right"
                searchable
                nothingFoundMessage="Nothing found..."
                />
                <Box>
                    <Text fw={500} size="sm" mb="xs">
                        Groups
                    </Text>

                    {groups.length > 0 ? groups : (
                        <Text c="dimmed" ta="center">No groups yet</Text>
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
    );
}