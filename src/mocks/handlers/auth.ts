import { getExternalApiUrl } from "@/shared/utils/externalApiHelper";
import { http, HttpResponse } from "msw";
import { researchers } from "../data/accounts";
import { mockExperiments } from "../data/experiments";

const PARTICIPANT_TOKEN =
  "voWAmhiC3XfmvoMvmLtyLxse5OeZmiC26rrQwSfMzEBB3iADscFHXO31sdmjOTQr";
const RESEARCHER_TOKEN =
  "Swvwcom8ocF597iyTGKBkQGV06fgG9Iu1jalcZhaMdM7qI3XG0yVRzi4JDBUvbE4";

export const authHandlers = [
  http.post(await getExternalApiUrl(`/auth/login/participant`), async () => {
    return HttpResponse.json({
      token: PARTICIPANT_TOKEN,
      experimentId: mockExperiments[0].id,
      loggedIn: new Date().toISOString(),
    });
  }),
  http.post(
    await getExternalApiUrl(`/auth/login/researcher`),
    async ({ request }) => {
      const data = (await request.json()) as {
        username: string;
        password: string;
      };
      const researcher = researchers.find((r) => r.username === data.username);
      if (!researcher) {
        return new HttpResponse(null, { status: 404 });
      }
      return HttpResponse.json({
        token: RESEARCHER_TOKEN,
        id: researcher.id,
      });
    }
  ),
  http.get(await getExternalApiUrl(`/auth/register`), () => {
    return HttpResponse.json(process.env.RESEARCHER_REGISTRATION === "enabled");
  }),
  http.post(await getExternalApiUrl(`/auth/register`), async ({ request }) => {
    if (process.env.RESEARCHER_REGISTRATION !== "enabled")
      return new HttpResponse(null, { status: 401 });

    const trackingData = await request.formData();
    console.log(
      `Received request for registering a researcher: `,
      trackingData
    );
    return HttpResponse.json({
      token: RESEARCHER_TOKEN,
      id: researchers[0].id,
    });
  }),
];
