import { determineAutonomyLevel } from "./determinateAutonomyLevel";
import { enumAutonomy } from "../../enums/autonomy";

export function getAutonomyArrayByNumber(autonomy: number | string): [number, number, number, number, number] {
	const numericAutonomy = typeof autonomy === "string" ? Number(autonomy) : autonomy;
	if (isNaN(numericAutonomy)) return [1, 0, 0, 0, 0];

	return determineAutonomyLevel(numericAutonomy, {
		[enumAutonomy.NOT_MAP]: [1, 0, 0, 0, 0],
		[enumAutonomy.NONE]: [0, 1, 0, 0, 0],
		[enumAutonomy.LOW]: [0, 0, 1, 0, 0],
		[enumAutonomy.MEDIUM]: [0, 0, 0, 1, 0],
		[enumAutonomy.HIGH]: [0, 0, 0, 0, 1]
	});
}
