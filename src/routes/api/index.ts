import { Router } from 'express';

// Controllers
import { ImageController } from '@controller/image.controller';

const router = Router();
const imageController = new ImageController();

router.post('/upload', imageController.upload);

export { router };
