import { Role } from "@/auth";
import { validateUserRoleAndGetSession } from "@/shared/utils/authHelper";
import { SessionProvider } from "next-auth/react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  await validateUserRoleAndGetSession(Role.RESEARCHER);

  return (
    <SessionProvider>
      <div className="flex h-screen bg-gray-100">{children}</div>
    </SessionProvider>
  );
}
