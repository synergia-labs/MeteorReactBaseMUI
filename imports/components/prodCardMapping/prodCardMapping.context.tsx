import React from "react";
import { IQuillTextHandle } from "../prodQuillText/quillText";
import enumSupportedLanguages from "/imports/services/internationalization/common/enum/supportedLanguages";

export interface IQuillFields<T> {
	title: T;
	description: T;
	descriptionForRetractedMapex: T;
	low: T;
	medium: T;
	high: T;
}

export enum enumDisplayOn {
	EDIT,
	INDIVIDUAL_MAPPING,
	SIMUL_MAPPING
}

interface IProdCardMappingContext {
	expanded: boolean;
	setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
	edit: boolean;
	onConclude: () => void;
	onCancel: () => void;
	onEdit: () => void;
	onDelete: () => void;
	quillRefs?: IQuillFields<React.RefObject<IQuillTextHandle | null>>;
	onChange: IQuillFields<(content: string) => void>;
	onClick?: (autonomy: number | undefined) => void;
	autonomy: number | undefined;
	published: boolean;
	onPublish?: () => void;
	_id: string;
	language?: enumSupportedLanguages;
	displayOn: enumDisplayOn;
}

export const ProdCardMappingContext = React.createContext<IProdCardMappingContext>({
	expanded: false,
	setExpanded: () => {},
	edit: false,
	onConclude: () => {},
	onCancel: () => {},
	onEdit: () => {},
	onDelete: () => {},
	onChange: {
		title: () => {},
		description: () => {},
		descriptionForRetractedMapex: () => {},
		low: () => {},
		medium: () => {},
		high: () => {}
	},
	autonomy: undefined,
	published: false,
	_id: "",
	displayOn: enumDisplayOn.EDIT
});
