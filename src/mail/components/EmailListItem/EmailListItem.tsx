import { useEmailClientStore } from '@/mail/providers/EmailClientStoreProvider';
import { Email, ZustandEmail } from '@/mail/store/types';
import { PaperclipIcon } from 'lucide-react';


export default function EmailListItem({email, isSelected}: {email:ZustandEmail, isSelected: boolean}) {
  const selectEmailId = useEmailClientStore((state) => state.selectEmailId);

  return (
      <div
        className={`p-3 border-b border-gray-200 cursor-pointer ${isSelected ? 'bg-blue-50' : email.isRead ? 'bg-white' : 'bg-gray-50'} hover:bg-gray-100`}
        onClick={() => selectEmailId(email.id)}
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
          <div className="text-xs text-gray-500">
            {new Date(Date.now() + email.scheduledFor * 60 * 1000).toLocaleString([], {
              weekday: 'short',
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </div>
        </div>
        <div className="mt-1">
          <p
            className={`text-sm truncate`}
          >
            {email.title}
          </p>
          <div className="flex items-center mt-1">
            <p className="text-xs text-gray-500 truncate flex-1">
              {email.content}
            </p>
            <div className="flex items-center ml-2">
              {email.attachments.length > 0 && (
                <PaperclipIcon size={14} className="text-gray-400" />
              )}
            </div>
          </div>
        </div>
      </div>
  )
}
