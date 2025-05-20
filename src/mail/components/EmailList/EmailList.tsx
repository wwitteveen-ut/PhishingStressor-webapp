import type { Email } from "@/mail/store/types";

import EmailListFilters from "../EmailListFilters";
import EmailListItem from "../EmailListItem";

export default function EmailList({emails = []} : {emails?: Email[]}) {
  const emailList: Email[] = [
    {
      id: 1,
      senderEmail: 'security@company.com',
      senderName: 'Security Team',
      subject: 'Important Security Update',
      content: 'Please update your account credentials immediately.',
      scheduledFor: new Date('2023-10-15T10:30:00')
    },
    {
      id: 2,
      senderEmail: 'manager@company.com',
      senderName: 'Manager',
      subject: 'Team Meeting Tomorrow',
      content: 'Reminder: Team meeting at 10 AM tomorrow.',
      scheduledFor: new Date('2023-10-15T09:15:00')
    },
    {
      id: 3,
      senderEmail: 'billing@company.com',
      senderName: 'Billing Department',
      subject: 'Invoice Due',
      content: 'Your invoice #12345 is due for payment.',
      scheduledFor: new Date('2023-10-14T16:45:00')
    }
  ];

  return (
    <div className="w-80 border-r border-gray-200 bg-white flex flex-col h-full">
      <EmailListFilters />
      <div className="flex-1 overflow-y-auto">
        {emails.map((email) => (
          <EmailListItem key={email.id} email={email} />
        ))}
        {emailList.map((email) => (
          <EmailListItem key={email.id} email={email} />
        ))}
      </div>
    </div>
  )
}
