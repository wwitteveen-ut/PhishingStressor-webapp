import { http, HttpResponse } from 'msw';
import { mockEmails } from '../data/emails';
import { getExternalApiUrl } from '@/shared/utils/externalApiHelper';
import { getApiUrl } from '@/shared/utils/apiHelper';

export const emailsHandlers = [
  http.get(await getExternalApiUrl(`/api/experiments/:experimentId/emails`), () => {
    return HttpResponse.json(mockEmails);
  }),
  http.get(`${process.env.API_BASE_URL}/api/experiments/:experimentId/emails/:emailId`, ({ params }) => {
    const { emailId } = params;
    const email = mockEmails.find(e => e.id === emailId);

    if (email) {
      return HttpResponse.json(email);
    } else {
      return new HttpResponse(null, { status: 404, statusText: 'Email not found' });
    }
  }),
  http.get(await getExternalApiUrl(`/api/experiments/:experimentId/emails/:emailId/attachments/:attachmentId`), async () => {
    
    const res = await fetch(getApiUrl('/mock/sample.pdf'));
    const buffer = await res.arrayBuffer();
    return new HttpResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/octet-stream',
        'Content-Disposition': 'attachment; filename="test.pdf"',
      },
    });
  }),
  http.post(await getExternalApiUrl(`/api/experiments/:experimentId/emails/:emailId/replies`), async ({request}) => {
    const info = await request.formData();
    console.log(info);
    return HttpResponse.json(info);
   }),
];