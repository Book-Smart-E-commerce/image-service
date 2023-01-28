import { app } from '@src/app';
import dotenv from 'dotenv';
import { Express } from 'express';
import { MongoDb } from '@src/database';
import 'reflect-metadata';

dotenv.config();

interface DataBase {
	connect(): Promise<void>;
}

export class Server {
	constructor(private app: Express, private db: DataBase) {}

	start() {
		try {
			const PORT = process.env['PORT'] ?? 4700;

			this.app.listen(PORT, () => console.log(`Listening in ${PORT}`));

			this.db.connect();
		} catch ({ message }) {
			console.error(message);
		}
	}
}

const server = new Server(app, new MongoDb());

server.start();
