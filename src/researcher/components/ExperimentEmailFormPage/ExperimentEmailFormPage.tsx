"use client";
import { useState } from 'react';
import { Center, SegmentedControl, Tabs } from '@mantine/core';
import classes from './ExperimentEmailFormPage.module.css';
import ExperimentEmailForm from '../ExperimentEmailForm';
import { Eye, MailPlus } from 'lucide-react';
import { useForm, hasLength, isEmail, isInRange } from '@mantine/form';
import ExperimentEmailPreview from '../ExperimentEmailPreview';

export default function ExperimentEmailFormPage() {
  const [value, setValue] = useState('compose');
  const form = useForm({
    initialValues: {
      title: '',
      senderAddress: '',
      senderName: '',
      groups: [''],
      content: '',
      isPhishing: false,
      scheduledFor: 0,
    },
    validate: {
      title: hasLength({ min: 1 }, 'Subject is required'),
      senderAddress: isEmail('Invalid email address'),
      senderName: hasLength({ min: 1 }, 'Sender name is required'),
      groups: hasLength({ min: 1 }, 'At least one group is required'),
      content: hasLength({ min: 1 }, 'Content is required'),
      scheduledFor: isInRange({ min: 0 }, 'Schedule time must be non-negative'),
    },
  });
  return (
    <Tabs variant="none" value={value} onChange={(val) => val && setValue(val)}>
      <SegmentedControl
        value={value}
        onChange={setValue}
        data={[
          { label: (
            <Center style={{ gap: 10 }}>
              <MailPlus size={16} />
              <span>Compose</span>
            </Center>
          ), value: 'compose' },
          { label: (
            <Center style={{ gap: 10 }}>
              <Eye size={16} />
              <span>Preview</span>
            </Center>
          ), value: 'preview' },
        ]}
        className={classes.segmentedControl}
      />

      <Tabs.Panel value="compose" className={classes.panel}>
        <ExperimentEmailForm form={form}/>
      </Tabs.Panel>
      <Tabs.Panel value="preview" className={classes.panel}>
        <ExperimentEmailPreview email={form.values}/>
      </Tabs.Panel>
    </Tabs>
  );
}