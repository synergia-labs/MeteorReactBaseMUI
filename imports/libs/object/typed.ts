export function typedObjectEntries<T extends object>(obj: T): Array<[keyof T, T[keyof T]]> {
	return Object.entries(obj) as Array<[keyof T, T[keyof T]]>;
}

export function typedObjectKeys<T extends object>(obj: T): Array<keyof T> {
	return Object.keys(obj) as Array<keyof T>;
}

export function typedObjectValues<T extends object>(obj: T): Array<T[keyof T]> {
	return Object.values(obj) as Array<T[keyof T]>;
}
