import { http, HttpResponse } from 'msw';
import { mockExperiments } from '../data/experiments';

export const experimentsHandlers = [
  http.get(`${process.env.API_BASE_URL}/api/experiments`, () => {
    return HttpResponse.json(mockExperiments);
  }),
  http.get(`${process.env.API_BASE_URL}/api/experiments/:experimentId`, ({ params }) => {
    const { experimentId } = params;
    const experiment = mockExperiments.find(e => e.id === experimentId);

    if (experiment) {
      return HttpResponse.json(experiment);
    } else {
      return new HttpResponse(null, { status: 404, statusText: 'Experiment not found' });
    }
  }),
];