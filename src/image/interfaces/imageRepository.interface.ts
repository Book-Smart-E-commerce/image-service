import { Image, ImageDocument } from '@image/interfaces/image.interface';

export interface Repository {
	create(image: Image): Promise<ImageDocument>;
	findOne(id: string): Promise<ImageDocument | null>;
}
