"use client";
import EmailView from '@/mail/components/EmailView';
import {
  TextInput,
  Textarea,
  Checkbox,
  Button,
  Group,
  Stack,
  Modal,
  Title,
  Box,
  LoadingOverlay,
  NumberInput,
} from '@mantine/core';
import { useForm, hasLength, isEmail, isInRange } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { SendIcon } from 'lucide-react';
import { useExperimentContext } from '../ExperimentContext/ExperimentContext';

export default function ExperimentEmailForm() {
  const [previewOpened, { open: openPreview, close: closePreview }] = useDisclosure(false);
  const [isSubmitting, { open: startSubmitting, close: stopSubmitting }] = useDisclosure(false);
  const experiment = useExperimentContext();

  const form = useForm({
    initialValues: {
      subject: '',
      senderEmail: '',
      senderName: '',
      content: '',
      isPhishing: false,
      scheduledFor: 0,
    },
    validate: {
      subject: hasLength({ min: 1 }, 'Subject is required'),
      senderEmail: isEmail('Invalid email address'),
      senderName: hasLength({ min: 1 }, 'Sender name is required'),
      content: hasLength({ min: 1 }, 'Content is required'),
      scheduledFor: isInRange({ min: 0 }, 'Schedule time must be non-negative'),
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    startSubmitting();
    try {
        console.log(values)
    //   await onSave(values);
    } catch (error) {
      console.error('Failed to save campaign:', error);
    } finally {
      stopSubmitting();
    }
  };


  return (
    <Box pos="relative">
        <LoadingOverlay 
            visible={isSubmitting} 
            zIndex={1000} 
            overlayProps={{ radius: 'sm', blur: 2 }} 
        />      
        <Stack>
        <Group justify="space-between" align="center">
          <Title order={3}>Create New Email</Title>
          <Button variant="light" color="blue" onClick={openPreview}>
            Preview
          </Button>
        </Group>

        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack gap="md">
            <Group grow>
              <TextInput
                label="Email Subject"
                placeholder="e.g. Welcome to Our Service!"
                required
                {...form.getInputProps('name')}
              />
              <NumberInput
                label="Schedule (minutes after)"
                placeholder="0"
                min={0}
                required
                {...form.getInputProps('scheduledFor')}
              />
            </Group>

            <Group grow>
              <TextInput
                label="Sender Name"
                placeholder="e.g. John Doe"
                required
                {...form.getInputProps('senderName')}
              />
              <TextInput
                label="Sender Email"
                placeholder="e.g. john@example.com"
                required
                {...form.getInputProps('senderEmail')}
              />
            </Group>

            <Textarea
              label="Content"
              placeholder="Enter email content here..."
              minRows={6}
              required
              {...form.getInputProps('content')}
            />

            <Checkbox
              label="This is a phishing email"
              checked={form.values.isPhishing}
              {...form.getInputProps('isPhishing', { type: 'checkbox' })}
            />

            <Group justify="end">
              <Button
                type="submit"
                leftSection={<SendIcon size={16} />}
                loading={isSubmitting}
              >
                Create Campaign
              </Button>
            </Group>
          </Stack>
        </form>
      </Stack>

      <Modal opened={previewOpened} onClose={closePreview} title="Email Preview" size="lg">
        {/* <EmailView email={form.values} /> */}
      </Modal>
    </Box>
  );
}