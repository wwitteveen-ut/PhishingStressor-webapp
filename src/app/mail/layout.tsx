import { getEmails } from "@/mail/actions/actions";
import EmailList from "@/mail/components/EmailList";
import Sidebar from "@/shared/components/Sidebar/Sidebar";
import { EmailClientStoreProvider } from "@/mail/providers/EmailClientStoreProvider";

export default async function Layout({ children } : {
    children: React.ReactNode;
}) {
  const emails = await getEmails();
  
  return (
    <>
      <div className="flex h-screen overflow-hidden">
        <EmailClientStoreProvider>
          <Sidebar />
          <div className="flex flex-1 overflow-hidden">
            <EmailList initialEmails={emails}/>
            {children}
          </div>
        </EmailClientStoreProvider>
      </div>
    </>
  )
}