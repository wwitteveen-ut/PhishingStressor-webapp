"use client";

import { useEffect } from "react";
import { RichTextEditor } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import { UseFormReturnType } from "@mantine/form";
import { EmailFormValues } from "../ExperimentEmailFormPage/ExperimentEmailFormPage";
import { EmailCreatePayload } from "@/researcher/store/types";

interface ExperimentEmailComposerProps {
  form: UseFormReturnType<EmailFormValues, (values: EmailFormValues) => EmailCreatePayload>;
}

export default function ExperimentEmailComposer({ form }: ExperimentEmailComposerProps) {
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

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <div className="bg-white">
        <RichTextEditor variant="subtle" editor={editor}>
          <RichTextEditor.Toolbar className="border-b border-gray-200 pb-2 mb-3">
            <RichTextEditor.ControlsGroup>
              <RichTextEditor.Bold />
              <RichTextEditor.Italic />
              <RichTextEditor.Link />
            </RichTextEditor.ControlsGroup>
          </RichTextEditor.Toolbar>
          <RichTextEditor.Content className="min-h-[200px] prose prose-sm max-w-none" />
        </RichTextEditor>
      </div>
    </div>
  );
}