import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class SearchDto {
	@IsString()
	@IsOptional()
	ids?: string;

	@IsString()
	@IsOptional()
	keys?: string;

	@IsString()
	@IsOptional()
	name?: string;

	@IsString()
	@IsOptional()
	description?: string;

	@IsString()
	@IsOptional()
	startDate?: string;

	@IsString()
	@IsOptional()
	endDate?: string;

	@IsNumber({}, { message: 'page must be a valid number' })
	@IsOptional()
	@Transform(({ value }) => +value)
	page?: number;

	@IsNumber({}, { message: 'limit must be a valid number' })
	@IsOptional()
	@Transform(({ value }) => +value)
	limit?: number;
}
