import { Application } from 'express';
import examplesRouter from './api/controllers/examples/router'
import mediaRouter from './api/controllers/media/router'
export default function routes(app: Application): void {
  app.use('/api/v1/examples', examplesRouter);
  app.use('/media', mediaRouter);
};