import * as validator from 'class-validator';
import { jest } from '@jest/globals';
import { validate } from '@middleware/validate';
import { ParamsDto } from '@src/common/dtos/params.dto';
import {
	mockNextFunction,
	mockRequest,
	mockResponse,
} from '@test/utils/httpMock.utils';
import 'reflect-metadata';
import { HttpException } from '@src/common/utils/HttpException';
import { HttpStatusCode } from '@src/common/enums/HttpStatusCode.enum';

jest.mock('validator');

describe('validate', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('should return an error message if "target" is not valid', async () => {
		jest.spyOn(validator, 'validateOrReject').mockResolvedValue();

		//@ts-ignore
		const isValid = await validate('test')(ParamsDto)(
			mockRequest,
			mockResponse(),
			mockNextFunction
		);

		expect(isValid).not.toBeDefined();
		expect(mockNextFunction).toBeCalledTimes(1);
		expect(mockNextFunction).toHaveBeenCalledWith(
			new Error('Target validation is not valid')
		);
		expect(validator.validateOrReject).toBeCalledTimes(0);
		expect(validator.validateOrReject).not.toHaveBeenCalled();
	});

	it('should return an Http error message if validation rejected', async () => {
		const id = '1';
		jest.spyOn(validator, 'validateOrReject').mockImplementation(() => {
			throw new validator.ValidationError();
		});
		const isValid = await validate('params')(ParamsDto)(
			{ ...mockRequest, params: { id } } as any,
			mockResponse(),
			mockNextFunction
		);

		expect(isValid).not.toBeDefined();
		expect(mockNextFunction).toBeCalledTimes(1);
		expect(mockNextFunction).toHaveBeenCalledWith(
			new HttpException({
				statusCode: HttpStatusCode.BAD_REQUEST,
				message: '',
			})
		);
		expect(validator.validateOrReject).toBeCalledTimes(1);
		expect(validator.validateOrReject).toHaveBeenCalledWith({ id });
	});
});
