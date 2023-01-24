import { Request, Response, NextFunction } from 'express';
import { Image, ImageDocument } from '@src/image/interfaces/image.interface';
import { HttpStatusCode } from '@src/common/enums/HttpStatusCode';
import { HttpException } from '@src/common/utils/HttpException';

interface Service {
	create(image: Image): Promise<ImageDocument>;
}

class ImageController {
	constructor(private service: Service) {}

	create = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const {
				file,
				body: { description },
			} = req;

			if (!file)
				throw new HttpException(
					HttpStatusCode.BAD_REQUEST,
					'Unable to upload file'
				);

			const { originalname: name, filename: key, size } = file;

			const response = await this.service.create({
				name,
				description: description ?? '',
				url: '',
				size,
				key,
			});

			res
				.status(HttpStatusCode.CREATED)
				.send({ statusCode: HttpStatusCode.CREATED, response });
		} catch (e) {
			next(e);
		}
	};
}

export { ImageController };
