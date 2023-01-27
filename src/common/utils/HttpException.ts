import { HttpStatusCode } from '@src/common/enums/HttpStatusCode';

export interface HttpError {
	name?: string;
	message?: string;
	statusCode?: number;
}

export class HttpException extends Error {
	public statusCode: number;

	constructor({ statusCode, message }: HttpError) {
		super(message);
		Error.captureStackTrace(this, this.constructor);

		this.name = this.constructor.name;
		this.statusCode = statusCode ?? HttpStatusCode.INTERNAL_SERVER;
	}
}
