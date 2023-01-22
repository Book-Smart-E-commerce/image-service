export interface HttpError {
	message?: string;
	statusCode?: number;
}

export class HttpCustomError extends Error {
	public statusCode: number;

	constructor(statusCode: number, message: string) {
		super(message);
		Error.captureStackTrace(this, this.constructor);

		this.name = this.constructor.name;
		this.statusCode = statusCode;
	}
}
