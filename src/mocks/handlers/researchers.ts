import { getExternalApiUrl } from "@/shared/utils/externalApiHelper";
import { http, HttpResponse } from "msw";
import { researchers } from "../data/accounts";
import { mockExperiments } from "../data/experiments";

export const researcherHandlers = [
  http.get(await getExternalApiUrl("/researchers"), () => {
    return HttpResponse.json(researchers);
  }),
  http.post(
    await getExternalApiUrl("/experiments/:experimentId/researchers"),
    async ({ params, request }) => {
      const { experimentId } = params;
      const experiment = mockExperiments.find((e) => e.id === experimentId);

      if (!experiment) {
        return new HttpResponse(null, {
          status: 404,
          statusText: "Experiment not found",
        });
      }

      const { id } = (await request.json()) as { id: string };
      console.log(
        `Received request to delete researcher with id: ${id} from the experiment`
      );
      return new HttpResponse(null, { status: 200 });
    }
  ),

  http.delete(
    await getExternalApiUrl("/experiments/:experimentId/researchers"),
    async ({ params, request }) => {
      const { experimentId } = params;
      const experiment = mockExperiments.find((e) => e.id === experimentId);

      if (!experiment) {
        return new HttpResponse(null, {
          status: 404,
          statusText: "Experiment not found",
        });
      }

      const { id } = (await request.json()) as { id: string };

      console.log(
        `Received request to delete researcher with id: ${id} from the experiment`
      );
      return new HttpResponse(null, { status: 200 });
    }
  ),
];
