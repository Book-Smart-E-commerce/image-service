import { SortEnum } from '@src/common/enums/sort.enum';

export interface Search {
	ids?: Array<string>;
	keys?: Array<string>;
	search?: string;
	startDate?: string;
	endDate?: string;
	sortOrder: SortEnum;
	orderBy: string;
	page: number;
	limit: number;
}
