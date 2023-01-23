import { HydratedDocument } from 'mongoose';

export interface Image {
	name: string;
	size: number;
	key: string;
	url: string;
	createdAt?: string;
}

export type ImageDocument = HydratedDocument<Image>;
