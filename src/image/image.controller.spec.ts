import { ImageController } from '@image/image.controller';
import { Image } from '@image/interfaces/image.interface';
import { jest } from '@jest/globals';
import { HttpStatusCode } from '@src/common/enums/HttpStatusCode';
import { NextFunction, Request, Response } from 'express';
import { HttpException } from '@src/common/utils/HttpException';
import { default as data } from '@src/test/data/images.json';

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
	findOne: jest.fn((id: string): Promise<any> => {
		const image = data.find(image => image._id === id);
		if (!image)
			throw new HttpException({
				statusCode: HttpStatusCode.NOT_FOUND,
				message: `Image ${id} not found`,
			});

		return Promise.resolve(image);
	}),
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
	params: {},
} as Request;

const mockResponse = () => {
	let res = {} as unknown as Response;

	res.status = jest.fn(() => res);
	res.send = jest.fn(() => res);

	return res;
};

const mockNextFunction: NextFunction = jest.fn();

describe('ImageController', () => {
	let controller: any;
	let res: Response;

	beforeEach(() => {
		controller = new ImageController(mockService);
		res = mockResponse();
	});

	describe('create', () => {
		const image = {
			name: 'test.png',
			description: 'Description of image',
			url: '',
			size: 11189,
			key: '724bccb7e54e8aca0e86a5d62f8ae79a-test.png',
		};

		it('should return an image if the file exists in the request', async () => {
			const response = await controller.create(
				mockRequest,
				res,
				mockNextFunction
			);

			expect(response).toBeDefined();
			expect(res.status).toHaveBeenCalledWith(HttpStatusCode.CREATED);
			expect(mockService.create).toHaveBeenCalledWith(image);
			expect(res.send).toHaveBeenCalledWith({
				statusCode: HttpStatusCode.CREATED,
				response: {
					...image,
					_id: '63cfde53c12118dcd67b654d',
					url: 'http://localhost:4700/img/724bccb7e54e8aca0e86a5d62f8ae79a-test.png',
					createdAt: '2023-01-24T13:25:19.609Z',
				},
			});
		});

		it('should return an error message if the file is undefined', async () => {
			const response = controller.create(
				{ ...mockRequest, file: undefined },
				res,
				mockNextFunction
			);

			expect(response).toBeDefined();
			expect(res.status).not.toHaveBeenCalled();
			expect(res.send).not.toHaveBeenCalled();
			expect(mockNextFunction).toHaveBeenCalledWith(
				new HttpException({
					statusCode: HttpStatusCode.BAD_REQUEST,
					message: 'Unable to upload file',
				})
			);
		});

		it('should set an empty description if the description in the body is undefined', async () => {
			const response = await controller.create(
				{ ...mockRequest, body: {} },
				res,
				mockNextFunction
			);

			expect(response).toBeDefined();
			expect(mockService.create).toHaveBeenCalledWith({
				...image,
				description: '',
			});
			expect(res.status).toHaveBeenCalledWith(HttpStatusCode.CREATED);
			expect(res.send).toHaveBeenCalledWith({
				statusCode: HttpStatusCode.CREATED,
				response: {
					...image,
					description: '',
					_id: '63cfde53c12118dcd67b654d',
					url: 'http://localhost:4700/img/724bccb7e54e8aca0e86a5d62f8ae79a-test.png',
					createdAt: '2023-01-24T13:25:19.609Z',
				},
			});
		});
	});

	describe('findOne', () => {
		let id = '63d089bdcd33c453c10568f4';
		it('should return image if image exists', async () => {
			const image = data.find(image => image._id === id);
			const response = await controller.findOne(
				{ ...mockRequest, params: { id } },
				res,
				mockNextFunction
			);

			expect(response).toBeDefined();
			expect(res.status).toHaveBeenCalledWith(HttpStatusCode.OK);
			expect(res.send).toHaveBeenCalledWith({
				statusCode: HttpStatusCode.OK,
				response: image,
			});
		});

		it('should return a "not found" error message if the image does not exist', async () => {
			id = '63d089bdcd33c453c10567r5';

			const response = await controller.findOne(
				{ ...mockRequest, params: { id } },
				res,
				mockNextFunction
			);

			expect(response).not.toBeDefined();
			expect(res.status).not.toHaveBeenCalled();
			expect(res.send).not.toHaveBeenCalled();
			expect(mockNextFunction).toHaveBeenCalledWith(
				new HttpException({
					statusCode: HttpStatusCode.NOT_FOUND,
					message: `Image ${id} not found`,
				})
			);
		});
	});
});
