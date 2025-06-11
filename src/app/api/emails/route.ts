import { auth, Role } from "@/auth";
import { Email, ZustandEmail } from "@/mail/store/types";
import { makeAuthenticatedRequest } from "@/shared/utils/authHelper";
import { NextResponse } from "next/server";

export const GET = auth(async function GET(req) {
  if (req.auth) {
    const user = req.auth.user;
    const loggedIn = user.loggedIn;
    const loggedInDate = new Date(loggedIn);

    const response = await makeAuthenticatedRequest(
      `/experiments/${user.experimentId}/emails`,
      Role.PARTICIPANT
    );
    if (!response.ok) {
      return NextResponse.json(
        { message: "Not authenticated" },
        { status: 401 }
      );
    }
    const emails = (await response.json()) as Email[];

    const filteredEmails: ZustandEmail[] = emails
      .map((email) => {
        const scheduledTime = new Date(
          Math.floor(
            (loggedInDate.getTime() + email.scheduledFor * 60 * 1000) / 60000
          ) * 60000
        );
        return {
          ...email,
          isPhishing: undefined,
          sendAt: scheduledTime,
          isRead: false,
          isTrashed: false,
          hasReplied: false,
        };
      })
      .filter((email) => email.sendAt < new Date())
      .sort((a, b) => b.sendAt.getTime() - a.sendAt.getTime());

    return NextResponse.json(filteredEmails);
  }
  return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
});
