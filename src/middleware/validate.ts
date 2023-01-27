import { validateOrReject, ValidationError } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { HttpException } from '@src/common/utils/HttpException';
import { HttpStatusCode } from '@src/common/enums/HttpStatusCode';

type ClassConstructor<T> = {
	new (...args: any[]): T;
};

interface Validate {
	paramsDTO?: ClassConstructor<any>;
	bodyDTO?: ClassConstructor<any>;
	queryDTO?: ClassConstructor<any>;
}

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

const validate = (object: any) => async (objDTO: ClassConstructor<any>) => {
	const dto = new objDTO();

	Object.assign(dto, object);

	return await validateOrReject(dto);
};

export const validateRequest =
	({ paramsDTO, bodyDTO, queryDTO }: Validate) =>
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { params, body, query } = req;

			if (paramsDTO) await validate(params)(paramsDTO);

			if (queryDTO) await validate(query)(queryDTO);

			if (bodyDTO) await validate(body)(bodyDTO);

			next();
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
