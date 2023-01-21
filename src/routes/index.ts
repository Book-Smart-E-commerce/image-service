import { Router } from 'express';
import { router as api } from '@src/routes/api';

const router = Router();

router.use('/api/image', api);

export { router };
