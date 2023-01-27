import { Image, ImageDocument } from '@image/interfaces/image.interface';
import { DeleteResult } from 'mongodb';

export interface Repository {
	create(image: Image): Promise<ImageDocument>;
	findOne(id: string): Promise<ImageDocument | null>;
	delete(id: string): Promise<DeleteResult>;
}
