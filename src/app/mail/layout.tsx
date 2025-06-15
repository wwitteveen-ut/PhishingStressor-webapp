import { Role } from "@/auth";
import Sidebar from "@/mail/components/Sidebar";
import { EmailClientStoreProvider } from "@/mail/providers/EmailClientStoreProvider";
import { validateUserRoleAndGetSession } from "@/shared/utils/authHelper";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await validateUserRoleAndGetSession(Role.PARTICIPANT);
  if (!session) {
    redirect("/login/participant");
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <EmailClientStoreProvider>
        <Sidebar />
        {children}
      </EmailClientStoreProvider>
    </div>
  );
}
