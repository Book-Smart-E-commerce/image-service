import { Image, ImageDocument } from '@image/interfaces/image.interface';
import { DeleteResult, UpdateResult } from 'mongodb';
import { FilterQuery } from 'mongoose';
import { UpdateImageDto } from '@image/dtos/updateImage.dto';

export interface searchOptions {
	/**
	 * Filter Query to include in match pipeline Stage
	 */
	match: FilterQuery<any>;
	/**
	 * specifies the field(s) to sort and their sort order
	 */
	sort: {
		[key: string]: any;
	};
	/**
	 * takes a positive number that specifies the maximum number of images
	 */
	limit: number;
	/**
	 * takes a positive number that specifies the maximum number of images to skip
	 */
	skip: number;
}

export interface Repository {
	/**
	 * Create an image
	 * @param image Image file information
	 * @return The created image document
	 */
	create(image: Image): Promise<ImageDocument>;

	/**
	 * Find One Image
	 * @param id The unique id of the image
	 * @return The image found
	 */
	findOne(id: string): Promise<ImageDocument | null>;

	/**
	 * Find images
	 *
	 * @example
	 * `find({
	 * 	match:{ $text: { $search: "" },
	 *		sort: { name: -1 },
	 *		skip: 10,
	 *		limit: 10
	 *	})`
	 *
	 * @param  filter Filter Query of MongoDb
	 * @param filter.match Filter Query to include in match pipeline Stage
	 * @param filter.sort specifies the field(s) to sort and their sort order
	 * @param filter.limit takes a positive number that specifies the maximum number of images
	 * @param filter.skip takes a positive number that specifies the maximum number of images to skip
	 * @return The images found
	 */
	find(filter: searchOptions): Promise<Array<ImageDocument>>;

	/**
	 * Delete an image
	 * @param id  The unique id of the image
	 * @return The delete Result
	 */
	delete(id: string): Promise<DeleteResult>;

	/**
	 * Update an image
	 * @param id  The unique id of the image
	 * @param input - image data
	 * @param input.name - The name of the image
	 * @param input.description - The description of the image
	 * @return The Update Result
	 */
	update(id: string, input: UpdateImageDto): Promise<UpdateResult>;
}
