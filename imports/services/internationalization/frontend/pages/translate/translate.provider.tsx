import React, { useContext, useRef, useState } from "react";
import Context, { ITranslatePageContext } from "./translate.context";
import TranslatePageView from "./translate.view";
import { i18nResources } from "../../..";
import getTranslateItemList from "../../../utils/getTranslateItemList";
import loash from "lodash";
import LayoutContext, { IAppLayoutContext } from "/imports/app/appLayoutProvider/appLayoutContext";
import ConfirmI18nChangesModal from "../../dialogs/confirmChangesModal/confirmI18nChangesModal.view";
import enumSupportedLanguages from "../../../common/enum/supportedLanguages";

const TranslatePageProvider: React.FC = () => {
	const { showModal } = useContext<IAppLayoutContext>(LayoutContext);

	const [selectedItem, setSelectedItem] = useState<string | undefined>(undefined);
	const [searchText, setSearchText] = useState<string>("");
	const [hasChanges, setHasChanges] = useState<boolean>(false);
	const editedResources = useRef<Record<string, any>>(loash.cloneDeep(i18nResources));

	const handleItemSelectionToggle = (_: React.SyntheticEvent, itemId: string, __: boolean) => {
		if (itemId.split(".").length < 2) return;
		return setSelectedItem(itemId);
	};

	const getTranslatedItems = () => {
		if (!selectedItem) return [];
		const object = getTranslateItemList(editedResources.current, selectedItem);
		if (searchText) {
			return object.filter((item) => {
				const values = Object.values(item);
				return values.some((value) => value.toLowerCase().includes(searchText.toLowerCase()));
			});
		}

		return object;
	};

	const onChangeTextField = (language: string, relativePath: string, value: string) => {
		if (!hasChanges) setHasChanges(true);
		const absolutePath = `${selectedItem}.${relativePath}`.split(".");
		let currentObject = editedResources.current[language];
		const lastKey = absolutePath[absolutePath.length - 1];
		for (let i = 0; i < absolutePath.length - 1; i++) {
			if (!currentObject[absolutePath[i]]) {
				currentObject[absolutePath[i]] = {};
			}
			currentObject = currentObject[absolutePath[i]];
		}

		try {
			const currentVariables = [...currentObject[lastKey].matchAll(/{{(.*?)}}/g)].map((m) => m[1]);
			const newVariables = [...value.matchAll(/{{(.*?)}}/g)].map((m) => m[1]);
			const removedVariables = currentVariables.filter((x) => !newVariables.includes(x));
			const addedVariables = newVariables.filter((x) => !currentVariables.includes(x));

			if (language === enumSupportedLanguages.PT && (removedVariables.length > 0 || addedVariables.length > 0)) {
				const keyPath = `${selectedItem}.${relativePath}`;
				const currentObject = editedResources.current["deletedKeys"];
				if (!currentObject[keyPath]) currentObject[keyPath] = Array<string>();

				if (removedVariables.length > 0) currentObject[keyPath] = [...currentObject[keyPath], ...removedVariables];
				if (addedVariables.length > 0)
					currentObject[keyPath] = currentObject[keyPath].filter((x: string) => !addedVariables.includes(x));
				if (currentObject[keyPath].length === 0) delete currentObject[keyPath];
			}
		} catch (e) {
		} finally {
			currentObject[lastKey] = value.trim();
		}
	};

	const exportFile = () => {
		showModal({
			children: <ConfirmI18nChangesModal originalObject={i18nResources} editedObject={editedResources.current} />
		});
	};

	const contextValues: ITranslatePageContext = {
		resources: i18nResources,
		searchText: searchText,
		translatedItems: getTranslatedItems(),
		selectedItem: selectedItem,
		hasChanges: hasChanges,
		deletedKeys: i18nResources["deletedKeys"],
		setSearchText: setSearchText,
		handleItemSelectionToggle: handleItemSelectionToggle,
		onChangeTextField: onChangeTextField,
		exportFile: exportFile
	};

	return (
		<Context.Provider value={contextValues}>
			<TranslatePageView />
		</Context.Provider>
	);
};

export default TranslatePageProvider;
