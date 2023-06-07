import express from 'express';
import { appMiddleware } from '@middleware/app';
import { router } from '@src/routes';

import { errorHandler } from '@bse-b2c/common';

const app = express();

appMiddleware(app);

app.use(router);
app.use(errorHandler);

export { app };
