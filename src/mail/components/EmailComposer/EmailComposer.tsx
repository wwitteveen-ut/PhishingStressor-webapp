"use client";

import { CloseButton } from "@mantine/core";
import { FileWithPath } from "@mantine/dropzone";
import { UseFormReturnType } from "@mantine/form";
import { RichTextEditor } from "@mantine/tiptap";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";

interface Attachment {
  id: number;
  name: string;
  size: string;
  type: string;
}

interface EmailComposerProps {
  replyTo?: { subject: string };
  form: UseFormReturnType<{ content: string; attachments: File[] }>;
  onCancel?: () => void;
}

export default function EmailComposer({
  replyTo,
  form,
  onCancel,
}: EmailComposerProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: false }),
      Placeholder.configure({ placeholder: "Compose your email..." }),
    ],
    content: form.values.content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      form.setFieldValue("content", editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && form.values.content !== editor.getHTML()) {
      editor.commands.setContent(form.values.content);
    }
  }, [form.values.content, editor]);

  const handleAddAttachment = (files: FileWithPath[]) => {
    form.setFieldValue("attachments", [...form.values.attachments, ...files]);
  };

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-gray-700">
            {replyTo ? `Re: ${replyTo.subject}` : "New Message"}
          </h3>
          {onCancel && <CloseButton onClick={onCancel} size={"md"} />}
        </div>
        {!replyTo && (
          <div className="mt-3">
            <div className="flex items-center border-b border-gray-200 py-2">
              <span className="text-gray-600 w-16">To:</span>
              <input
                type="text"
                className="flex-1 outline-none bg-transparent"
                placeholder="recipient@example.com"
                {...form.getInputProps("recipient")}
              />
            </div>
          </div>
        )}
      </div>

      <div className="bg-white">
        <RichTextEditor variant="subtle" editor={editor}>
          <RichTextEditor.Content className="min-h-[200px] prose prose-sm max-w-none" />
        </RichTextEditor>
      </div>
    </div>
  );
}
