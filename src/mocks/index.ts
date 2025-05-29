
import { setupServer } from 'msw/node'

import { experimentsHandlers } from './handlers/experiments';
import { authHandlers } from './handlers/auth';
import { emailsHandlers } from './handlers/emails';

export const handlers = [
    ...emailsHandlers,
    ...authHandlers,
    ...experimentsHandlers,
]

export const server = setupServer(...handlers)