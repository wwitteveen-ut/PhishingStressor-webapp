import EmailList from "@/mail/components/EmailList";
import { EmailClientStoreProvider } from "@/mail/providers/EmailClientStoreProvider";
import { Sidebar } from "@/shared/components/Sidebar/Sidebar";

export default function Layout({ children } : {
    children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex h-screen overflow-hidden">
        <EmailClientStoreProvider>
          <Sidebar />
          <div className="flex flex-1 overflow-hidden">
            <EmailList />
            {children}
            </div>
        </EmailClientStoreProvider>
      </div>
    </>
  )
}