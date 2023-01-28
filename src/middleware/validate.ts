import { validateOrReject, ValidationError } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { HttpException } from '@src/common/utils/HttpException';
import { HttpStatusCode } from '@src/common/enums/HttpStatusCode';

type ClassConstructor<T> = {
	new (...args: any[]): T;
};

const getMessagesError = (err: Array<ValidationError>) => {
	let messages = [];

	for (let i = 0; i < err.length; i++) {
		const contraints = err[i]['constraints'];

		for (const key in contraints) {
			messages.push(contraints[key]);
		}
	}

	return messages;
};

type Target = 'body' | 'query' | 'params';

export const validate =
	(target: Target = 'body') =>
	(objDTO: ClassConstructor<any>) =>
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			if (req[target]) {
				const dto = new objDTO();

				Object.assign(dto, req[target]);
				await validateOrReject(dto);

				next();
			} else {
				next(new Error('Target validation is not valid'));
			}
		} catch (e) {
			next(
				new HttpException({
					statusCode: HttpStatusCode.BAD_REQUEST,
					message: getMessagesError(
						e as unknown as Array<ValidationError>
					).join(', '),
				})
			);
		}
	};
