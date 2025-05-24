
import { auth } from "@/auth";
import EmailClient from "@/mail/components/EmailClient";
import { redirect } from "next/navigation";

export default async function Page() {
    const session = await auth();
    
    if (!session){
        redirect("/login")
    }
    return (
        <EmailClient />
    );
}