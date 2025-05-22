import { DownloadIcon } from 'lucide-react';
import { EmailAttachmentListItemProps } from './types';
import { MantineColorsTuple, useMantineTheme } from '@mantine/core';

export default function EmailAttachmentListItem({
  attachmentData,
}: EmailAttachmentListItemProps) {
  const theme = useMantineTheme();

  const { filename } = attachmentData;
  const extension = filename.split('.').pop() || 'file';

  const getColorForExtension = (ext: string): MantineColorsTuple => {
    switch (ext.toLowerCase()) {
      case 'txt':
        return theme.colors.blue;
      case 'jpg':
      case 'png':
        return theme.colors.green;
      case 'pdf':
        return theme.colors.red;
      default:
        return theme.colors.gray;
    }
  };

  const colorTuple = getColorForExtension(extension);

  return (
    <div className="border border-gray-200 rounded-md p-3 flex items-center bg-gray-50 hover:bg-gray-100">
      <div
        className="w-10 h-10 rounded flex items-center justify-center"
        style={{ backgroundColor: colorTuple[1], color:  colorTuple[6] }}
      >
        .{extension}
      </div>
      <div className="ml-3">
        <p className="text-sm font-medium text-gray-700">{filename}</p>
      </div>
      <button className="ml-3 text-gray-500 hover:text-gray-700">
        <DownloadIcon size={18} />
      </button>
    </div>
  );
}