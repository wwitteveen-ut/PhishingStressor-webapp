import { Role } from "@/auth";
import { validateUserRoleAndGetSession } from "@/shared/utils/authHelper";
import { SessionProvider } from "next-auth/react";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await validateUserRoleAndGetSession(Role.RESEARCHER);
  if (!session) {
    redirect("/login/researcher");
  }

  return (
    <SessionProvider>
      <div className="flex h-screen bg-gray-100">{children}</div>
    </SessionProvider>
  );
}
