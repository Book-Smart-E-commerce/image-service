import path from 'path';
import { Request } from 'express';
import crypto from 'crypto';
import { UploadFile } from '@interfaces/UploadFile';
import multer from 'multer';

const storagePath = path.join(__dirname, '..', '..', 'tmp', 'uploads');

/**
 * Function to indicate the folder where the file was saved
 * @param req
 * @param file
 * @param cb
 */
export const destination = (req: Request, file: UploadFile, cb: Function) =>
	cb(null, storagePath);

/**
 * Function to format the file name
 * @param req
 * @param originalname
 * @param cb
 */
export const filename = async (
	req: Request,
	{ originalname }: UploadFile,
	cb: Function
) => {
	try {
		const randomBytes = await crypto.randomBytes(16);
		const fileName = `${randomBytes.toString('hex')}-${originalname}`;

		cb(null, fileName);
	} catch (e) {
		cb(e);
	}
};

/**
 * Function to control which files are accepted
 * @param req
 * @param mimetype
 * @param cb
 */
export const fileFilter = (
	req: Request,
	{ mimetype }: UploadFile,
	cb: Function
) => {
	const allowedTypes = ['image/png', 'image/jpeg'];

	if (allowedTypes.includes(mimetype)) {
		cb(null, true);
	} else {
		cb(new Error('Invalid file type'));
	}
};

/**
 * Multer config
 */
export const config = {
	dest: storagePath,
	storage: multer.diskStorage({
		destination,
		filename,
	}),
	fileFilter,
};
