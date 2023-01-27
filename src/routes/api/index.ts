import { Router } from 'express';
import { ParamsDto } from '@src/common/dtos/params.dto';

// middleware
import { validateRequest } from '@middleware/validate';
import { upload } from '@middleware/multer';

// Controllers
import { imageController } from '@src/image';

const router = Router();

router.post('/', upload.single('file'), imageController.create);
router.get(
	'/:id',
	validateRequest({ paramsDTO: ParamsDto }),
	imageController.findOne
);

export { router };
