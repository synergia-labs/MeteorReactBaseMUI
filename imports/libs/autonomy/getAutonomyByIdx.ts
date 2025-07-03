import { enumAutonomy, enumAutonomyValues } from "../../enums/autonomy";

export function getAutonomyByIndex(index: number): enumAutonomy {
	return enumAutonomyValues[index] || enumAutonomyValues[0];
}
