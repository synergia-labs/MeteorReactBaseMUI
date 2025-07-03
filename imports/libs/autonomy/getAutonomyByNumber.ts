import { hasValue } from "../hasValue";
import { determineAutonomyLevel } from "./determinateAutonomyLevel";
import { enumAutonomy } from "../../enums/autonomy";

export function getAutonomyByNumber(autonomy?: number | string): enumAutonomy {
	const numericAutonomy = typeof autonomy === "string" ? Number(autonomy) : autonomy;
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
