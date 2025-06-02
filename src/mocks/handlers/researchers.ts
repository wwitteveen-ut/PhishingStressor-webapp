import { getExternalApiUrl } from '@/shared/utils/externalApiHelper';
import { http, HttpResponse } from 'msw';
import { researchers } from '../data/accounts';

export const researcherHandlers = [
  http.get(await getExternalApiUrl('/api/researchers'), () => {
    return HttpResponse.json(researchers);
  }),
];