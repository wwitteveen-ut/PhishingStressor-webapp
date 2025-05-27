
"use server";

import { auth } from "@/auth";
import { getEmails } from "@/mail/actions/actions";
import EmailClient from "@/mail/components/EmailClient";
import { redirect } from "next/navigation";

export default async function Page() {
    const session = await auth();
    if (!session){
        redirect("/login")
    }

    const loggedInAt = session.user.loggedInAt;

    const emails = await getEmails();
    const filteredEmails = emails.filter(email => {
        const loggedInDate = new Date(loggedInAt);
        const scheduledTime = new Date(loggedInDate.getTime() + (email.scheduledFor * 60 * 1000));
        return scheduledTime < new Date();
    });

    return (
        <EmailClient emails={filteredEmails} />
    );
}