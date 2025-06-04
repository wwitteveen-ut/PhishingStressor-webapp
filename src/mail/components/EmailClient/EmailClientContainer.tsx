"use server";
import { getParticipantEmails } from "@/mail/actions/actions";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { EmailClient } from "./EmailClient";

async function EmailClientContainer() {
    const session = await auth();
    if (!session){
        redirect("/login")
    }
    const emails = await getParticipantEmails();

    return (
        <EmailClient emails={emails} />
    );
}

export default EmailClientContainer;