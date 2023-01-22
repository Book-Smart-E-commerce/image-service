import { Request, Response } from 'express';

class ImageController {
	constructor() {}

	create(req: Request, res: Response) {
		try {
			return res.status(201).send({ statusCode: 201, response: 'hello' });
		} catch ({ message }) {
			res.status(500).send({ statusCode: 500, error: message });
		}
	}
}

export { ImageController };
