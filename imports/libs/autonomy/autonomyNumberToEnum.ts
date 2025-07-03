import { determineAutonomyLevel } from "./determinateAutonomyLevel";
import { enumAutonomy } from "/imports/enums/autonomy";

export function autonomyNumberToEnum(autonomy: number | undefined) {
	const structure = {
		[enumAutonomy.NOT_MAP]: enumAutonomy.NOT_MAP,
		[enumAutonomy.NONE]: enumAutonomy.NONE,
		[enumAutonomy.LOW]: enumAutonomy.LOW,
		[enumAutonomy.MEDIUM]: enumAutonomy.MEDIUM,
		[enumAutonomy.HIGH]: enumAutonomy.HIGH
	};

	return determineAutonomyLevel(autonomy, structure);
}
