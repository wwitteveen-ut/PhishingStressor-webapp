"use client";

import { useState, useRef, useEffect } from "react";
import { RichTextEditor } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import { CrossIcon, PaperclipIcon } from "lucide-react";
import { Dropzone, FileWithPath } from "@mantine/dropzone";
import { UseFormReturnType } from "@mantine/form";
import { CloseButton } from "@mantine/core";

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

export default function EmailComposer({ replyTo, form, onCancel }: EmailComposerProps) {
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const openRef = useRef<() => void>(null);

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

  useEffect(() => {
    const newAttachments: Attachment[] = form.values.attachments.map((file, index) => ({
      id: Date.now() + index,
      name: file.name,
      size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
      type: file.name.split(".").pop()?.toLowerCase() || "unknown",
    }));
    setAttachments(newAttachments);
  }, [form.values.attachments]);

  const handleAddAttachment = (files: FileWithPath[]) => {
    form.setFieldValue("attachments", [...form.values.attachments, ...files]);
  };

  const handleRemoveAttachment = (id: number) => {
    const attachmentIndex = attachments.findIndex((att) => att.id === id);
    if (attachmentIndex !== -1) {
      const newFiles = form.values.attachments.filter((_, index) => index !== attachmentIndex);
      form.setFieldValue("attachments", newFiles);
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-gray-700">
            {replyTo ? `Re: ${replyTo.subject}` : "New Message"}
          </h3>
          {onCancel && (
            <CloseButton onClick={onCancel} size={"md"} />
          )}
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
          <RichTextEditor.Toolbar className="border-b border-gray-200 pb-2 mb-3">
            <div className="flex items-center space-x-2">
              <RichTextEditor.ControlsGroup>
                <RichTextEditor.Bold />
                <RichTextEditor.Italic />
                <RichTextEditor.Link />
              </RichTextEditor.ControlsGroup>
              <div className="border-r border-gray-300 h-6 mx-1" />
              <RichTextEditor.ControlsGroup>
                <RichTextEditor.Control
                  onClick={() => openRef.current?.()}
                  aria-label="Insert attachment"
                  title="Insert attachment"
                >
                  <PaperclipIcon size="1rem" />
                </RichTextEditor.Control>
              </RichTextEditor.ControlsGroup>
            </div>
          </RichTextEditor.Toolbar>
          <Dropzone
            openRef={openRef}
            onDrop={(files) => handleAddAttachment(files)}
            activateOnClick={false}
            styles={{ inner: { pointerEvents: "all" } }}
          >
            <RichTextEditor.Content className="min-h-[200px] prose prose-sm max-w-none" />
          </Dropzone>
        </RichTextEditor>

        {attachments.length > 0 && (
          <div className="p-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Attachments</h4>
            <div className="flex flex-wrap gap-2">
              {attachments.map((attachment) => (
                <div
                  key={attachment.id}
                  className="flex items-center bg-gray-50 border border-gray-200 rounded-md px-3 py-2"
                >
                  <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center text-blue-500 text-xs">
                    {attachment.type}
                  </div>
                  <div className="ml-2">
                    <p className="text-xs font-medium text-gray-700">{attachment.name}</p>
                    <p className="text-xs text-gray-500">{attachment.size}</p>
                  </div>
                  <button
                    onClick={() => handleRemoveAttachment(attachment.id)}
                    className="ml-2 text-gray-400 hover:text-gray-600"
                  >
                    <CrossIcon size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}