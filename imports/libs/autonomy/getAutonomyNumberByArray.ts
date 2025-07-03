import { enumAutonomyIntervals } from "../../enums/autonomyIntervals";

export function getAutonomyNumberByArray(autonomyArray?: [number, number, number, number, number]): number {
	if (!autonomyArray || autonomyArray.length !== 5) {
		return enumAutonomyIntervals.NOT_MAP;
	}
	const [notMapped, none, low, medium] = autonomyArray;
	if (notMapped >= 1) return enumAutonomyIntervals.NOT_MAP;
	if (none >= 1) return enumAutonomyIntervals.NONE;
	if (low >= 1) return enumAutonomyIntervals.LOW;
	if (medium >= 1) return enumAutonomyIntervals.MEDIUM;
	return enumAutonomyIntervals.HIGH;
}
