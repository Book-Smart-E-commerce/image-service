import {
	IsEnum,
	IsIn,
	IsISO8601,
	IsMongoId,
	IsNumber,
	IsOptional,
	IsString,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { SortEnum } from '@src/common/enums/sort.enum';
import { formatQueryToArray } from '@src/common/utils/query.utils';

export class SearchDto {
	@IsOptional()
	@IsMongoId({ each: true })
	@Transform(({ value }) => {
		if (value) return formatQueryToArray(value);

		return value;
	})
	ids?: string;

	@IsString({ each: true })
	@Transform(({ value }) => {
		if (value) return formatQueryToArray(value);

		return value;
	})
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
