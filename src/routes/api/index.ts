import { Router } from 'express';

// DTOS
import { ParamsDto } from '@src/common/dtos/params.dto';
import { UpdateImageDto } from '@image/dtos/updateImage.dto';
import { SearchDto } from '@image/dtos/search.dto';

// middleware
import { validate } from '@middleware/validate';
import { upload } from '@middleware/multer';

// Controllers
import { imageController } from '@src/image';

const router = Router();

const validateParams = validate('params');
const validateQuery = validate('query');
const validateBody = validate('body');

router.post('/', upload.single('file'), imageController.create);
router.get('/:id', validateParams(ParamsDto), imageController.findOne);
router.get('/', validateQuery(SearchDto), imageController.find);
router.delete('/:id', validateParams(ParamsDto), imageController.delete);
router.patch(
	'/:id',
	validateParams(ParamsDto),
	validateBody(UpdateImageDto),
	imageController.update
);

export { router };
