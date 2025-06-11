"use client";

import { EmailCreatePayload } from "@/researcher/store/types";
import { UseFormReturnType } from "@mantine/form";
import { RichTextEditor } from "@mantine/tiptap";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";
import { EmailFormValues } from "../ExperimentEmailFormPage/ExperimentEmailFormPage";

interface ExperimentEmailComposerProps {
  form: UseFormReturnType<
    EmailFormValues,
    (values: EmailFormValues) => EmailCreatePayload
  >;
}

export default function ExperimentEmailComposer({
  form,
}: ExperimentEmailComposerProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({ linkOnPaste: true, openOnClick: false }),
      Superscript,
      Subscript,
      Highlight,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
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
              <RichTextEditor.Underline />
              <RichTextEditor.Strikethrough />
              <RichTextEditor.ClearFormatting />
              <RichTextEditor.Highlight />
              <RichTextEditor.Code />
            </RichTextEditor.ControlsGroup>
            <RichTextEditor.ControlsGroup>
              <RichTextEditor.H1 />
              <RichTextEditor.H2 />
              <RichTextEditor.H3 />
              <RichTextEditor.H4 />
            </RichTextEditor.ControlsGroup>
            <RichTextEditor.ControlsGroup>
              <RichTextEditor.Blockquote />
              <RichTextEditor.Hr />
              <RichTextEditor.BulletList />
              <RichTextEditor.OrderedList />
              <RichTextEditor.Subscript />
              <RichTextEditor.Superscript />
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.ControlsGroup>
              <RichTextEditor.Link />
              <RichTextEditor.Unlink />
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.ControlsGroup>
              <RichTextEditor.AlignLeft />
              <RichTextEditor.AlignCenter />
              <RichTextEditor.AlignJustify />
              <RichTextEditor.AlignRight />
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.ControlsGroup>
              <RichTextEditor.Undo />
              <RichTextEditor.Redo />
            </RichTextEditor.ControlsGroup>
          </RichTextEditor.Toolbar>
          <RichTextEditor.Content className="min-h-[200px] prose prose-sm max-w-none" />
        </RichTextEditor>
      </div>
    </div>
  );
}
