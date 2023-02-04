import { HydratedDocument } from 'mongoose';

export interface Image {
	/**
	 * Image Name
	 */
	name: string;
	/**
	 * Image Description
	 */
	description: string;
	/**
	 * File Size
	 */
	size: number;
	/**
	 * File key
	 */
	key: string;
	/**
	 * URL to access and view the image
	 */
	url: string;
	/**
	 * Image creation data
	 */
	createdAt?: string;
}

export type ImageDocument = HydratedDocument<Image>;
