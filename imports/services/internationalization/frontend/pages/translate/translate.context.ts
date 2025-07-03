import React, { createContext, Dispatch, SetStateAction } from "react";
import { TranslateItemPropsType } from "../../components/translateItem/translateItem.view";

interface ITranslatePageContext {
	resources: Record<string, any>;
	translatedItems: Array<TranslateItemPropsType>;
	selectedItem?: string;
	searchText: string;
	hasChanges: boolean;
	deletedKeys: Record<string, Array<string>>;
	setSearchText: Dispatch<SetStateAction<string>>;
	handleItemSelectionToggle?: (event: React.SyntheticEvent, itemId: string, isSelected: boolean) => void;
	onChangeTextField: (language: string, relativePath: string, value: string) => void;
	exportFile: () => void;
}

const TranslatePageContext = createContext<ITranslatePageContext>({} as ITranslatePageContext);
export default TranslatePageContext;
export type { ITranslatePageContext };
