import { ResearcherEmail } from "@/researcher/store/types";
import { mockExperiments, mockGroups } from "./experiments";

export const mockAttachments = [
  {
    filename: "sample.txt",
    id: "a9b8c7d6-5e4f-3a2b-1c0d-9e8f7a6b5c4d",
  },
  {
    filename: "sample.png",
    id: "b0c9d8e7-6f5a-4b3c-2d1e-0f9a8b7c6d5e",
  },
  {
    filename: "sample.jpg",
    id: "c1d0e9f8-7a6b-5c4d-3e2f-1a0b9c8d7e6f",
  },
  {
    filename: "sample.pdf",
    id: "d2e1f0a9-8b7c-6d5e-4f3a-2b1c0d9e8f7a",
  },
];

export const mockEmails: ResearcherEmail[] = [
  {
    id: "1077d109-17fb-4a9d-a0d7-193ad821ae00",
    createdAt: "2025-05-15T15:47:33.248Z",
    isPhishing: false,
    senderName: "Jane Doe",
    senderAddress: "jane.doe@example.com",
    title: "Meeting Next Week",
    content: `
      <div style="font-family: Arial, sans-serif;">
        <p>Hi there,</p>
        <p>Just checking in about our meeting next week. Let me know what time works best!</p>
        <p>Best regards,<br>Jane Doe</p>
      </div>
    `,
    scheduledFor: 0,
    groups: mockGroups,
    experimentId: mockExperiments[0].id,
    attachments: [mockAttachments[0], mockAttachments[1]],
  },
  {
    id: "2b8e9f3a-5c2d-4f1e-b7a4-3c9d8e2f1b6a",
    createdAt: "2025-05-15T15:47:33.248Z",
    isPhishing: false,
    senderName: "Tech Updates",
    senderAddress: "newsletter@techupdates.com",
    title: "Your June Tech Newsletter",
    content: `
      <div style="font-family: Arial, sans-serif;">
        <p>Welcome to the June edition of our tech newsletter.</p>
        <ul>
          <li><strong>AI Trends:</strong> Explore the latest in AI development.</li>
          <li><strong>Cloud Tools:</strong> New tools for cloud computing.</li>
        </ul>
        <p>Stay updated with the latest tech news!</p>
      </div>
    `,
    scheduledFor: 0,
    groups: mockGroups,
    experimentId: mockExperiments[0].id,
    attachments: [mockAttachments[3]],
  },
  {
    id: "3c9f0e4b-6d3e-5f2f-a8b5-4d0e9f3a2c7b",
    createdAt: "2025-05-15T15:47:33.248Z",
    isPhishing: false,
    senderName: "WebApp Support",
    senderAddress: "support@webapp.io",
    title: "Support Ticket Resolved",
    content: `
      <div style="font-family: Arial, sans-serif;">
        <p>Your ticket has been resolved.</p>
        <p>Please review the resolution and let us know if you need further assistance.</p>
        <p>Thank you,<br>WebApp Support Team</p>
      </div>
    `,
    scheduledFor: 0,
    groups: mockGroups,
    experimentId: mockExperiments[0].id,
    attachments: [],
  },
  {
    id: "4d0g1f5c-7e4f-6g3g-b9c6-5e1f0g4b3d8c",
    createdAt: "2025-05-15T15:47:33.248Z",
    isPhishing: true,
    senderName: "Security Team",
    senderAddress: "security@company.com",
    title: "Urgent: Account Security Alert",
    content: `
      <div style="font-family: Arial, sans-serif;">
        <p style="color: #c0392b;">Urgent: Your account has been flagged for suspicious activity.</p>
        <p>Please enter your credentials immediately to verify your identity and secure your account.</p>
        <p>Failure to act within 24 hours may result in account suspension.</p>
        <p>Security Team</p>
      </div>
    `,
    scheduledFor: 1,
    groups: mockGroups,
    experimentId: mockExperiments[0].id,
    attachments: [mockAttachments[0]],
  },
  {
    id: "5e1h2g6d-8f5g-7h4h-c0d7-6f2g1h5c4e9d",
    createdAt: "2025-05-15T15:47:33.248Z",
    isPhishing: false,
    senderName: "Manager",
    senderAddress: "manager@company.com",
    title: "Team Meeting Tomorrow",
    content: `
      <div style="font-family: Arial, sans-serif;">
        <p>Reminder: Team meeting at 10 AM tomorrow.</p>
        <p>Please come prepared with your project updates.</p>
        <p>Best,<br>Your Manager</p>
      </div>
    `,
    scheduledFor: 2,
    groups: mockGroups,
    experimentId: mockExperiments[0].id,
    attachments: [mockAttachments[3], mockAttachments[2]],
  },
  {
    id: "6f2i3h7e-9g6h-8i5i-d1e8-7g3i2j6d5f0e",
    createdAt: "2025-05-15T15:47:33.248Z",
    isPhishing: false,
    senderName: "Billing Department",
    senderAddress: "billing@company.com",
    title: "Invoice Due",
    content: `
      <div style="font-family: Arial, sans-serif;">
        <p>Your invoice #12345 is due for payment.</p>
        <p>Please make the payment by the due date to avoid late fees.</p>
        <p>Billing Department</p>
      </div>
    `,
    scheduledFor: 3,
    groups: mockGroups,
    experimentId: mockExperiments[0].id,
    attachments: [mockAttachments[3]],
  },
  {
    id: "7g3j4i8f-0h7i-9j6j-e2f9-8h4j3k7e6g1f",
    createdAt: "2025-05-15T15:47:33.248Z",
    isPhishing: false,
    senderName: "Human Resources",
    senderAddress: "hr@company.com",
    title: "Benefits Update",
    content: `
      <div style="font-family: Arial, sans-serif;">
        <p>Please review the new benefits package for the upcoming year.</p>
        <ul>
          <li>Updated health insurance plans</li>
          <li>New wellness programs</li>
        </ul>
        <p>Human Resources</p>
      </div>
    `,
    scheduledFor: 5,
    groups: mockGroups,
    experimentId: mockExperiments[0].id,
    attachments: [mockAttachments[3], mockAttachments[0]],
  },
  {
    id: "8h4k5j9g-1i8j-0k7k-f3g0-9i5k4l8f7h2g",
    createdAt: "2025-05-15T15:47:33.248Z",
    isPhishing: false,
    senderName: "Skillshare Training",
    senderAddress: "training@skillshare.com",
    title: "New Course Available",
    content: `
      <div style="font-family: Arial, sans-serif;">
        <p>Check out our latest course on advanced programming techniques.</p>
        <p>Enroll now to enhance your skills!</p>
        <p>Skillshare Training Team</p>
      </div>
    `,
    scheduledFor: 8,
    groups: mockGroups,
    experimentId: mockExperiments[0].id,
    attachments: [],
  },
  {
    id: "9i5l6k0h-2j9k-1l8l-g4h1-0j6l5m9g8i3h",
    createdAt: "2025-05-15T15:47:33.248Z",
    isPhishing: true,
    senderName: "Payroll Department",
    senderAddress: "payroll@company.com",
    title: "Urgent: Verify Your Payroll Details",
    content: `
      <div style="font-family: Arial, sans-serif;">
        <p style="color: #c0392b;">Urgent: We detected an issue with your payroll account.</p>
        <p>Please provide your bank details immediately to ensure timely payment.</p>
        <p>Contact the payroll team directly to resolve this issue.</p>
        <p>Payroll Department</p>
      </div>
    `,
    scheduledFor: 8,
    groups: mockGroups,
    experimentId: mockExperiments[0].id,
    attachments: [mockAttachments[3]],
  },
  {
    id: "0j6m7l1i-3k0l-2m9m-h5i2-1k7m6n0h9j4i",
    createdAt: "2025-05-15T15:47:33.248Z",
    isPhishing: false,
    senderName: "IT Department",
    senderAddress: "it@company.com",
    title: "System Maintenance",
    content: `
      <div style="font-family: Arial, sans-serif;">
        <p>Scheduled maintenance will occur this weekend.</p>
        <p>Please save your work to avoid data loss.</p>
        <p>IT Department</p>
      </div>
    `,
    scheduledFor: 4,
    groups: mockGroups,
    experimentId: mockExperiments[0].id,
    attachments: [mockAttachments[0]],
  },
  {
    id: "1k7n8m2j-4l1m-3n0n-i6j3-2l8n7o1i0k5j",
    createdAt: "2025-05-15T15:47:33.248Z",
    isPhishing: false,
    senderName: "Marketing Team",
    senderAddress: "marketing@company.com",
    title: "Campaign Review",
    content: `
      <div style="font-family: Arial, sans-serif;">
        <p>Please review the latest marketing campaign materials.</p>
        <p>Feedback is appreciated by EOD Friday.</p>
        <p>Marketing Team</p>
      </div>
    `,
    scheduledFor: 13,
    groups: mockGroups,
    experimentId: mockExperiments[0].id,
    attachments: [mockAttachments[3], mockAttachments[2]],
  },
  {
    id: "2l8o9n3k-5m2n-4o1o-j7k4-3m9o8p2j1l6k",
    createdAt: "2025-05-15T15:47:33.248Z",
    isPhishing: false,
    senderName: "Project Management",
    senderAddress: "projects@company.com",
    title: "Project Timeline Update",
    content: `
      <div style="font-family: Arial, sans-serif;">
        <p>Important updates to the Q4 project timeline.</p>
        <p>Please review the changes and provide feedback.</p>
        <p>Project Management</p>
      </div>
    `,
    scheduledFor: 6,
    groups: mockGroups,
    experimentId: mockExperiments[0].id,
    attachments: [mockAttachments[3]],
  },
];
