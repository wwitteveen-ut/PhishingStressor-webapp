import { auth } from "@/auth"
import { Email, ZustandEmail } from "@/mail/store/types";
import { getExternalApiUrl } from "@/shared/utils/externalApiHelper";
import { NextResponse } from "next/server"
 
export const GET = auth(async function GET(req) {
  if (req.auth) {
    const user = req.auth.user;
    const loggedIn = user.loggedIn;
    const loggedInDate = new Date(loggedIn);
    const path = await getExternalApiUrl(`/api/experiments/${user.experimentId}/emails`);
    const response = await fetch(path);
    const emails = await response.json() as Email[];

    const filteredEmails: ZustandEmail[] = emails
        .map((email) => {
            const scheduledTime = new Date(Math.floor((loggedInDate.getTime() + email.scheduledFor * 60 * 1000) / 60000) * 60000);
            return {
                ...email,
                sendAt: scheduledTime,
                isRead: false,
                isTrashed: false
            };
        })
        .filter(email => email.sendAt < new Date());

    return NextResponse.json(filteredEmails);
}
  return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
});
