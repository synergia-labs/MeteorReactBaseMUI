import {isEqual, isObject, transform} from 'lodash';

/**
 * Deep diff between two object, using lodash
 * @param  {Object} object Object compared
 * @param  {Object} base   Object to compare with
 * @return {Object}        Return a new object who represent the diff
 */

export const difference = (object: object, base: object) =>
	transform(object, (result, value, key) => {
		if (
			!isEqual(value, base[key]) ||
			(!Array.isArray(value) &&
				isObject(value) &&
				isObject(base[key]) &&
				JSON.stringify(value) !== JSON.stringify(base[key]))
		) {
			// @ts-ignore
			result[key] = value;
		}
	});

export function isObjectEqual(obj1: object | null, obj2: object | null): boolean {
	return isEqual(obj1, obj2);
}

export const removeRepeticoesEmArrayDeObjetos = (a: any[], key: any) => {
	let jaObservados = new Set();
	return a.filter((item) => {
		let k = item[key];
		return jaObservados.has(k) ? false : jaObservados.add(k);
	});
};
