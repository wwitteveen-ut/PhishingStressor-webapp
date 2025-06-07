import Sidebar from "@/mail/components/Sidebar";
import { EmailClientStoreProvider } from "@/mail/providers/EmailClientStoreProvider";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden">
      <EmailClientStoreProvider>
        <Sidebar />
        {children}
      </EmailClientStoreProvider>
    </div>
  );
}
