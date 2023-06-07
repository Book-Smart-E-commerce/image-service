import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateImageDto {
	@IsString()
	@IsNotEmpty()
	name: string;

	@IsNotEmpty()
	@IsString()
	description: string;
}
