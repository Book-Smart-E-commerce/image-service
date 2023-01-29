import { ImageController } from '@image/image.controller';
import { Image } from '@image/interfaces/image.interface';
import { jest } from '@jest/globals';
import { HttpStatusCode } from '@src/common/enums/HttpStatusCode';
import { Response } from 'express';
import { HttpException } from '@src/common/utils/HttpException';
import { default as data } from '@src/test/data/images.json';
import {
	mockRequest,
	mockNextFunction,
	mockResponse,
} from '@test/utils/httpMock.utils';

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
	update: jest.fn((): Promise<any> => Promise.resolve({})),
	find: jest.fn((): Promise<any> => Promise.resolve([])),
	delete: jest.fn(
		(id: string): Promise<any> => Promise.resolve(data.find(e => e._id === id))
	),
};

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

	describe('delete', () => {
		const id = '63d089bdcd33c453c10568f4';
		it('should return the deleted image', async () => {
			const response = await controller.delete(
				{ ...mockRequest, params: { id: id } },
				res,
				mockNextFunction
			);

			expect(response).toBeDefined();
			expect(mockService.delete).toBeCalledWith(id);
			expect(mockService.delete).toBeCalledTimes(1);
			expect(res.status).toBeCalledWith(HttpStatusCode.OK);
			expect(res.send).toBeCalledWith({
				statusCode: HttpStatusCode.OK,
				response: data[0],
			});
		});

		it('should call next function if any error occurs', async () => {
			jest.spyOn(mockService, 'delete').mockImplementation(() => {
				throw new HttpException({
					statusCode: HttpStatusCode.NOT_FOUND,
					message: `Image ${id} not found`,
				});
			});

			const response = await controller.delete(
				{ ...mockRequest, params: { id: id } },
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
