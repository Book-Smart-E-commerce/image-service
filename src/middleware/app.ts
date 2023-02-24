import express, { Express } from 'express';
import morgan from 'morgan';
import path from 'path';
import cors from 'cors';

const UPLOAD_PATH = path.join(__dirname, '..', '..', 'tmp', 'uploads');

export const appMiddleware = (app: Express): void => {
	app.use(express.json());
	app.use(cors());
	app.use(express.urlencoded({ extended: true }));
	app.use(morgan('dev'));
	app.use('/img', express.static(UPLOAD_PATH));
};
