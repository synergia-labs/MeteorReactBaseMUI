import { enumAutonomy } from "../../enums/autonomy";
import { enumAutonomyIntervals } from "../../enums/autonomyIntervals";

export function convertenumAutonomyToNumber(autonomy: enumAutonomy): number {
	switch (autonomy) {
		case enumAutonomy.NOT_MAP:
			return enumAutonomyIntervals.NOT_MAP;
		case enumAutonomy.NONE:
			return enumAutonomyIntervals.NONE;
		case enumAutonomy.LOW:
			return enumAutonomyIntervals.LOW;
		case enumAutonomy.MEDIUM:
			return enumAutonomyIntervals.MEDIUM;
		case enumAutonomy.HIGH:
			return enumAutonomyIntervals.HIGH;
	}
}
