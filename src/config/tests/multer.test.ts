import { destination, fileFilter } from '@config/multer';
import { jest } from '@jest/globals';
import path from 'path';

const file = {
	fieldname: 'file',
	originalname: 'test.png',
	encoding: '7bit',
	mimetype: 'image/png',
};
const mockPath = path.join(__dirname, '..', '..', '..', 'tmp', 'uploads');
const mockCallback = jest.fn();
const request: any = {};

describe('multer', () => {
	beforeEach(() => {
		mockCallback.mockClear();
	});

	describe('destination', () => {
		it('should called the callback function', () => {
			destination(request, file, mockCallback);

			expect(mockCallback).toHaveBeenCalledWith(null, mockPath);
			expect(mockCallback).toBeCalledTimes(1);
		});
	});

	describe('fileFilter', () => {
		it('should called the callback function with error, when mimetype is invalid', () => {
			fileFilter(request, { ...file, mimetype: 'image/gif' }, mockCallback);

			expect(mockCallback).toHaveBeenCalledWith(new Error('Invalid file type'));
			expect(mockCallback).toBeCalledTimes(1);
		});

		it('should called the callback function without error, if mimetype is valid', () => {
			fileFilter(request, file, mockCallback);

			expect(mockCallback).toHaveBeenCalledWith(null, true);
			expect(mockCallback).toBeCalledTimes(1);
		});
	});
});
