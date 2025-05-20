import { Email } from '@/mail/store/types';
import { PaperclipIcon } from 'lucide-react';

export default function EmailListItem({email}: {email:Email}) {
  console.log('email', email);
  return (
    <div
      className={`p-3 border-b border-gray-200 cursor-pointer hover:bg-gray-100`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="flex-1 min-w-0">
            <p
              className={`text-sm truncate`}
            >
              {email.senderName}
            </p>
          </div>
        </div>
        <div className="text-xs text-gray-500">{email.scheduledFor.toString()}</div>
      </div>
      <div className="mt-1">
        <p
          className={`text-sm truncate`}
        >
          {email.subject}
        </p>
        <div className="flex items-center mt-1">
          <p className="text-xs text-gray-500 truncate flex-1">
            {email.content}
          </p>
          {/* <div className="flex items-center ml-2">
            {email.hasAttachment && (
              <PaperclipIcon size={14} className="text-gray-400" />
            )}
          </div> */}
        </div>
      </div>
    </div>
  )
}
