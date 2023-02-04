import { Request, Response, NextFunction } from 'express';
import { HttpStatusCode } from '@src/common/enums/HttpStatusCode';
import { HttpException } from '@src/common/utils/HttpException';
import { Service } from '@image/interfaces/imageService.interface';
import { SortEnum } from '@src/common/enums/sort.enum';
import { SearchDto } from '@image/dtos/search.dto';

class ImageController {
	constructor(private service: Service) {}

	create = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const {
				file,
				body: { description },
			} = req;

			if (!file)
				throw new HttpException({
					statusCode: HttpStatusCode.BAD_REQUEST,
					message: 'Unable to upload file',
				});

			const { originalname: name, filename: key, size } = file;

			const response = await this.service.create({
				name,
				description: description ?? '',
				url: '',
				size,
				key,
			});

			return res.status(HttpStatusCode.CREATED).send({
				statusCode: HttpStatusCode.CREATED,
				error: null,
				data: response,
			});
		} catch (e) {
			next(e);
		}
	};

	findOne = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const {
				params: { id },
			} = req;

			const response = await this.service.findOne(id);

			return res
				.status(HttpStatusCode.OK)
				.send({ statusCode: HttpStatusCode.OK, error: null, data: response });
		} catch (e) {
			next(e);
		}
	};

	delete = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const {
				params: { id },
			} = req;

			const response = await this.service.delete(id);

			return res
				.status(HttpStatusCode.OK)
				.send({ statusCode: HttpStatusCode.OK, error: null, data: response });
		} catch (e) {
			next(e);
		}
	};

	update = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const {
				params: { id },
				body: { name, description },
			} = req;

			const response = await this.service.update(id, { name, description });

			return res
				.status(HttpStatusCode.OK)
				.send({ statusCode: HttpStatusCode.OK, error: null, data: response });
		} catch (e) {
			next(e);
		}
	};

	find = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const {
				search,
				page,
				limit,
				orderBy,
				sortOrder,
				endDate,
				startDate,
				ids,
				keys,
			} = req.query as SearchDto;

			const response = await this.service.find({
				ids,
				keys,
				search: search ?? '',
				endDate,
				startDate,
				page: page || 0,
				limit: limit || 10,
				orderBy: orderBy ?? 'name',
				sortOrder: sortOrder || SortEnum.ASC,
			});

			return res.status(HttpStatusCode.OK).send({
				statusCode: HttpStatusCode.OK,
				error: null,
				data: response,
			});
		} catch (e) {
			next(e);
		}
	};
}

export { ImageController };
