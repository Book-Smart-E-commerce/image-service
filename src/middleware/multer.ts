import { config } from '@config/multer/multer';
import multer from 'multer';

export const upload = multer(config);
