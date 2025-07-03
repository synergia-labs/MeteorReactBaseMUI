import { hasValue } from "../hasValue";
import { determineAutonomyLevel } from "./determinateAutonomyLevel";
import { enumAutonomy } from "../../enums/autonomy";
import { enumAutonomyIntervals } from "../../enums/autonomyIntervals";
import { AutonomyStructureType } from "/imports/types/autonomyStucture";

export function getAutonomyIntervalByNumber(autonomy?: number | string): number {
	if (!hasValue(autonomy) && autonomy !== 0) return enumAutonomyIntervals.NOT_MAP;
	autonomy = typeof autonomy === "string" ? Number(autonomy) : (autonomy as number);
	if (isNaN(autonomy)) return -1;
	if (autonomy > 12) autonomy = 12;

	const structure: AutonomyStructureType<number> = {
		[enumAutonomy.NOT_MAP]: enumAutonomyIntervals.NONE,
		[enumAutonomy.NONE]: enumAutonomyIntervals.NONE,
		[enumAutonomy.LOW]: autonomy,
		[enumAutonomy.MEDIUM]: autonomy - (enumAutonomyIntervals.MEDIUM - 1),
		[enumAutonomy.HIGH]: autonomy - (enumAutonomyIntervals.HIGH - 1)
	};

	return determineAutonomyLevel<number>(autonomy, structure);
}
