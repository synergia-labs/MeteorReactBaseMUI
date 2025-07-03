import React from "react";
import Style from "./sysSearchSelector.styles";
import { hasValue } from "/imports/libs/hasValue";

interface IProps {
	config: {
		valueField: string;
		labelField: string;
		photoField?: string;
	};
	item: any;
	multiple?: boolean | { max: number; label?: string };
	option?: {
		function: ({}: any) => void;
		icon: React.ReactNode;
	};
	isChecked?: boolean;
	handleCheckbox: (item: any) => void;
	mode?: "view" | "edit";
	disabled?: boolean;
	isBright?: boolean;
}

export default function SysSearchSelectorItem({
	mode = "edit",
	item,
	config,
	multiple,
	option,
	isChecked,
	handleCheckbox,
	disabled = false,
	isBright = false
}: IProps) {
	return (
		<Style.list.body.item.container
			key={item?.[config.valueField] + "SysSearchSelectorItem"}
			sx={isBright ? { backgroundColor: "transparent" } : {}}
			onClick={() => mode == "edit" && handleCheckbox(item)}>
			{mode == "edit" && hasValue(multiple) && (
				<Style.list.body.item.checkbox onChange={() => handleCheckbox(item)} checked={isChecked} disabled={disabled} />
			)}
			{hasValue(config.photoField) && (
				<Style.list.body.item.img src={item[config.photoField!]}>
					{item?.[config.labelField]?.charAt(0).toUpperCase()}
				</Style.list.body.item.img>
			)}
			<Style.list.body.item.text variant="body1" title={item?.[config.labelField]}>
				{item?.[config.labelField]}
			</Style.list.body.item.text>
			{mode == "edit" && hasValue(option) && (
				<Style.list.body.item.option disabled={disabled} onClick={() => option!.function(item)}>
					{option!.icon}
				</Style.list.body.item.option>
			)}
			{mode == "view" && (
				<Style.list.body.item.option
					disabled={disabled}
					onClick={(event) => {
						event.stopPropagation();
						handleCheckbox(item);
					}}>
					<Style.list.body.item.remove />
				</Style.list.body.item.option>
			)}
		</Style.list.body.item.container>
	);
}
