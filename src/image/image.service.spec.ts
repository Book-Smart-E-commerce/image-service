import { ImageService } from '@image/image.service';
import { jest } from '@jest/globals';
import { Image } from '@image/interfaces/image.interface';
import { default as data } from '@test/data/images.json';

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
};

describe('ImageService', () => {
	let service: any;

	beforeEach(() => {
		service = new ImageService(mockRepository);
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
	});
});
