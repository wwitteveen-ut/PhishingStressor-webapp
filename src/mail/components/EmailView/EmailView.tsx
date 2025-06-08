"use client";
import { useEmailClientStore } from "@/mail/providers/EmailClientStoreProvider";
import { Container } from "@mantine/core";
import { useMouse } from "@mantine/hooks";
import { ArrowLeftIcon } from "lucide-react";
import { useEffect } from "react";
import EmailAttachmentList from "../EmailAttachmentList";
import EmailReplySection from "../EmailReplySection";
import TrashActionButton from "../TrashActionButton";

export default function EmailView() {
  const emailId = useEmailClientStore((state) => state.selectedEmailId);
  const emails = useEmailClientStore((state) => state.emails);
  const email = emails.find((email) => email.id === emailId);

  const { ref, x, y } = useMouse();

  const toggleEmailTrashed = useEmailClientStore(
    (state) => state.toggleEmailTrashed
  );
  useEffect(() => {
    const interval = setInterval(() => console.log(x, y), 100);

    return () => clearInterval(interval);
  }, []);

  if (!email) {
    return (
      <div
        className="flex-1 flex items-center justify-center bg-gray-50 text-gray-500"
        ref={ref}
      >
        <p>Select an email to view</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full bg-white overflow-y-auto">
      <div
        className="p-4 border-b border-gray-200 flex items-center justify-between"
        ref={ref}
      >
        <div className="flex items-center">
          <button className="mr-4 text-gray-500 hover:text-gray-700 md:hidden">
            <ArrowLeftIcon size={20} />
          </button>
          <h2 className="text-xl font-medium text-gray-800 truncate">
            {email.title}
          </h2>
        </div>
        <div className="flex items-center space-x-2">
          <TrashActionButton
            isTrashed={email.isTrashed}
            onClick={() => toggleEmailTrashed(email.id)}
          />
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
          <div className="text-sm text-gray-500 ml-2">
            {new Date(email.sendAt).toLocaleString([], {
              weekday: "short",
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        </div>
        <Container fluid p={0} mt={"xl"}>
          <p>{email.content}</p>
        </Container>
        <EmailAttachmentList
          emailId={email.id}
          attachments={email.attachments}
        />

        <EmailReplySection email={email} />
      </div>
    </div>
  );
}
