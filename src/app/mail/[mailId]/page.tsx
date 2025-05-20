import { getEmail } from "@/mail/actions/actions";
import EmailView from "@/mail/components/EmailView";

export default async function Page( { params } : {
    params: {
        mailId: number;
    }
}) {
    const { mailId } = await params;
    const email = await getEmail(mailId);
    
    return (
        <EmailView email={email} />
    );
}