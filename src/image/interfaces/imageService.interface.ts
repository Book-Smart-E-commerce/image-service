import { Image, ImageDocument } from '@image/interfaces/image.interface';
import { Search } from '@image/interfaces/search.interface';
import { UpdateImageDto } from '@image/dtos/updateImage.dto';

export interface Service {
	create(image: Image): Promise<ImageDocument>;
	findOne(id: string): Promise<ImageDocument>;
	find(search: Search): Promise<Array<ImageDocument>>;
	delete(id: string): Promise<ImageDocument>;
	update(id: string, image: UpdateImageDto): Promise<ImageDocument>;
}
