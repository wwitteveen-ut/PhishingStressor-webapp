"use server";
import { getEmails } from "@/mail/actions/actions";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { ZustandEmail } from "@/mail/store/types";
import { EmailClient } from "./EmailClient";


async function EmailClientContainer() {
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
    
    
    let newEmails: ZustandEmail[] = filteredEmails.map((email) => {
        const loggedInDate = new Date(loggedInAt);
        const scheduledTime = new Date(loggedInDate.getTime() + (email.scheduledFor * 60 * 1000));
        
        return {
            ...email,
            isRead: false,
            isTrashed: false,
            sendAt: scheduledTime,
        }
    });

    return (
        <EmailClient emails={newEmails} />
    );
}

export default EmailClientContainer;