import { enumAutonomyIntervals } from "../../enums/autonomyIntervals";

export function getValueOfAutonomyByText(text: string): number {
	const formattedText = text.toUpperCase().trim();
	return enumAutonomyIntervals[formattedText as keyof typeof enumAutonomyIntervals] ?? -1;
}
