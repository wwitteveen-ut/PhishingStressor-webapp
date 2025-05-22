"use client";
import {
  ArrowLeftIcon,
  ChevronDownIcon,
} from 'lucide-react'
import { useEmailClientStore } from '@/mail/providers/EmailClientStoreProvider';
import EmailAttachmentListItem from '../EmailAttachmentList';

export default function EmailView() {
  const emailId = useEmailClientStore((state) => state.selectedEmailId);
  const emails = useEmailClientStore((state) => state.emails);
  const email = emails.find((email) => email.id === emailId);
  
  if (!email) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50 text-gray-500">
        <p>Select an email to view</p>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col h-full bg-white overflow-y-auto">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center">
          <button
            className="mr-4 text-gray-500 hover:text-gray-700 md:hidden"
          >
            <ArrowLeftIcon size={20} />
          </button>
          <h2 className="text-xl font-medium text-gray-800 truncate">
            {email.title}
          </h2>
        </div>
        <div className="flex items-center space-x-2">
          {/* <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full">
            <TrashIcon size={20} />
          </button> */}
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div>
              <div className="flex items-center">
                <p className="font-medium text-gray-900">{email.senderName}</p>
                <span className="mx-2 text-gray-500">&#8226;</span>
                <p className="text-sm text-gray-500">{email.senderAddress}</p>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <p>To: me</p>
                <button className="ml-2 text-gray-400 hover:text-gray-600">
                  <ChevronDownIcon size={16} />
                </button>
              </div>
            </div>
          </div>
          <div className="text-sm text-gray-500">
            {new Date(email.scheduledFor).toLocaleString([], {
              weekday: 'short',
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </div>
        </div>
        <div className="mt-6 text-gray-800 leading-relaxed">
          <p>Hello,</p>
          <br />
          <p>{email.content}</p>
          <br />
          <p>Best regards,</p>
          <p>{email.senderName}</p>
        </div>
        <EmailAttachmentListItem attachments={email.attachments}/>
      </div>
    </div>
  )
}
