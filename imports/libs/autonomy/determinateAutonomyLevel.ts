import { getAdjustedAutonomyValue } from "./getAdjustedAutonomy";
import { enumAutonomy } from "../../enums/autonomy";
import { enumAutonomyIntervals } from "../../enums/autonomyIntervals";
import { AutonomyStructureType } from "/imports/types/autonomyStucture";

export function determineAutonomyLevel<T>(
	autonomy: number | undefined,
	structure: AutonomyStructureType<T>,
	precision: number = 3
): T {
	if (autonomy === undefined) return structure[enumAutonomy.NOT_MAP];

	if (autonomy == enumAutonomyIntervals.NOT_MAP) return structure[enumAutonomy.NOT_MAP];
	if (autonomy == enumAutonomyIntervals.NONE) return structure[enumAutonomy.NONE];
	if (autonomy < getAdjustedAutonomyValue(enumAutonomyIntervals.MEDIUM, precision)) return structure[enumAutonomy.LOW];
	if (autonomy < getAdjustedAutonomyValue(enumAutonomyIntervals.HIGH, precision)) return structure[enumAutonomy.MEDIUM];
	return structure[enumAutonomy.HIGH];
}
