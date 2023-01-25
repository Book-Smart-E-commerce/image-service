import { Router } from 'express';

// middleware
import { upload } from '@middleware/multer';

// Controllers
import { imageController } from '@src/image';

const router = Router();

router.post('/', upload.single('file'), imageController.create);
router.get('/:id', imageController.findOne);

export { router };
