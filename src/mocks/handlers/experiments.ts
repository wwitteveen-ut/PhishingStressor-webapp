import { http, HttpResponse } from 'msw';
import { mockExperiments } from '../data/experiments';
import { getExternalApiUrl } from '@/shared/utils/externalApiHelper';

export const experimentsHandlers = [
    http.get(await getExternalApiUrl('/api/experiments'), () => {
    return HttpResponse.json(mockExperiments);
    }),
    http.get(await getExternalApiUrl('/api/experiments/:experimentId'), ({ params }) => {
    const { experimentId } = params;
    const experiment = mockExperiments.find(e => e.id === experimentId);

    if (experiment) {
      return HttpResponse.json(experiment);
    } else {
      return new HttpResponse(null, { status: 404, statusText: 'Experiment not found' });
    }
  }),
];