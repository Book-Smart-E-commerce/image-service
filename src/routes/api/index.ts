import { Router } from 'express';

// middleware
import { multer } from '@middleware/multer';

// Controllers
import { ImageController } from '@controller/image.controller';

const router = Router();
const imageController = new ImageController();

router.post('/upload', multer.single('file'), imageController.upload);

export { router };
