import { http, HttpResponse } from 'msw'
import { mockEmails } from './data/emails'

const PARTICIPANT_TOKEN = "voWAmhiC3XfmvoMvmLtyLxse5OeZmiC26rrQwSfMzEBB3iADscFHXO31sdmjOTQr";
const RESEARCHER_TOKEN = "Swvwcom8ocF597iyTGKBkQGV06fgG9Iu1jalcZhaMdM7qI3XG0yVRzi4JDBUvbE4";

export const handlers = [
    http.get(`${process.env.API_BASE_URL}/api/users`, () => {
        return HttpResponse.json([
            { id: 1, name: 'John Smith' },
            { id: 2, name: 'Jane Smith' },
        ])
    }),
    http.get(`${process.env.API_BASE_URL}/api/experiments/:experimentId/emails`, () => {
        return HttpResponse.json(mockEmails)
    }),
    http.get(`${process.env.API_BASE_URL}/api/mails/:id`, ({ params }) => {
        const { id } = params;
        const email = mockEmails.find(e => e.id === id);

        if (email) {
            return HttpResponse.json(email);
        } else {
            return new HttpResponse(null, { status: 404, statusText: 'Email not found' });
        }
    }),

    http.post(`${process.env.API_BASE_URL}/api/auth/login/participant`, async ({ request }) => {
        return HttpResponse.json({
            token: PARTICIPANT_TOKEN,
            experimentId: "1077d109-17fb-4a9d-a0d7-193ad821ae00",
            loggedIn: new Date().toISOString(),
        });
    }),

    http.post(`${process.env.API_BASE_URL}/api/auth/login/researcher`, async ({ request }) => {
        return HttpResponse.json({
            token: RESEARCHER_TOKEN
        });
    }),
]