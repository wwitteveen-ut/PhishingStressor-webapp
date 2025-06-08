"use client";
import { EmailCreatePayload } from "@/researcher/store/types";
import { Center, SegmentedControl, Tabs } from "@mantine/core";
import { hasLength, isEmail, isInRange, useForm } from "@mantine/form";
import { Eye, MailPlus } from "lucide-react";
import { useState } from "react";
import ExperimentEmailForm from "../ExperimentEmailForm";
import ExperimentEmailPreview from "../ExperimentEmailPreview";
import classes from "./ExperimentEmailFormPage.module.css";

export type EmailFormValues = {
  title: string;
  senderAddress: string;
  senderName: string;
  groups: string[];
  files: File[];
  content: string;
  isPhishing: boolean;
  scheduledFor: number;
};

export default function ExperimentEmailFormPage() {
  const [value, setValue] = useState("compose");
  const form = useForm({
    initialValues: {
      title: "",
      senderAddress: "",
      senderName: "",
      groups: [] as string[],
      files: [] as File[],
      content: "",
      isPhishing: false,
      scheduledFor: 0,
    },
    validate: {
      title: hasLength({ min: 1 }, "Subject is required"),
      senderAddress: isEmail("Invalid email address"),
      senderName: hasLength({ min: 1 }, "Sender name is required"),
      groups: hasLength({ min: 1 }, "At least one group is required"),
      content: hasLength({ min: 1 }, "Content is required"),
      scheduledFor: isInRange({ min: 0 }, "Schedule time must be non-negative"),
    },
    transformValues(values): EmailCreatePayload {
      return {
        metadata: {
          senderAddress: values.senderAddress,
          senderName: values.senderName,
          title: values.title,
          groups: values.groups,
          content: values.content,
          isPhishing: values.isPhishing,
          scheduledFor: values.scheduledFor,
        },
        files: values.files,
      };
    },
  });
  return (
    <Tabs variant="none" value={value} onChange={(val) => val && setValue(val)}>
      <SegmentedControl
        value={value}
        onChange={setValue}
        data={[
          {
            label: (
              <Center style={{ gap: 10 }}>
                <MailPlus size={16} />
                <span>Compose</span>
              </Center>
            ),
            value: "compose",
          },
          {
            label: (
              <Center style={{ gap: 10 }}>
                <Eye size={16} />
                <span>Preview</span>
              </Center>
            ),
            value: "preview",
          },
        ]}
        className={classes.segmentedControl}
      />

      <Tabs.Panel value="compose" className={classes.panel}>
        <ExperimentEmailForm form={form} />
      </Tabs.Panel>
      <Tabs.Panel value="preview" className={classes.panel}>
        <ExperimentEmailPreview emailData={form.getTransformedValues()} />
      </Tabs.Panel>
    </Tabs>
  );
}
