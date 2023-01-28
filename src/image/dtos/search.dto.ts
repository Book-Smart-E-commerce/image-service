import {
	IsEnum,
	IsIn,
	IsISO8601,
	IsNumber,
	IsOptional,
	IsString,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { SortEnum } from '@src/common/enums/sort.enum';

export class SearchDto {
	@IsString()
	@IsOptional()
	ids?: string;

	@IsString()
	@IsOptional()
	keys?: string;

	@IsString()
	@IsOptional()
	search?: string;

	@IsISO8601()
	@IsOptional()
	startDate?: string;

	@IsISO8601()
	@IsOptional()
	endDate?: string;

	@IsEnum(SortEnum)
	@IsOptional()
	sortOrder?: SortEnum;

	@IsString()
	@IsIn(['name', 'description', 'createdAt'])
	@IsOptional()
	orderBy?: string;

	@IsNumber({}, { message: 'page must be a valid number' })
	@IsOptional()
	@Transform(({ value }) => +value)
	page?: number;

	@IsNumber({}, { message: 'limit must be a valid number' })
	@IsOptional()
	@Transform(({ value }) => +value)
	limit?: number;
}
