import { Image, ImageDocument } from '@image/interfaces/image.interface';

export interface Service {
	create(image: Image): Promise<ImageDocument>;
	findOne(id: string): Promise<ImageDocument>;
}
