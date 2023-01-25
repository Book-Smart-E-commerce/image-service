import { ImageController } from '@image/image.controller';
import { Image } from '@image/interfaces/image.interface';
import { jest } from '@jest/globals';
import { HttpStatusCode } from '@src/common/enums/HttpStatusCode';
import { NextFunction, Request, Response } from 'express';

const mockService = {
	create: jest.fn(
		(image: Image): Promise<any> =>
			Promise.resolve({
				...image,
				_id: '63cfde53c12118dcd67b654d',
				url: `http://localhost:4700/img/${image.key}`,
				createdAt: '2023-01-24T13:25:19.609Z',
			})
	),
};

const mockRequest = {
	file: {
		fieldname: 'file',
		originalname: 'test.png',
		encoding: '7bit',
		mimetype: 'image/png',
		destination: 'rootdir//tcc//image-service//tmp//uploads',
		filename: '724bccb7e54e8aca0e86a5d62f8ae79a-test.png',
		path: 'rootdir//tcc//image-service//tmp//uploads//724bccb7e54e8aca0e86a5d62f8ae79a-test.png',
		size: 11189,
	},
	body: {
		description: 'Description of image',
	},
} as Request;

const mockResponse = () => {
	let res = {} as unknown as Response;

	res.status = jest.fn(() => res);
	res.send = jest.fn(() => res);

	return res;
};

const mockNextFunction: NextFunction = () => {};

describe('ImageController', () => {
	let controller: any;
	let res: Response;

	beforeEach(() => {
		controller = new ImageController(mockService);
		res = mockResponse();
	});

	describe('create', () => {
		it('should return an image if the file exists in the request', async () => {
			const response = await controller.create(
				mockRequest,
				res,
				mockNextFunction
			);

			expect(response).toBeDefined();
			expect(res.status).toHaveBeenCalledWith(HttpStatusCode.CREATED);
			expect(mockService.create).toHaveBeenCalledWith({
				name: 'test.png',
				description: 'Description of image',
				url: '',
				size: 11189,
				key: '724bccb7e54e8aca0e86a5d62f8ae79a-test.png',
			});
			expect(res.send).toHaveBeenCalledWith({
				statusCode: HttpStatusCode.CREATED,
				response: {
					_id: '63cfde53c12118dcd67b654d',
					name: 'test.png',
					description: 'Description of image',
					size: 11189,
					key: '724bccb7e54e8aca0e86a5d62f8ae79a-test.png',
					url: 'http://localhost:4700/img/724bccb7e54e8aca0e86a5d62f8ae79a-test.png',
					createdAt: '2023-01-24T13:25:19.609Z',
				},
			});
		});
	});
});
