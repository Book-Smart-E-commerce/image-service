import { connect, set, ConnectOptions } from 'mongoose';

export class MongoDb {
	async connect(): Promise<void> {
		try {
			const dbUrl = process.env['DB_URL'];

			set('strictQuery', false);
			await connect(`mongodb://${dbUrl}`, {
				useNewUrlParser: true,
			} as ConnectOptions);
		} catch ({ message }) {
			console.error(message);
		}
	}
}
