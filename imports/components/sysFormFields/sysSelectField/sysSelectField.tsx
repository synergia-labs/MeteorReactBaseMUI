import React, { useContext, useEffect, useRef, useState } from "react";
import { IOption, SysFormComponentType } from "../../InterfaceBaseSimpleFormComponent";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent, SelectProps } from "@mui/material/Select";
import { SxProps, Theme } from "@mui/material/styles";
import { SysFormContext } from "../../sysForm/sysForm";
import SysLabelView from "../../sysLabelView/sysLabelView";
import { SysViewField } from "../sysViewField/sysViewField";
import { hasValue } from "../../../libs/hasValue";
import { ISysFormComponentRef } from "../../sysForm/typings";
import SysIcon from "../../sysIcon/sysIcon";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";

interface ISysSelectFieldProps extends SysFormComponentType<Omit<SelectProps, "variant">> {
	defaultValue?: string;
	description?: string;
	menuNone?: boolean;
	menuNotSelected?: boolean;
	multiple?: boolean;
	sxMap?: {
		container?: SxProps<Theme>;
		menuProps?: SxProps<Theme> | null;
	};
}

export const SysSelectField: React.FC<ISysSelectFieldProps> = ({
	name,
	label,
	value,
	defaultValue,
	options,
	onChange,
	disabled,
	loading,
	readOnly,
	error,
	tooltipMessage,
	tooltipPosition,
	multiple,
	placeholder,
	sxMap,
	...otherProps
}) => {
	const controllerSysForm = useContext(SysFormContext);
	const inSysFormContext = hasValue(controllerSysForm);

	const refObject = !inSysFormContext ? null : useRef<ISysFormComponentRef>({ name, value: value || defaultValue });
	if (inSysFormContext) controllerSysForm.setRefComponent(refObject!);

	const schema = refObject?.current.schema;

	label = label || schema?.label;
	defaultValue = defaultValue || refObject?.current.value || schema?.defaultValue;
	multiple = multiple || schema?.multiple;

	disabled = disabled || controllerSysForm?.disabled;
	readOnly = readOnly || controllerSysForm?.mode === "view" || schema?.readOnly;
	options = options || refObject?.current?.options || ([] as any);
	loading = loading || controllerSysForm.loading;

	const [valueState, setValueState] = useState<string>(value || defaultValue || "");
	const [visibleState, setVisibleState] = useState<boolean>(refObject?.current.isVisible ?? true);
	const [errorState, setErrorState] = useState<string | undefined>(error);
	const [optionsState, setOptionsState] = useState<Array<IOption> | undefined>(options);

	useEffect(() => {
		setOptionsState(options);
	}, [options]);

	if (inSysFormContext)
		controllerSysForm.setInteractiveMethods({
			componentRef: refObject!,
			clearMethod: () => setValueState(""),
			setValueMethod: (value) => setValueState(value),
			changeVisibilityMethod: (visible) => setVisibleState(visible),
			setErrorMethod: (error) => setErrorState(error),
			setOptionsMethod: (options) => setOptionsState(options)
		});

	const handleChange = (e: SelectChangeEvent) => {
		setValueState(e.target.value || "");
		if (inSysFormContext) {
			controllerSysForm?.onChangeComponentValue({ refComponent: refObject!, value: e.target.value });
		}
		onChange?.(e);
	};

	if (!visibleState || options?.length === 0) return null;

	if (readOnly) {
		const viewValue = optionsState && optionsState.find((option) => option.value === valueState);
		return <SysViewField label={label} placeholder={viewValue?.label || "-"} />;
	}

	return (
		<FormControl error={!!errorState} sx={sxMap?.container}>
			<SysLabelView
				label={label}
				tooltipMessage={tooltipMessage}
				disabled={disabled}
				tooltipPosition={tooltipPosition}
				sx={sxMap?.container}>
				<Select
					{...otherProps}
					labelId={`${label}${name}`}
					id={name}
					value={valueState || ""}
					onChange={handleChange}
					displayEmpty
					disabled={disabled || loading}
					multiple={multiple}
					renderValue={(selected) => {
						if (!hasValue(selected)) {
							return (
								<Typography variant="body1" color={"text.disabled"}>
									{placeholder}
								</Typography>
							);
						}
						return (
							<Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 1 }}>
								<Typography variant="body1">{options?.find((e) => e.value == selected)?.label}</Typography>
								<IconButton
									size="small"
									sx={{ padding: 0, margin: 0, zIndex: 10000 }}
									onClick={(e) => {
										e.stopPropagation();
										handleChange({ target: { value: "" } } as any);
									}}
									onMouseDown={(e) => e.stopPropagation()}>
									<SysIcon name="close" />
								</IconButton>
							</Box>
						);
					}}>
					{optionsState?.length === 0 ? (
						<MenuItem id={"NoValues"} disabled value="">
							<ListItemText primary="Nenhuma opção para selecionar" />
						</MenuItem>
					) : (
						optionsState?.map((option, index) => (
							<MenuItem key={index} value={option.value}>
								{option.label}
							</MenuItem>
						))
					)}
				</Select>
			</SysLabelView>
			<FormHelperText>{errorState}</FormHelperText>
		</FormControl>
	);
};
