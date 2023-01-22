import express, { Express } from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import path from 'path';

const UPLOAD_PATH = path.join(__dirname, '..', '..', 'tmp', 'uploads');

export const appMiddleware = (app: Express): void => {
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(morgan('dev'));
	app.use('/img', express.static(UPLOAD_PATH));
};
