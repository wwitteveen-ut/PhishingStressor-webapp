import { http, HttpResponse } from 'msw'
import { mockEmails } from './data/emails'

export const handlers = [
    http.get(`${process.env.API_BASE_URL}/api/users`, () => {
        return HttpResponse.json([
            { id: 1, name: 'John Smith' },
            { id: 2, name: 'Jane Smith' },
        ])
    }),
    http.get(`${process.env.API_BASE_URL}/api/mails`, () => {
        return HttpResponse.json(mockEmails)
    }),
    http.get(`${process.env.API_BASE_URL}/api/mails/:id`, ({ params }) => {
        const { id } = params;
        const email = mockEmails.find(e => e.id === Number(id));

        if (email) {
            return HttpResponse.json(email);
        } else {
            return new HttpResponse(null, { status: 404, statusText: 'Email not found' });
        }
    }),
]