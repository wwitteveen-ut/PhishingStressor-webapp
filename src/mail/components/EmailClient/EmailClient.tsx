import Sidebar from "@/mail/components/Sidebar";
import EmailList from "../EmailList";
import EmailView from "../EmailView";
import { getEmails } from "@/mail/actions/actions";

export default async function EmailClient() {
    const emails = await getEmails();

    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <div className="flex flex-1 overflow-hidden">
                <EmailList initialEmails={emails}/>
                <EmailView/> 
            </div>
        </div>

    );
}