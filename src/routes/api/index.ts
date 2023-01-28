import { Router } from 'express';
import { ParamsDto } from '@src/common/dtos/params.dto';

// middleware
import { validate } from '@middleware/validate';
import { upload } from '@middleware/multer';

// Controllers
import { imageController } from '@src/image';

const router = Router();

//@ts-ignore
const validateParams = validate('params');

router.post('/', upload.single('file'), imageController.create);
router.get('/:id', validateParams(ParamsDto), imageController.findOne);
router.delete('/:id', validateParams(ParamsDto), imageController.delete);

export { router };
