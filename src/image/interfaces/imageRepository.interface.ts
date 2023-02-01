import { Image, ImageDocument } from '@image/interfaces/image.interface';
import { DeleteResult, UpdateResult } from 'mongodb';
import { FilterQuery } from 'mongoose';
import { UpdateImageDto } from '@image/dtos/updateImage.dto';

export interface searchOptions {
	match: FilterQuery<any>;
	sort: {
		[key: string]: any;
	};
	limit: number;
	skip: number;
}

export interface Repository {
	create(image: Image): Promise<ImageDocument>;
	findOne(id: string): Promise<ImageDocument | null>;
	find(filter: searchOptions): Promise<Array<ImageDocument>>;
	delete(id: string): Promise<DeleteResult>;
	update(id: string, input: UpdateImageDto): Promise<UpdateResult>;
}
