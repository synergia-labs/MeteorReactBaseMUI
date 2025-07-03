import { isInt } from "neo4j-driver";
import { hasValue } from "../hasValue";

export function convertIntegerToNumberNeo4j(val?: object | number | string, defaultValue = 0) {
	if (isInt(val)) return Number(val.toNumber());
	if (!hasValue(val)) return defaultValue ?? 0;
	return Number(val);
}
