import { http, HttpResponse } from 'msw';
import { mockAttachments, mockEmails } from '../data/emails';
import { getExternalApiUrl } from '@/shared/utils/externalApiHelper';
import { getApiUrl } from '@/shared/utils/apiHelper';
import { mockExperiments } from '../data/experiments';

export const emailsHandlers = [
  http.get(await getExternalApiUrl(`/experiments/:experimentId/emails`), () => {
    return HttpResponse.json(mockEmails);
  }),
  http.get(`${process.env.API_BASE_URL}/experiments/:experimentId/emails/:emailId`, ({ params }) => {
    const { emailId } = params;
    const email = mockEmails.find(e => e.id === emailId);

    if (email) {
      return HttpResponse.json(email);
    } else {
      return new HttpResponse(null, { status: 404, statusText: 'Email not found' });
    }
  }),
  http.get(await getExternalApiUrl(`/experiments/:experimentId/emails/:emailId/attachments/:attachmentId`), async ({params}) => {
    const { attachmentId } = params;
    const attachment = mockAttachments.find(a => a.id === attachmentId);    
    if (!attachment) {
      return new HttpResponse(null, { status: 404, statusText: 'Attachment not found' });
    }
    const res = await fetch(getApiUrl(`/mock/${attachment.filename}`));
    const buffer = await res.arrayBuffer();
    return new HttpResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/octet-stream',
        'Content-Disposition': `attachment; filename="${attachment.filename}"`,
      },
    });
  }),
  http.post(await getExternalApiUrl('/experiments/:experimentId/emails/:emailId/tracking'), async ({ params, request }) => {
    const { experimentId, emailId } = params;
    const experiment = mockExperiments.find(e => e.id === experimentId);

    if (!experiment) {
      return new HttpResponse(null, { status: 404, statusText: 'Experiment not found' });
    }

    const trackingData = await request.json();
    console.log(`Received request with tracking info for email: ${emailId} in experiment: ${experimentId}`, trackingData);
    return HttpResponse.json(trackingData);
  }),
  http.post(await getExternalApiUrl('/experiments/:experimentId/emails/:emailId/replies'), async ({ params, request }) => {
    const { experimentId, emailId } = params;
    const experiment = mockExperiments.find(e => e.id === experimentId);

    if (!experiment) {
      return new HttpResponse(null, { status: 404, statusText: 'Experiment not found' });
    }

    const replyData = await request.json();
    console.log(`Received request to create reply for email: ${emailId} in experiment: ${experimentId}`, replyData);
    return HttpResponse.json(replyData);
  }),
    http.delete(await getExternalApiUrl('/experiments/:experimentId/emails/:emailId'), ({ params }) => {
      const { experimentId, emailId } = params;
      const experiment = mockExperiments.find(e => e.id === experimentId);
  
      if (!experiment) {
        return new HttpResponse(null, { status: 404, statusText: 'Experiment not found' });
      }
  
      console.log(`Received request to delete email with id: ${emailId} for experiment: ${experimentId}`);
      return new HttpResponse(null, { status: 200 });
    }),
];