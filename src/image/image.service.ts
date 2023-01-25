import { Image, ImageDocument } from '@image/interfaces/image.interface';
import { HttpException } from '@src/common/utils/HttpException';
import { HttpStatusCode } from '@src/common/enums/HttpStatusCode';
import { Repository } from '@image/interfaces/imageRepository.interface';

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
}
