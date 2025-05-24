"use client";

import { useState, useEffect, useRef } from "react";
import { RichTextEditor, useRichTextEditorContext } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import { CrossIcon, PaperclipIcon, SendIcon, XIcon } from "lucide-react";
import { Button } from "@mantine/core";
import { Dropzone, FileWithPath } from "@mantine/dropzone";

interface Attachment {
    id: number;
    name: string;
    size: string;
    type: string;
}

interface EmailComposerProps {
    replyTo?: { subject: string };
    onCancel?: () => void;
    onSend?: (content: string) => void;
}

export default function EmailComposer({ replyTo, onCancel, onSend }: EmailComposerProps) {
    const [attachments, setAttachments] = useState<Attachment[]>([]);
    const openRef = useRef<() => void>(null);

    const editor = useEditor({
        extensions: [
            StarterKit,
            Link.configure({ openOnClick: false }),
            Placeholder.configure({ placeholder: "Compose your email..." }),
        ],
        content: "",
        immediatelyRender: false,
    });

    const handleAddAttachment = (files: FileWithPath[]) => {
        const mockAttachment: Attachment = {
            id: Date.now(),
            name: files[0].name,
            size: "1.2 MB",
            type: "pdf",
        };
        setAttachments((prev) => [...prev, mockAttachment]);
    };

    const handleRemoveAttachment = (id: number) => {
        setAttachments((prev) => prev.filter((att) => att.id !== id));
    };

    const handleSend = () => {
        if (onSend && editor) {
            onSend(editor.getHTML());
        }
    };

    return (
        <>
        <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-700">
                        {replyTo ? `Re: ${replyTo.subject}` : "New Message"}
                    </h3>
                    {onCancel && (
                        <button
                            onClick={onCancel}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            <CrossIcon size={20} />
                        </button>
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
                        <h4 className="text-sm font-medium text-gray-700 mb-2">
                            Attachments
                        </h4>
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
                                        <p className="text-xs font-medium text-gray-700">
                                            {attachment.name}
                                        </p>
                                        <p className="text-xs text-gray-500">{attachment.size}</p>
                                    </div>
                                    <button
                                        onClick={() => handleRemoveAttachment(attachment.id)}
                                        className="ml-2 text-gray-400 hover:text-gray-600"
                                    >
                                        <XIcon size={14} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="mt-4 flex justify-end">
                    {onCancel && (
                        <button
                            onClick={onCancel}
                            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 mr-2"
                        >
                            Cancel
                        </button>
                    )}
                    
                </div>
            </div>
        </div>
        <Button
            onClick={handleSend}
            rightSection={<SendIcon size={18} className="mr-2" />}
        >
          Send
        </Button>
        </>
    );
}