import Sidebar from "@/mail/components/Sidebar";
import EmailList from "../EmailList";
import EmailView from "../EmailView";
import { Email, ZustandEmail } from "@/mail/store/types";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function EmailClient({emails = []}: {emails: Email[]}) {
    const session = await auth();
    if (!session){
        redirect("/login")
    }
    
    const loggedInAt = session.user.loggedInAt;

    let newEmails: ZustandEmail[] = emails.map((email) => {
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
        <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <div className="flex flex-1 overflow-hidden">
                <EmailList initialEmails={newEmails}/>
                <EmailView/> 
            </div>
        </div>

    );
}