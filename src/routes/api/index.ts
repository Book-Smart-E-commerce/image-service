import { Router } from 'express';

// middleware
import { upload } from '@middleware/multer';

// Controllers
import { ImageController } from '@controller/image.controller';

const router = Router();
const imageController = new ImageController();

router.post('/upload', upload.single('file'), imageController.upload);

export { router };
