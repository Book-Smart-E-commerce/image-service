import { Router } from 'express';
import { ParamsDto } from '@src/common/dtos/params.dto';

// middleware
import { validateRequest } from '@middleware/validate';
import { upload } from '@middleware/multer';

// Controllers
import { imageController } from '@src/image';

const router = Router();

const validateParams = validateRequest({ paramsDTO: ParamsDto });

router.post('/', upload.single('file'), imageController.create);
router.get('/:id', validateParams, imageController.findOne);
router.delete('/:id', validateParams, imageController.delete);

export { router };
