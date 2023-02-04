import { Image, ImageDocument } from '@image/interfaces/image.interface';
import { Search } from '@image/interfaces/search.interface';
import { UpdateImageDto } from '@image/dtos/updateImage.dto';

export interface Service {
	/**
	 * Create an image
	 * @param image Image file information
	 * @return The created image document
	 */
	create(image: Image): Promise<ImageDocument>;
	/**
	 * Find One Image
	 * @param id The unique id of the image
	 * @return The image found
	 */
	findOne(id: string): Promise<ImageDocument>;
	/**
	 * Find images
	 * @param  search  Image search options
	 * @return The images found
	 */
	find(search: Search): Promise<Array<ImageDocument>>;
	/**
	 * Delete an image
	 * @param id  The unique id of the image
	 * @return The deleted image
	 */
	delete(id: string): Promise<ImageDocument>;
	/**
	 * Update an image
	 * @param id  The unique id of the image
	 * @param image - image data
	 * @param image.name - The name of the image
	 * @param image.description - The description of the image
	 * @return The updated image
	 */
	update(id: string, image: UpdateImageDto): Promise<ImageDocument>;
}
