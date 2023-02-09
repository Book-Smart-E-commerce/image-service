import { Image, ImageDocument } from '@image/interfaces/image.interface';
import { Model } from 'mongoose';
import { DeleteResult, UpdateResult } from 'mongodb';
import { searchOptions } from '@image/interfaces/imageRepository.interface';
import { UpdateImageDto } from '@image/dtos/updateImage.dto';

export class ImageRepository {
	constructor(private model: Model<ImageDocument>) {}

	/**
	 * Create an image
	 * @param image Image file information
	 * @return The created image document
	 */
	create = (image: Image): Promise<ImageDocument> => {
		return new this.model(image).save();
	};

	/**
	 * Find One Image
	 * @param id The unique id of the image
	 * @return The image found
	 */
	findOne = (id: string): Promise<ImageDocument | null> => {
		return this.model.findOne({ _id: id }).exec();
	};

	/**
	 * Delete an image
	 * @param id  The unique id of the image
	 * @return The delete Result
	 */
	delete = (id: string): Promise<DeleteResult> => {
		return this.model.deleteOne({ _id: id }).exec();
	};

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
	find = ({
		match,
		sort,
		limit,
		skip,
	}: searchOptions): Promise<Array<ImageDocument>> => {
		return this.model
			.aggregate([
				{ $match: match },
				{ $sort: sort },
				{ $skip: skip },
				{ $limit: limit },
			])
			.exec();
	};

	/**
	 * Update an image
	 * @param id  The unique id of the image
	 * @param input - image data
	 * @param input.name - The name of the image
	 * @param input.description - The description of the image
	 * @return The Update Result
	 */
	update = (
		id: string,
		{ name, description }: UpdateImageDto
	): Promise<UpdateResult> => {
		return this.model
			.updateOne(
				{ _id: id },
				{ $set: { name: name, description: description } }
			)
			.exec();
	};
}
