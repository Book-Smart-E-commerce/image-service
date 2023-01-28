import { Image, ImageDocument } from '@image/interfaces/image.interface';
import { Model } from 'mongoose';
import { DeleteResult } from 'mongodb';
import { searchOptions } from '@image/interfaces/imageRepository.interface';

export class ImageRepository {
	constructor(private model: Model<ImageDocument>) {}

	create = (image: Image): Promise<ImageDocument> => {
		return new this.model(image).save();
	};

	findOne = (id: string): Promise<ImageDocument | null> => {
		return this.model.findOne({ _id: id }).exec();
	};

	delete = (id: string): Promise<DeleteResult> => {
		return this.model.deleteOne({ _id: id }).exec();
	};

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
}
