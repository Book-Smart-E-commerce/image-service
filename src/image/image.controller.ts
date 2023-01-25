import { Request, Response, NextFunction } from 'express';
import { HttpStatusCode } from '@src/common/enums/HttpStatusCode';
import { HttpException } from '@src/common/utils/HttpException';
import { Service } from '@image/interfaces/imageService.interface';

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

			return res
				.status(HttpStatusCode.CREATED)
				.send({ statusCode: HttpStatusCode.CREATED, response });
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
				.send({ statusCode: HttpStatusCode.OK, response });
		} catch (e) {
			next(e);
		}
	};
}

export { ImageController };
