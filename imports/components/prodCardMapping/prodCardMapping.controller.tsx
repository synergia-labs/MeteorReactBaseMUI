import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { DimensionListContext } from "/imports/modules/dimension/frontend/pages/dimensionList/dimensionList.context";
import { IQuillTextHandle } from "../prodQuillText/quillText";
import { typedObjectEntries, typedObjectKeys } from "/imports/libs/object/typed";
import { cloneDeep } from "lodash";
import { enumDisplayOn, IQuillFields, ProdCardMappingContext } from "./prodCardMapping.context";
import { ProdCardMappingView } from "./prodCardMapping.view";
import enumSupportedLanguages from "/imports/services/internationalization/common/enum/supportedLanguages";
import { enumAutonomy } from "/imports/enums/autonomy";
import { autonomyNumberToEnum } from "/imports/libs/autonomy/autonomyNumberToEnum";

interface IProdCardMapping {
	title: string;
	low: string;
	medium: string;
	high: string;
	description: string;
	_id: string;
	showCommentButton: boolean;
	showMappingBar: boolean;
	onClick?: (autonomy: number | undefined) => void;
	autonomy?: number;
	published: boolean;
	onPublish?: (_id: string) => void;
	language?: enumSupportedLanguages;
	displayOn: enumDisplayOn;
}

function getRetractedAutonomyText(
	autonomy: number | undefined,
	low: string,
	medium: string,
	high: string,
	description: string
) {
	const autonomyEnum = autonomyNumberToEnum(autonomy);
	switch (autonomyEnum) {
		case enumAutonomy.HIGH:
			return high;
		case enumAutonomy.MEDIUM:
			return medium;
		case enumAutonomy.LOW:
			return low;
		case enumAutonomy.NONE:
		case enumAutonomy.NOT_MAP:
			return description;
	}
}

const ProdCardMapping: React.FC<IProdCardMapping> = ({
	title,
	low,
	medium,
	high,
	description,
	_id,
	onClick,
	published,
	onPublish,
	language,
	autonomy: topSetAutonomy = undefined,
	displayOn
}) => {
	const { onDeleteButtonClick, onConcludeButtonClick } = useContext(DimensionListContext);
	const [expanded, setExpanded] = useState(false);
	const [edit, setEdit] = useState(false);
	const [autonomy, setAutonomy] = useState<number | undefined>(topSetAutonomy);

	useEffect(() => setAutonomy(topSetAutonomy), [topSetAutonomy]);

	const backupData = useRef<IQuillFields<string>>({
		title,
		low,
		medium,
		high,
		description,
		descriptionForRetractedMapex: description
	});
	const dataRef = useRef<IQuillFields<string>>({
		title,
		low,
		medium,
		high,
		description,
		descriptionForRetractedMapex: description
	});

	const quillRefs: IQuillFields<React.RefObject<IQuillTextHandle | null>> = {
		title: useRef(null),
		description: useRef(null),
		descriptionForRetractedMapex: useRef(null),
		low: useRef(null),
		medium: useRef(null),
		high: useRef(null)
	};

	useEffect(() => {
		dataRef.current = {
			title,
			low,
			medium,
			high,
			description,
			descriptionForRetractedMapex: getRetractedAutonomyText(autonomy, low, medium, high, description)
		};

		typedObjectEntries(dataRef.current).forEach(([key, value]) => {
			quillRefs[key].current?.setContent(value);
		});
	}, [title, low, medium, high, description, autonomy]);

	const onConclude = useCallback(() => {
		setEdit(false);
		const { title, low, medium, high, description } = dataRef.current;
		onConcludeButtonClick(_id, title, description, low, medium, high);
	}, [setEdit, onConcludeButtonClick]);

	const onCancel = useCallback(() => {
		setEdit(false);
		dataRef.current = backupData.current;
		typedObjectEntries(quillRefs).forEach(([key, value]) => value.current?.setContent(dataRef.current[key]));
	}, [setEdit, dataRef, backupData]);

	const onEdit = useCallback(() => {
		setEdit(true);
		backupData.current = cloneDeep(dataRef.current);
	}, [setEdit]);

	const onDelete = useCallback(() => {
		onDeleteButtonClick(_id);
	}, [onDeleteButtonClick, _id]);

	const onChange = useMemo(() => {
		const generateOnChangeFunctionForField = (field: keyof IQuillFields<string>) => (content: string) => {
			dataRef.current[field] = content;
		};

		return typedObjectKeys(dataRef.current).reduce(
			(prev, cur) => {
				prev[cur] = generateOnChangeFunctionForField(cur);
				return prev;
			},
			{} as IQuillFields<(content: string) => void>
		);
	}, []);

	const onAutonomyChange = useCallback(
		(autonomy: number | undefined) => {
			onClick?.(autonomy);
			setAutonomy(autonomy);
		},
		[onClick, setAutonomy]
	);

	const onPublishbuttonClick = useCallback(() => {
		onPublish?.(_id);
	}, [_id, onPublish]);

	return (
		<ProdCardMappingContext.Provider
			value={{
				expanded,
				setExpanded,
				quillRefs,
				onConclude,
				onDelete,
				onChange,
				edit,
				onEdit,
				onCancel,
				onClick: onAutonomyChange,
				autonomy,
				published,
				onPublish: onPublishbuttonClick,
				_id,
				language,
				displayOn
			}}>
			<ProdCardMappingView />
		</ProdCardMappingContext.Provider>
	);
};

export default ProdCardMapping;
