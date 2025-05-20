import React from 'react'
import { PaperclipIcon } from 'lucide-react'
export function EmailListItem({email}: any) {
  return (
    <div
      className={`p-3 border-b border-gray-200 cursor-pointer hover:bg-gray-100`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-white text-sm font-medium mr-3">
            {email.from.avatar}
          </div>
          <div className="flex-1 min-w-0">
            <p
              className={`text-sm ${email.isRead ? 'text-gray-700' : 'font-medium text-gray-900'} truncate`}
            >
              {email.from.name}
            </p>
          </div>
        </div>
        <div className="text-xs text-gray-500">{email.date}</div>
      </div>
      <div className="mt-1">
        <p
          className={`text-sm ${email.isRead ? 'text-gray-700' : 'font-medium text-gray-900'} truncate`}
        >
          {email.subject}
        </p>
        <div className="flex items-center mt-1">
          <p className="text-xs text-gray-500 truncate flex-1">
            {email.preview}
          </p>
          <div className="flex items-center ml-2">
            {email.hasAttachment && (
              <PaperclipIcon size={14} className="text-gray-400" />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
