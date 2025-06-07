"use client";
import {
  ArrowLeftIcon,
} from 'lucide-react'
import { Container } from '@mantine/core';
import TrashActionButton from '@/mail/components/TrashActionButton';
import { Email } from '@/mail/store/types';
import EmailAttachmentList from '@/mail/components/EmailAttachmentList';

interface ExperimentEmailPreviewProps {
  email: Omit<Email, 'id' | 'createdAt' | 'experimentId' | 'attachments'>
}

export default function ExperimentEmailPreview({email}: ExperimentEmailPreviewProps) {
  
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

        <TrashActionButton isTrashed={false} onClick={() => {}}/>

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
                {/* <button className="ml-2 text-gray-400 hover:text-gray-600">
                  <ChevronDownIcon size={16} />
                </button> */}
              </div>
            </div>
          </div>
          <div className="text-sm text-gray-500">
            {new Date(email.scheduledFor * 60 * 1000 + Date.now()).toLocaleString([], {
              weekday: 'short',
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </div>
        </div>
        <Container fluid p={0} mt={'xl'}>          
          <p>{email.content}</p>
        </Container>
        {/* <EmailAttachmentList isPreview={true} emailId={email.id} attachments={email.attachments} /> */}
      </div>
    </div>
  )
}
