import express from 'express';
import { appMiddleware } from '@middleware/app';
import { router } from '@src/routes';

const app = express();

appMiddleware(app);
app.use(router);

export { app };
