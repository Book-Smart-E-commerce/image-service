import { Image, ImageDocument } from '@image/interfaces/image.interface';

interface Repository {
	create(image: Image): Promise<ImageDocument>;
}

export class ImageService {
	constructor(private repository: Repository) {}

	create = (image: Image): Promise<ImageDocument> => {
		return this.repository.create(image);
	};
}
