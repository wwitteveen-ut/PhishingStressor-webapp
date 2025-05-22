import Sidebar from "@/mail/components/Sidebar";
import EmailList from "../EmailList";
import EmailView from "../EmailView";
import { getEmails } from "@/mail/actions/actions";
import { ZustandEmail } from "@/mail/store/types";

export default async function EmailClient() {
    const emails = await getEmails();
    let newEmails: ZustandEmail[] = emails.map((email) => {
        return {
            ...email,
            isRead: false
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