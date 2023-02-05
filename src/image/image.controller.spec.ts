import { ImageController } from '@image/image.controller';
import { Image } from '@image/interfaces/image.interface';
import { jest } from '@jest/globals';
import { HttpStatusCode } from '@src/common/enums/HttpStatusCode.enum';
import { Response } from 'express';
import { HttpException } from '@src/common/utils/HttpException';
import { default as data } from '@src/test/data/images.json';
import {
	mockRequest,
	mockNextFunction,
	mockResponse,
} from '@test/utils/httpMock.utils';
import { UpdateImageDto } from '@image/dtos/updateImage.dto';
import { SortEnum } from '@src/common/enums/sort.enum';

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
	update: jest.fn((id: string, input: UpdateImageDto): Promise<any> => {
		const image = data.find(e => e._id === id);

		if (image) Object.assign(image, input);

		return Promise.resolve(image);
	}),
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
		jest.clearAllMocks();
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
				error: null,
				data: {
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
				error: null,
				data: {
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
				error: null,
				data: image,
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
				error: null,
				data: data[0],
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

	describe('update', () => {
		const id = '63d089bdcd33c453c10568f4';
		const body = { name: 'updated Test', description: 'updated Test' };
		it('should return the updated image', async () => {
			const response = await controller.update(
				{
					...mockRequest,
					params: { id: id },
					body: body,
				},
				res,
				mockNextFunction
			);

			expect(response).toBeDefined();
			expect(mockService.update).toBeCalledWith(id, body);
			expect(mockService.update).toBeCalledTimes(1);
			expect(res.status).toBeCalledWith(HttpStatusCode.OK);
			expect(res.send).toBeCalledWith({
				statusCode: HttpStatusCode.OK,
				error: null,
				data: { ...data[0], ...body },
			});
		});

		it('should call next function if any error occurs', async () => {
			jest.spyOn(mockService, 'update').mockImplementation(() => {
				throw new HttpException({
					statusCode: HttpStatusCode.NOT_FOUND,
					message: `Image ${id} not found`,
				});
			});

			const response = await controller.update(
				{ ...mockRequest, params: { id: id }, body: body },
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

	describe('find', () => {
		const query = {
			endDate: undefined,
			ids: undefined,
			keys: undefined,
			startDate: undefined,
		};
		let defaultSearch = {
			search: '',
			page: 0,
			limit: 10,
			orderBy: 'name',
			sortOrder: SortEnum.ASC,
		};
		it('should call "find" service with default values in page, limit, orderBy and sortBy if they are undefined', async () => {
			const response = await controller.find(
				{ ...mockRequest, query: query },
				res,
				mockNextFunction
			);

			expect(response).toBeDefined();
			expect(mockService.find).toBeCalledTimes(1);
			expect(mockService.find).toBeCalledWith({ ...defaultSearch, ...query });
			expect(res.status).toBeCalledWith(HttpStatusCode.OK);
			expect(res.send).toBeCalledWith({
				statusCode: HttpStatusCode.OK,
				error: null,
				data: [],
			});
		});

		it('should call the "find" service with the values informed in the request', async () => {
			const input = {
				page: 1,
				limit: 2,
				orderBy: 'description',
				sortOrder: SortEnum.DESC,
				search: 'image',
				endDate: '2023-01-24T13:47:05.007+00:00',
				startDate: '2023-01-20T13:47:05.007+00:00',
				keys: ['e2745bc44f43d4c3f0ac157cf808f900-teste1.png'],
				ids: ['63d089bdcd33c453c10568f4'],
			};
			const response = await controller.find(
				{ ...mockRequest, query: input },
				res,
				mockNextFunction
			);

			expect(response).toBeDefined();
			expect(mockService.find).toBeCalledWith(input);
			expect(mockService.find).toBeCalledTimes(1);
			expect(res.status).toBeCalledWith(HttpStatusCode.OK);
			expect(res.send).toBeCalledWith({
				statusCode: HttpStatusCode.OK,
				error: null,
				data: [],
			});
		});

		it('should call next function if any error occurs', async () => {
			jest
				.spyOn(mockService, 'find')
				.mockClear()
				.mockImplementation(() => {
					throw new Error('Something went wrong');
				});

			const response = await controller.find(
				{ ...mockRequest, query: {} },
				res,
				mockNextFunction
			);

			expect(response).not.toBeDefined();
			expect(mockService.find).toBeCalledTimes(1);
			expect(res.status).not.toHaveBeenCalled();
			expect(res.send).not.toHaveBeenCalled();
			expect(mockNextFunction).toHaveBeenCalledWith(
				new Error('Something went wrong')
			);
		});
	});
});
