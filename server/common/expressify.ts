import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express, { Application } from 'express';
import path from 'path';
import swaggerify from './swagger';

/**
 * Function to expressify the app
 * @param app Application
 * @param routes Routes
 */
export function Expressify(app: Application, routes: any): Application {
  const root = path.normalize(__dirname + '/../..');
  app.set('appPath', root + 'client');
  app.use(bodyParser.json({ limit: process.env.REQUEST_LIMIT || '100kb' }));
  app.use(bodyParser.urlencoded({ extended: true, limit: process.env.REQUEST_LIMIT || '100kb' }));
  app.use(cookieParser(process.env.SESSION_SECRET));
  app.use(express.static(`${root}/public`));
  app.use('/files', express.static(`${root}/files`));
  swaggerify(app, routes);
  return app;
}

export default Expressify;
