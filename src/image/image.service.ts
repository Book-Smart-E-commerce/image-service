import { Image, ImageDocument } from '@image/interfaces/image.interface';
import { HttpException } from '@src/common/utils/HttpException';
import { HttpStatusCode } from '@src/common/enums/HttpStatusCode';
import { Repository } from '@image/interfaces/imageRepository.interface';
import { promisify } from 'util';
import { unlink } from 'fs';
import path from 'path';

export class ImageService {
	constructor(private repository: Repository) {}

	create = (image: Image): Promise<ImageDocument> => {
		return this.repository.create(image);
	};

	findOne = async (id: string) => {
		const image = await this.repository.findOne(id);

		if (!image) {
			throw new HttpException({
				statusCode: HttpStatusCode.NOT_FOUND,
				message: `Image ${id} not found`,
			});
		}

		return image;
	};

	delete = async (id: string): Promise<ImageDocument> => {
		const image = await this.findOne(id);

		const { deletedCount } = await this.repository.delete(id);

		if (deletedCount > 0) {
			await promisify(unlink)(
				path.join(__dirname, '..', '..', 'tmp', 'uploads', image.key)
			);
		}

		return image;
	};
}
