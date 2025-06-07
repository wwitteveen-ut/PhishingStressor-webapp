import { DownloadIcon } from "lucide-react";
import { EmailAttachmentListItemProps } from "./types";
import {
  Loader,
  MantineColorsTuple,
  UnstyledButton,
  useMantineTheme,
} from "@mantine/core";
import { downloadAttachment } from "@/mail/actions/actions";
import { useState } from "react";

export default function EmailAttachmentListItem({
  emailId,
  attachmentData,
  isPreview = false,
}: EmailAttachmentListItemProps) {
  const theme = useMantineTheme();
  const [isDownloading, setIsDownloading] = useState(false);
  const { filename } = attachmentData;
  const extension = filename.split(".").pop() || "file";

  const getColorForExtension = (ext: string): MantineColorsTuple => {
    switch (ext.toLowerCase()) {
      case "txt":
        return theme.colors.blue;
      case "jpg":
      case "png":
        return theme.colors.green;
      case "pdf":
        return theme.colors.red;
      default:
        return theme.colors.gray;
    }
  };

  const handleDownload = async () => {
    if (isDownloading || isPreview) return;

    setIsDownloading(true);
    try {
      const { buffer, contentType, filename } = await downloadAttachment(
        emailId,
        attachmentData,
      );

      const blob = new Blob([buffer], { type: contentType });

      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  const colorTuple = getColorForExtension(extension);

  return (
    <UnstyledButton
      onClick={handleDownload}
      disabled={isDownloading || isPreview}
    >
      <div className="border border-gray-200 rounded-md p-3 flex items-center bg-gray-50 hover:bg-gray-100 text-gray-500 hover:text-gray-700">
        <div
          className="w-10 h-10 rounded flex items-center justify-center"
          style={{ backgroundColor: colorTuple[1], color: colorTuple[6] }}
        >
          .{extension}
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium text-gray-700">{filename}</p>
        </div>
        <div className="ml-3">
          {isDownloading ? (
            <Loader size={16} color="gray.5" />
          ) : (
            <DownloadIcon size={18} />
          )}
        </div>
      </div>
    </UnstyledButton>
  );
}
