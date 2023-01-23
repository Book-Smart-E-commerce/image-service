import { Request, Response, NextFunction } from 'express';
import { Image, ImageDocument } from '@src/image/interfaces/image.interface';
import { HttpStatusCode } from '@src/common/enums/HttpStatusCode';
import { HttpCustomError } from '@src/common/utils/httpError';

interface Service {
	create(image: Image): Promise<ImageDocument>;
}

class ImageController {
	constructor(private service: Service) {}

	create = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { file } = req;

			if (file) {
				const { originalname: name, filename: key, size } = file;

				const response = await this.service.create({
					name,
					url: '',
					size,
					key,
				});

				res
					.status(HttpStatusCode.CREATED)
					.send({ statusCode: HttpStatusCode.CREATED, response });
			}

			throw new HttpCustomError(
				HttpStatusCode.BAD_REQUEST,
				'Unable to upload file'
			);
		} catch (e) {
			next(e);
		}
	};
}

export { ImageController };
