import { NextFunction, Request, Response } from 'express';
import { HttpError } from '@src/common/utils/httpError';
import { HttpStatusCode } from '@src/common/enums/HttpStatusCode';

export const errorHandler = (
	err: HttpError,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const statusCode = err.statusCode ?? HttpStatusCode.INTERNAL_SERVER;
	const message = err.message ?? 'Something went wrong';

	return res.status(statusCode).send({ statusCode, error: message });
};
