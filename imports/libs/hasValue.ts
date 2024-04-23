export const isBoolean = (value: any) => {
	if (value === null || value === undefined) {
		return false;
	}

	if (
		typeof value === 'boolean' ||
		(typeof value === 'object' && (value.toString() === 'false' || value.toString() === 'true'))
	) {
		return true;
	}

	return false;
};

export const getTypeOf = (obj: any) => ({}).toString.call(obj).split(' ')[1].slice(0, -1).toLowerCase();

export const hasValue = (value: any) => {
	if (isBoolean(value)) {
		return true;
	}

	switch (getTypeOf(value)) {
		case 'undefined':
			return false;
		case 'null':
			return false;
		case 'number':
			return !isNaN(value);
		case 'object':
			return Object.keys(value).length > 0;
		case 'array':
			return value.length > 0;
		case 'string':
			return value.trim() !== '';
		default:
			return true;
	}
};
