import { NextFunction, Request, Response } from 'express';
import { jest } from '@jest/globals';

export const mockRequest = {
	file: {
		fieldname: 'file',
		originalname: 'test.png',
		encoding: '7bit',
		mimetype: 'image/png',
		destination: 'rootdir//tcc//image-service//tmp//uploads',
		filename: '724bccb7e54e8aca0e86a5d62f8ae79a-test.png',
		path: 'rootdir//tcc//image-service//tmp//uploads//724bccb7e54e8aca0e86a5d62f8ae79a-test.png',
		size: 11189,
	},
	body: {
		description: 'Description of image',
	},
	params: {},
} as Request;

export const mockResponse = () => {
	let res = {} as unknown as Response;

	res.status = jest.fn(() => res);
	res.send = jest.fn(() => res);

	return res;
};

export const mockNextFunction: NextFunction = jest.fn();
