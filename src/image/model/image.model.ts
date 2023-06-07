import mongoose, { Schema } from 'mongoose';
import { ImageDocument } from '@image/interfaces/image.interface';

const ImageSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		default: '',
	},
	size: {
		type: Number,
		required: true,
	},
	key: {
		type: String,
		required: true,
	},
	url: {
		type: String,
	},
	createdAt: {
		type: Date,
		default: new Date(),
	},
});

ImageSchema.pre('save', function () {
	if (!this.url || this.url === '')
		this.url = `http://localhost:${process.env['PORT']}/img/${this.key}`;
});

export default mongoose.model<ImageDocument>('image', ImageSchema);
