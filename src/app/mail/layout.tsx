import { Role } from "@/auth";
import Sidebar from "@/mail/components/Sidebar";
import { EmailClientStoreProvider } from "@/mail/providers/EmailClientStoreProvider";
import { validateUserRoleAndGetSession } from "@/shared/utils/authHelper";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  await validateUserRoleAndGetSession(Role.PARTICIPANT);

  return (
    <div className="flex h-screen overflow-hidden">
      <EmailClientStoreProvider>
        <Sidebar />
        {children}
      </EmailClientStoreProvider>
    </div>
  );
}
