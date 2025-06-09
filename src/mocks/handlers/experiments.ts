import { getExternalApiUrl } from "@/shared/utils/externalApiHelper";
import { http, HttpResponse } from "msw";
import { mockExperiments } from "../data/experiments";
import { mockTrackingData } from "../data/tracking";

export const experimentsHandlers = [
  http.get(await getExternalApiUrl("/experiments"), () => {
    return HttpResponse.json(mockExperiments);
  }),
  http.get(
    await getExternalApiUrl("/experiments/:experimentId"),
    ({ params }) => {
      const { experimentId } = params;
      const experiment = mockExperiments.find((e) => e.id === experimentId);

      if (experiment) {
        return HttpResponse.json(experiment);
      } else {
        return new HttpResponse(null, {
          status: 404,
          statusText: "Experiment not found",
        });
      }
    }
  ),
  http.get(
    await getExternalApiUrl("/experiments/:experimentId"),
    ({ params }) => {
      const { experimentId } = params;
      const experiment = mockExperiments.find((e) => e.id === experimentId);

      if (experiment) {
        return HttpResponse.json(experiment);
      } else {
        return new HttpResponse(null, {
          status: 404,
          statusText: "Experiment not found",
        });
      }
    }
  ),

  http.get(
    await getExternalApiUrl("/experiments/:experimentId/statistics"),
    () => {
      return HttpResponse.json(mockTrackingData);
    }
  ),
  http.post(await getExternalApiUrl(`/experiments`), async ({ request }) => {
    const experimentData = await request.json();
    console.log(
      `Received request to create experiment with following payload:`,
      experimentData
    );

    return HttpResponse.json(experimentData);
  }),
  http.delete(
    await getExternalApiUrl("/experiments/:experimentId"),
    ({ params }) => {
      const { experimentId } = params;
      const experiment = mockExperiments.find((e) => e.id === experimentId);

      if (!experiment) {
        return new HttpResponse(null, {
          status: 404,
          statusText: "Experiment not found",
        });
      }
      console.log(
        `Received request to delete experiment with id: ${experimentId}`
      );
      return new HttpResponse(null, { status: 200 });
    }
  ),
];
