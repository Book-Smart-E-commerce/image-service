import { NextFunction, Request, Response } from 'express';
import { HttpError } from '@src/common/utils/HttpException';
import { HttpStatusCode } from '@src/common/enums/HttpStatusCode';

export const errorHandler = (
	err: HttpError,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const errorName = err.name ?? 'HttpExecption';
	const statusCode = err.statusCode ?? HttpStatusCode.INTERNAL_SERVER;
	const message = err.message ?? 'Something went wrong';

	return res
		.status(statusCode)
		.send({
			statusCode,
			error: { statusCode, error: errorName, message },
			response: null,
		});
};
