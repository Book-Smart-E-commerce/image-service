import { Image, ImageDocument } from '@image/interfaces/image.interface';
import { HttpException } from '@src/common/utils/HttpException';
import { HttpStatusCode } from '@src/common/enums/HttpStatusCode';
import { Repository } from '@image/interfaces/imageRepository.interface';
import { promisify } from 'util';
import { unlink } from 'fs';
import path from 'path';
import { Search } from '@image/interfaces/search.interface';
import { FilterQuery } from 'mongoose';

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

	delete = async (id: string): Promise<ImageDocument> => {
		const image = await this.findOne(id);

		const { deletedCount } = await this.repository.delete(id);

		if (deletedCount > 0) {
			await promisify(unlink)(
				path.join(__dirname, '..', '..', 'tmp', 'uploads', image.key)
			);
		}

		return image;
	};

	find = ({
		search,
		startDate,
		endDate,
		orderBy,
		sortOrder,
		page,
		limit,
	}: Search) => {
		let match: FilterQuery<any> = {};
		let searchDate: FilterQuery<any> = {};

		if (search) match = { ...match, $text: { $search: search } };

		if (startDate) searchDate = { ...searchDate, $gte: new Date(startDate) };

		if (endDate) searchDate = { ...searchDate, $lte: new Date(endDate) };

		if (searchDate) match = { ...match, createdAt: searchDate };

		return this.repository.find({
			match: match,
			sort: { [orderBy]: sortOrder },
			skip: page * limit,
			limit,
		});
	};
}
