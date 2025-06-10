"use server";
import { Role } from "@/auth";
import { EmailClient } from "@/mail/components/EmailClient";
import { validateUserRoleAndGetSession } from "@/shared/utils/authHelper";

export default async function Page() {
  await validateUserRoleAndGetSession(Role.PARTICIPANT);
  return <EmailClient />;
}
