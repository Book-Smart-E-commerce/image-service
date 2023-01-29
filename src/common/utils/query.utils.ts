import * as R from 'ramda';

const trim = (value: string): string => value.trim();

const convertToArray = (value: string): Array<string> =>
	value.split(',').map(e => e.trim());

const removeEmptyElements = (values: Array<string>): Array<string> =>
	values.filter(e => e !== '');

const removeDuplicates = <T>(values: Array<T>): Array<T> => [
	...new Set(values),
];

export const formatQueryToArray = (value: string): Array<string> =>
	R.pipe(trim, convertToArray, removeEmptyElements, removeDuplicates)(value);
