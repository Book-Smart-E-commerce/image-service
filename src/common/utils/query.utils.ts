const pipe =
	(...fns: Array<(arg: any) => any>) =>
	(value: any) =>
		fns.reduce((acc, fn) => fn(acc), value);

const trim = (value: string): string => value.trim();

const convertToArray = (value: string): Array<string> =>
	value.split(',').map(e => e.trim());

const removeEmptyElements = (values: Array<string>): Array<string> =>
	values.filter(e => e !== '');

const removeDuplicates = (values: Array<string>): Array<string> => [
	...new Set(values),
];

export const formatQueryToArray = (value: string) =>
	pipe(trim, convertToArray, removeEmptyElements, removeDuplicates)(value);
