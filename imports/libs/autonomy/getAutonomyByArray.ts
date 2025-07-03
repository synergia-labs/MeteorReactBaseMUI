import { hasValue } from "../hasValue";
import { determineAutonomyLevel } from "./determinateAutonomyLevel";
import { enumAutonomy } from "../../enums/autonomy";
import { getAutonomyNumberByArray } from "./getAutonomyNumberByArray";

export function getAutonomyByArray(autonomy?: [number, number, number, number, number]): enumAutonomy {
	const numericAutonomy = getAutonomyNumberByArray(autonomy ?? [1, 0, 0, 0, 0]);
	if (!hasValue(numericAutonomy) || numericAutonomy === undefined || isNaN(numericAutonomy))
		return enumAutonomy.NOT_MAP;

	return determineAutonomyLevel(numericAutonomy, {
		[enumAutonomy.NOT_MAP]: enumAutonomy.NOT_MAP,
		[enumAutonomy.NONE]: enumAutonomy.NONE,
		[enumAutonomy.LOW]: enumAutonomy.LOW,
		[enumAutonomy.MEDIUM]: enumAutonomy.MEDIUM,
		[enumAutonomy.HIGH]: enumAutonomy.HIGH
	});
}
