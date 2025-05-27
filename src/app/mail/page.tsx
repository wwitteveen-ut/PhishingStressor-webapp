
"use server";

import { auth } from "@/auth";
import { getEmails } from "@/mail/actions/actions";
import { EmailClient } from "@/mail/components/EmailClient";
import { ZustandEmail } from "@/mail/store/types";
import { redirect } from "next/navigation";

export default async function Page() {
    

    return (
        <EmailClient />
    );
}