import { getAdjustedAutonomyValue } from "./getAdjustedAutonomy";
import { enumAutonomy } from "../../enums/autonomy";
import { enumAutonomyIntervals } from "../../enums/autonomyIntervals";
import { AutonomyStructureType } from "/imports/types/autonomyStucture";

export function getNeo4jQueryAutonomyInterval(
	autonomy: enumAutonomy,
	autonomyVariable: string,
	precision: number = 3
): string {
	const thresholds = {
		low: getAdjustedAutonomyValue(enumAutonomyIntervals.MEDIUM, precision),
		medium: getAdjustedAutonomyValue(enumAutonomyIntervals.HIGH, precision)
	};

	const queryStructure: AutonomyStructureType<string> = {
		[enumAutonomy.NOT_MAP]: `(${autonomyVariable} = ${enumAutonomyIntervals.NOT_MAP})`,
		[enumAutonomy.NONE]: `(${autonomyVariable} = ${enumAutonomyIntervals.NONE})`,
		[enumAutonomy.LOW]: `(${autonomyVariable} > ${enumAutonomyIntervals.NONE} AND ${autonomyVariable} <= ${thresholds.low})`,
		[enumAutonomy.MEDIUM]: `(${autonomyVariable} > ${thresholds.low} AND ${autonomyVariable} <= ${thresholds.medium})`,
		[enumAutonomy.HIGH]: `(${autonomyVariable} > ${thresholds.medium})`
	};

	return queryStructure[autonomy] || "";
}
