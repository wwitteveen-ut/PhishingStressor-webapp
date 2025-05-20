import EmailList from "@/mail/components/EmailList";
import { Sidebar } from "@/shared/components/Sidebar/Sidebar";

export default function Layout({ children }: any) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-1 overflow-hidden">
        <EmailList />
        {children}
        </div>
    </div>
  )
}