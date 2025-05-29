import { http, HttpResponse } from 'msw';

const PARTICIPANT_TOKEN = "voWAmhiC3XfmvoMvmLtyLxse5OeZmiC26rrQwSfMzEBB3iADscFHXO31sdmjOTQr";
const RESEARCHER_TOKEN = "Swvwcom8ocF597iyTGKBkQGV06fgG9Iu1jalcZhaMdM7qI3XG0yVRzi4JDBUvbE4";

export const authHandlers = [
  http.post(`${process.env.API_BASE_URL}/api/auth/login/participant`, async ({ request }) => {
    return HttpResponse.json({
      token: PARTICIPANT_TOKEN,
      experimentId: "1077d109-17fb-4a9d-a0d7-193ad821ae00",
      loggedIn: new Date().toISOString(),
    });
  }),
  http.post(`${process.env.API_BASE_URL}/api/auth/login/researcher`, async ({ request }) => {
    return HttpResponse.json({
      token: RESEARCHER_TOKEN,
    });
  }),
];