import { Email } from "@/mail/store/types";

export const mockEmails: Email[] = [
  {
    id: 1,
    senderEmail: "jane.doe@example.com",
    senderName: "Jane Doe",
    content: "Hi there, just checking in about our meeting next week. Let me know what time works best!",
    subject: "Meeting Next Week",
    scheduledFor: new Date('2023-10-15T10:30:00')
  },
  {
    id: 2,
    senderEmail: "newsletter@techupdates.com",
    senderName: "Tech Updates",
    content: "Welcome to the June edition of our tech newsletter. This month we're covering AI trends, cloud tools, and more.",
    subject: "Your June Tech Newsletter",
    scheduledFor: new Date('2023-10-15T10:30:00')
  },
  {
    id: 3,
    senderEmail: "support@webapp.io",
    senderName: "WebApp Support",
    content: "Your ticket has been resolved. Please review the resolution and let us know if you need further assistance.",
    subject: "Support Ticket Resolved",
    scheduledFor: new Date('2023-10-15T10:30:00')
  }, 
  {
      id: 4,
      senderEmail: 'security@company.com',
      senderName: 'Security Team',
      subject: 'Important Security Update',
      content: 'Please update your account credentials immediately.',
      scheduledFor: new Date('2023-10-15T10:30:00')
    },
    {
      id: 5,
      senderEmail: 'manager@company.com',
      senderName: 'Manager',
      subject: 'Team Meeting Tomorrow',
      content: 'Reminder: Team meeting at 10 AM tomorrow.',
      scheduledFor: new Date('2023-10-15T09:15:00')
    },
    {
      id: 6,
      senderEmail: 'billing@company.com',
      senderName: 'Billing Department',
      subject: 'Invoice Due',
      content: 'Your invoice #12345 is due for payment.',
      scheduledFor: new Date('2023-10-14T16:45:00')
    }
];
