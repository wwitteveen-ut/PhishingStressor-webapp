import { Email } from "@/mail/store/types";

export const mockEmails: Email[] = [
  {
    id: "1077d109-17fb-4a9d-a0d7-193ad821ae00",
    createdAt: "2025-05-15T15:47:33.248Z",
    isPhishing: false,
    senderName: "Jane Doe",
    senderAddress: "jane.doe@example.com",
    title: "Meeting Next Week",
    content: "Hi there, just checking in about our meeting next week. Let me know what time works best!",
    scheduledFor: 12,
    experimentId: "1ffaf706-4eb7-4ec7-b055-85119b361870",
    attachments: [
      {
        filename: "Meeting_Agenda.pdf",
        id: "f4f1ccdd-8672-4e3a-9376-fa058d3aba53"
      },
      {
        filename: "Schedule.png",
        id: "a1b2c3d4-5e6f-7a8b-9c0d-1e2f3a4b5c6d"
      }
    ]
  },
  {
    id: "2b8e9f3a-5c2d-4f1e-b7a4-3c9d8e2f1b6a",
    createdAt: "2025-05-15T15:47:33.248Z",
    isPhishing: false,
    senderName: "Tech Updates",
    senderAddress: "newsletter@techupdates.com",
    title: "Your June Tech Newsletter",
    content: "Welcome to the June edition of our tech newsletter. This month we're covering AI trends, cloud tools, and more.",
    scheduledFor: 7,
    experimentId: "1ffaf706-4eb7-4ec7-b055-85119b361870",
    attachments: [
      {
        filename: "Newsletter_June.pdf",
        id: "a3b2c1d9-4e7b-4a2f-9c8e-1f2a3b4c5d6e"
      }
    ]
  },
  {
    id: "3c9f0e4b-6d3e-5f2f-a8b5-4d0e9f3a2c7b",
    createdAt: "2025-05-15T15:47:33.248Z",
    isPhishing: false,
    senderName: "WebApp Support",
    senderAddress: "support@webapp.io",
    title: "Support Ticket Resolved",
    content: "Your ticket has been resolved. Please review the resolution and let us know if you need further assistance.",
    scheduledFor: 3,
    experimentId: "1ffaf706-4eb7-4ec7-b055-85119b361870",
    attachments: []
  },
  {
    id: "4d0g1f5c-7e4f-6g3g-b9c6-5e1f0g4b3d8c",
    createdAt: "2025-05-15T15:47:33.248Z",
    isPhishing: false,
    senderName: "Security Team",
    senderAddress: "security@company.com",
    title: "Important Security Update",
    content: "Please update your account credentials immediately.",
    scheduledFor: 9,
    experimentId: "1ffaf706-4eb7-4ec7-b055-85119b361870",
    attachments: [
      {
        filename: "Security_Guide.txt",
        id: "b4c3d2e0-5f8c-5b3g-0d9f-2g3b4c5d6e7f"
      }
    ]
  },
  {
    id: "5e1h2g6d-8f5g-7h4h-c0d7-6f2g1h5c4e9d",
    createdAt: "2025-05-15T15:47:33.248Z",
    isPhishing: false,
    senderName: "Manager",
    senderAddress: "manager@company.com",
    title: "Team Meeting Tomorrow",
    content: "Reminder: Team meeting at 10 AM tomorrow.",
    scheduledFor: 1,
    experimentId: "1ffaf706-4eb7-4ec7-b055-85119b361870",
    attachments: [
      {
        filename: "Meeting_Notes.pdf",
        id: "c5d4e3f1-6g9d-6c4i-1e0g-3h4c5d6e7f8g"
      },
      {
        filename: "Agenda.jpg",
        id: "d6e5f4g2-7h0e-7d5j-2f1h-4i5d6e7f8g9h"
      }
    ]
  },
  {
    id: "6f2i3h7e-9g6h-8i5i-d1e8-7g3i2j6d5f0e",
    createdAt: "2025-05-15T15:47:33.248Z",
    isPhishing: false,
    senderName: "Billing Department",
    senderAddress: "billing@company.com",
    title: "Invoice Due",
    content: "Your invoice #12345 is due for payment.",
    scheduledFor: 14,
    experimentId: "1ffaf706-4eb7-4ec7-b055-85119b361870",
    attachments: [
      {
        filename: "Invoice_12345.pdf",
        id: "e7f6g5h3-8i1f-8e6k-3g2i-5j6e7f8g9h0i"
      }
    ]
  },
  {
    id: "7g3j4i8f-0h7i-9j6j-e2f9-8h4j3k7e6g1f",
    createdAt: "2025-05-15T15:47:33.248Z",
    isPhishing: false,
    senderName: "Human Resources",
    senderAddress: "hr@company.com",
    title: "Benefits Update",
    content: "Please review the new benefits package for the upcoming year.",
    scheduledFor: 5,
    experimentId: "1ffaf706-4eb7-4ec7-b055-85119b361870",
    attachments: [
      {
        filename: "Benefits_Package.pdf",
        id: "f8g7h6i4-9j2g-9f7l-4h3j-6k7f8g9h0i1j"
      },
      {
        filename: "Summary.txt",
        id: "g9h8i7j5-0k3h-0g8m-5i4k-7l8g9h0i1j2k"
      }
    ]
  },
  {
    id: "8h4k5j9g-1i8j-0k7k-f3g0-9i5k4l8f7h2g",
    createdAt: "2025-05-15T15:47:33.248Z",
    isPhishing: false,
    senderName: "Skillshare Training",
    senderAddress: "training@skillshare.com",
    title: "New Course Available",
    content: "Check out our latest course on advanced programming techniques.",
    scheduledFor: 11,
    experimentId: "1ffaf706-4eb7-4ec7-b055-85119b361870",
    attachments: []
  },
  {
    id: "9i5l6k0h-2j9k-1l8l-g4h1-0j6l5m9g8i3h",
    createdAt: "2025-05-15T15:47:33.248Z",
    isPhishing: false,
    senderName: "Payroll Department",
    senderAddress: "payroll@company.com",
    title: "Payslip Available",
    content: "Your monthly payslip is now available for download.",
    scheduledFor: 8,
    experimentId: "1ffaf706-4eb7-4ec7-b055-85119b361870",
    attachments: [
      {
        filename: "Payslip.pdf",
        id: "h0i9j8k6-1l4i-2h9n-6j5l-8m9h0i1j2k3l"
      }
    ]
  },
  {
    id: "0j6m7l1i-3k0l-2m9m-h5i2-1k7m6n0h9j4i",
    createdAt: "2025-05-15T15:47:33.248Z",
    isPhishing: false,
    senderName: "IT Department",
    senderAddress: "it@company.com",
    title: "System Maintenance",
    content: "Scheduled maintenance will occur this weekend. Please save your work.",
    scheduledFor: 4,
    experimentId: "1ffaf706-4eb7-4ec7-b055-85119b361870",
    attachments: [
      {
        filename: "Maintenance_Schedule.txt",
        id: "i1j0k9l7-2m5j-3i0o-7k6m-9n0i1j2k3l4m"
      }
    ]
  },
  {
    id: "1k7n8m2j-4l1m-3n0n-i6j3-2l8n7o1i0k5j",
    createdAt: "2025-05-15T15:47:33.248Z",
    isPhishing: false,
    senderName: "Marketing Team",
    senderAddress: "marketing@company.com",
    title: "Campaign Review",
    content: "Please review the latest marketing campaign materials.",
    scheduledFor: 13,
    experimentId: "1ffaf706-4eb7-4ec7-b055-85119b361870",
    attachments: [
      {
        filename: "Campaign_Materials.pdf",
        id: "j2k1l0m8-3n6k-4j1p-8l7n-0o1j2k3l4m5n"
      },
      {
        filename: "Campaign_Image.jpg",
        id: "k3l2m1n9-4o7l-5k2q-9m8o-1p2k3l4m5n6o"
      }
    ]
  },
  {
    id: "2l8o9n3k-5m2n-4o1o-j7k4-3m9o8p2j1l6k",
    createdAt: "2025-05-15T15:47:33.248Z",
    isPhishing: false,
    senderName: "Project Management",
    senderAddress: "projects@company.com",
    title: "Project Timeline Update",
    content: "Important updates to the Q4 project timeline. Please review.",
    scheduledFor: 6,
    experimentId: "1ffaf706-4eb7-4ec7-b055-85119b361870",
    attachments: [
      {
        filename: "Timeline.pdf",
        id: "l4m3n2o0-5p8m-6l3r-0n9p-2q3l4m5n6o7p"
      }
    ]
  }
];