import { getExternalApiUrl } from '@/shared/utils/externalApiHelper';
import { http, HttpResponse } from 'msw';
import { researchers } from '../data/accounts';

const PARTICIPANT_TOKEN = "voWAmhiC3XfmvoMvmLtyLxse5OeZmiC26rrQwSfMzEBB3iADscFHXO31sdmjOTQr";
const RESEARCHER_TOKEN = "Swvwcom8ocF597iyTGKBkQGV06fgG9Iu1jalcZhaMdM7qI3XG0yVRzi4JDBUvbE4";

export const authHandlers = [
  http.post(await getExternalApiUrl(`/api/auth/login/participant`), async () => {
    return HttpResponse.json({
      token: PARTICIPANT_TOKEN,
      experimentId: "1077d109-17fb-4a9d-a0d7-193ad821ae00",
      loggedIn: new Date().toISOString(),
    });
  }),
  http.post(await getExternalApiUrl(`/api/auth/login/researcher`), async ({request}) => {
    const data = await request.json() as { username: string, password: string };
    const researcher = researchers.find(r => r.username === data.username);
    if (!researcher) {
      return new HttpResponse(null, { status: 404});
    }
    return HttpResponse.json({
      token: RESEARCHER_TOKEN,
      id: researcher.id
    });
  }),
  http.get(await getExternalApiUrl(`/api/auth/register`), () => {
    return HttpResponse.json(process.env.RESEARCHER_REGISTRATION === 'enabled');
  }),
   http.post(await getExternalApiUrl(`/api/auth/register`), async ({request}) => {
    if (process.env.RESEARCHER_REGISTRATION !== 'enabled') return new HttpResponse(null, { status: 401 });

    const info = await request.formData();
    return HttpResponse.json(info);
   }),
];