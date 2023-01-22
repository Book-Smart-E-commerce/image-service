import { Express } from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';

export const appMiddleware = (app: Express): void => {
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(morgan('dev'));
};
