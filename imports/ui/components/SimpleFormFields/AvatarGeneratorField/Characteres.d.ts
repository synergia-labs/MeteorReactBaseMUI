export interface AvatarCharacterFormatPart {
	type?: 'path' | 'circle' | 'polygon';
	path?: string;
	fill?: string;
	fillOpacity?: number;
	cx?: number;
	cy?: number;
	r?: number;
	stroke?: string;
	strokeWidth?: number;
	points?: string;
}

export interface AvatarCharacterDefinition {
	colors: string[];
	formats: Record<string, string | AvatarCharacterFormatPart[]>;
	draggable?: boolean;
	fillOpacity?: number;
}

export const characteres: Record<string, AvatarCharacterDefinition>;
