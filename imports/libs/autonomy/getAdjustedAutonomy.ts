import { enumAutonomy } from "../../enums/autonomy";
import { enumAutonomyIntervals } from "../../enums/autonomyIntervals";

type EnumKeysType = keyof typeof enumAutonomyIntervals | keyof typeof enumAutonomy;

export function getAdjustedAutonomyValue(autonomy: number, precision: number = 3): number {
	const factor = parseFloat(`0.${"4".repeat(precision)}`);
	return precision === 0 ? autonomy : autonomy - 1 + factor;
}

export function getAdjustedAutonomyValueByEnum(autonomy: EnumKeysType, precision: number = 3): number {
	return getAdjustedAutonomyValue(enumAutonomyIntervals[autonomy], precision);
}
