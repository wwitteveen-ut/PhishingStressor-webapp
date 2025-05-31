import { EmailAttachmentListProps } from './types';
import EmailAttachmentListItem from '../EmailAttachmentListItem';

export default function EmailAttachmentList({
    emailId,
    attachments,
}: EmailAttachmentListProps) {
    if (!attachments || attachments.length === 0) {
        return null;
    }

    return (
        <div className="mt-6 border border-gray-200 rounded-lg p-4">
            <h3 className="font-medium text-gray-700 mb-3">Attachments ({attachments.length})</h3>
            <div className="flex flex-wrap gap-3">
                {attachments.map((attachment, index) => (
                    <EmailAttachmentListItem emailId={emailId} attachmentData={attachment} key={index} />
                ))}
            </div>
        </div>
    );
}
