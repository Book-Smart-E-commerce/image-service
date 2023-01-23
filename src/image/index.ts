import { ImageController } from '@image/image.controller';
import { ImageService } from '@image/image.service';
import { ImageRepository } from '@image/image.repository';
import Image from '@image/model/image.model';

const imageRepository = new ImageRepository(Image);
const imageService = new ImageService(imageRepository);

export const imageController = new ImageController(imageService);
