import { config } from '@config/multer';
import multer from 'multer';

export const upload = multer(config);
