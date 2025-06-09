"use client";

import { CloseButton, Textarea } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";

interface EmailComposerProps {
  replyTo: string;
  form: UseFormReturnType<{ content: string; attachments: File[] }>;
  onCancel?: () => void;
}

export default function EmailComposer({
  replyTo,
  form,
  onCancel,
}: EmailComposerProps) {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-gray-700">
            {replyTo ? `Re: ${replyTo}` : "New Message"}
          </h3>
          {onCancel && <CloseButton onClick={onCancel} size={"md"} />}
        </div>
      </div>

      <div className="bg-white">
        <Textarea
          placeholder="Compose your email..."
          autosize
          size="md"
          minRows={10}
          {...form.getInputProps("content")}
        />
      </div>
    </div>
  );
}
