import { http, HttpResponse } from 'msw';
import { mockEmails } from '../data/emails';

export const emailsHandlers = [
  http.get(`${process.env.API_BASE_URL}/api/experiments/:experimentId/emails`, () => {
    return HttpResponse.json(mockEmails);
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
];