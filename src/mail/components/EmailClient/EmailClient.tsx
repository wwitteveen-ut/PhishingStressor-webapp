import Sidebar from "@/mail/components/Sidebar";
import EmailList from "../EmailList";
import EmailView from "../EmailView";
import { ZustandEmail } from "@/mail/store/types";
export async function EmailClient({emails = []}: {emails: ZustandEmail[]}) {

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