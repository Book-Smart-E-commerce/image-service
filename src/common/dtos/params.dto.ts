import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class ParamsDto {
	@IsNotEmpty()
	@IsString()
	@IsMongoId()
	id: string;
}
