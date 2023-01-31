import { ImageService } from '@image/image.service';
import { jest } from '@jest/globals';
import { Image } from '@image/interfaces/image.interface';
import { default as data } from '@test/data/images.json';
import { HttpException } from '@src/common/utils/HttpException';
import { HttpStatusCode } from '@src/common/enums/HttpStatusCode';
import { Service } from '@image/interfaces/imageService.interface';

const mockRepository = {
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
		return Promise.resolve(data.find(image => image._id === id));
	}),
	update: jest.fn((id: string, image: Image): Promise<any> => {
		return Promise.resolve(image);
	}),
	find: jest.fn((): Promise<any> => Promise.resolve([])),
	delete: jest.fn(
		(id: string): Promise<any> => Promise.resolve(data.find(e => e._id === id))
	),
};

describe('ImageService', () => {
	let service: Service;

	beforeEach(() => {
		service = new ImageService(mockRepository);
	});

	describe('create', () => {
		const input = {
			name: 'test2.png',
			description: 'test2 de descrição',
			size: 11189,
			key: 'e2745bc44f43d4c3f0ac157cf808f900-test2.png',
			url: '',
		};

		it('should return the created image', async () => {
			const response = await service.create(input);

			expect(response).toBeDefined();
			expect(response).toMatchObject({
				...input,
				_id: '63cfde53c12118dcd67b654d',
				url: `http://localhost:4700/img/e2745bc44f43d4c3f0ac157cf808f900-test2.png`,
				createdAt: '2023-01-24T13:25:19.609Z',
			});
			expect(mockRepository.create).toBeCalledTimes(1);
			expect(mockRepository.create).toBeCalledWith(input);
		});
	});

	describe('findOne', () => {
		let id = '63d089bdcd33c453c10568f4';

		it('should return image if image exists', async () => {
			const image = data.find(image => image._id === id) ?? {};
			const response = await service.findOne(id);

			expect(response).toBeDefined();
			expect(response).toMatchObject(image);
			expect(mockRepository.findOne).toBeCalledTimes(1);
			expect(mockRepository.findOne).toHaveBeenCalledWith(id);
		});

		it('should return a "not found" error message if the image does not exist', async () => {
			id = '63d089bdcd33c453c10564j1';
			await expect(service.findOne(id)).rejects.toThrow(
				new HttpException({
					statusCode: HttpStatusCode.NOT_FOUND,
					message: `Image ${id} not found`,
				})
			);
		});
	});

	describe('update', () => {
		let id = '63d089bdcd33c453c10568f4';
		let input = { name: 'updated Image', description: 'updated Image' };
		it('should return a "not found" error message if the image does not exist', async () => {
			id = '63d089bdcd33c453c10564j1';

			await expect(service.update(id, input)).rejects.toThrow(
				new HttpException({
					statusCode: HttpStatusCode.NOT_FOUND,
					message: `Image ${id} not found`,
				})
			);
		});
	});
});
