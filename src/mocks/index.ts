import { setupServer } from "msw/node";

import { experimentsHandlers } from "./handlers/experiments";
import { authHandlers } from "./handlers/auth";
import { emailsHandlers } from "./handlers/emails";
import { researcherHandlers } from "./handlers/researchers";

export const handlers = [
  ...emailsHandlers,
  ...authHandlers,
  ...experimentsHandlers,
  ...researcherHandlers,
];

export const server = setupServer(...handlers);
