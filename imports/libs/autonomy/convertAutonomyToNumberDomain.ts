import { determineAutonomyLevel } from "./determinateAutonomyLevel";
import { enumAutonomy } from "../../enums/autonomy";

export function convertAutonomyToNumberDomain(autonomyNumber: number): number {
	if (isNaN(autonomyNumber)) return -1;
	return determineAutonomyLevel(autonomyNumber, {
		[enumAutonomy.NOT_MAP]: -1,
		[enumAutonomy.NONE]: 0,
		[enumAutonomy.LOW]: 1,
		[enumAutonomy.MEDIUM]: 2,
		[enumAutonomy.HIGH]: 3
	});
}
