import { destination } from '@config/multer';
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

describe('destination', () => {
	it('should called the callback function', () => {
		destination(request, file, mockCallback);

		expect(mockCallback).toHaveBeenCalledWith(null, mockPath);
		expect(mockCallback).toBeCalledTimes(1);
	});
});
