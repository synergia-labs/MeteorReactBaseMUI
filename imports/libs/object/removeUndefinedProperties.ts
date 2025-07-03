import { hasValue } from "../hasValue";

/**
 * Removes properties with `undefined` values or keys equal to `"null"` from an object.
 * If a property is an object, the function is applied recursively to its properties.
 *
 * @param obj - The object from which undefined properties and `"null"` keys will be removed.
 * @returns The cleaned object with undefined properties and `"null"` keys removed.
 */
export function removeUndefinedProperties(obj: Record<string, any>): Record<string, any> {
	Object.keys(obj).forEach((key) => {
		if (obj[key] && typeof obj[key] === "object") removeUndefinedProperties(obj[key]);
		if (!hasValue(obj[key]) || key == "null") delete obj[key];
	});
	return obj;
}
