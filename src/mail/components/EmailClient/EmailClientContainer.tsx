"use server";
import { auth } from "@/auth";
import { getParticipantEmails } from "@/mail/actions/actions";
import { SessionProvider } from "next-auth/react";
import { redirect } from "next/navigation";
import { EmailClient } from "./EmailClient";

async function EmailClientContainer() {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }
  const emails = await getParticipantEmails();

  return (
    <SessionProvider>
      <EmailClient emails={emails} />
    </SessionProvider>
  );
}

export default EmailClientContainer;
