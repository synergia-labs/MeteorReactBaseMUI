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
	maxWidth?: number;
	itemRender?: (value?: IOption) => React.ReactNode;
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
	maxWidth = 450,
	itemRender,
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

	const refObject = !inSysFormContext
		? null
		: useRef<ISysFormComponentRef>({ name: name ?? "", value: value || defaultValue });
	if (inSysFormContext && !hasValue(refObject?.current.options)) controllerSysForm.setRefComponent(refObject!);
	const schema = refObject?.current.schema;
	if (inSysFormContext)
		controllerSysForm.setInteractiveMethods({
			componentRef: refObject!,
			clearMethod: () => setValueState(""),
			setValueMethod: (value) => setValueState(value),
			changeVisibilityMethod: (visible) => setVisibleState(visible),
			setErrorMethod: (error) => setErrorState(error),
			setOptionsMethod: (options) => setOptionsState(options)
		});

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

	const handleChange = (e: SelectChangeEvent) => {
		const newValue = e.target.value;
		setValueState(hasValue(newValue) ? newValue : "");
		if (inSysFormContext) {
			controllerSysForm?.onChangeComponentValue({ refComponent: refObject!, value: newValue });
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
					value={hasValue(valueState) ? valueState : ""}
					onChange={handleChange}
					displayEmpty
					disabled={disabled || loading}
					multiple={multiple}
					MenuProps={{
						PaperProps: {
							elevation: 15, // Altere entre 0 e 24
							sx: {
								maxWidth: maxWidth + "px",
								width: "auto", // Ou "100%" para forçar mesma largura do Select
								overflow: "hidden"
							}
						},
						MenuListProps: {
							sx: {
								maxWidth: "100%"
							}
						},
						disableScrollLock: true
					}}
					sx={{
						"& .MuiSelect-select": {
							display: "flex",
							alignItems: "center",
							paddingY: "5px",
							height: "auto"
						},
						"& .MuiOutlinedInput-input": {
							padding: 0
						},
						"& .MuiOutlinedInput-root": {
							height: "auto",
							minHeight: "unset",
							padding: 0
						}
					}}
					renderValue={(selected) => {
						if (!hasValue(selected)) {
							return (
								<Typography
									variant="body1"
									color={"text.disabled"}
									title={placeholder}
									sx={{
										maxWidth: maxWidth + "px",
										textOverflow: "ellipsis",
										overflow: "hidden",
										whiteSpace: "nowrap", // redundante com noWrap, mas OK
										width: "100%" // importante: define o espaço máximo
									}}>
									{placeholder}
								</Typography>
							);
						}
						return (
							<Box
								sx={{
									display: "flex",
									alignItems: "center",
									justifyContent: "space-between",
									gap: 1,
									maxWidth: "100%"
								}}>
								{hasValue(itemRender) ? (
									// Aqui você também deve garantir que o conteúdo renderizado por itemRender
									// dentro do renderValue seja truncado se for muito longo
									itemRender?.(options?.find((e) => e.value == selected))
								) : (
									<>
										<Typography
											variant="body1"
											title={options?.find((e) => e.value == selected)?.label}
											sx={{
												maxWidth: maxWidth - 80 + "px",
												textOverflow: "ellipsis",
												overflow: "hidden",
												whiteSpace: "nowrap", // redundante com noWrap, mas OK
												width: "100%" // importante: define o espaço máximo
											}}>
											{options?.find((e) => e.value == selected)?.label}
										</Typography>
										<IconButton
											size="small"
											sx={{ padding: 0, margin: 0 }}
											onClick={(e) => {
												e.stopPropagation();
												handleChange({ target: { value: "" } } as any);
											}}
											onMouseDown={(e) => e.stopPropagation()}>
											<SysIcon name="close" />
										</IconButton>
									</>
								)}
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
								{hasValue(itemRender) ? (
									itemRender?.(option)
								) : (
									// Para o caso padrão, aplicamos o truncamento diretamente ao texto
									<Typography
										title={option.label}
										sx={{
											textOverflow: "ellipsis",
											overflow: "hidden",
											whiteSpace: "nowrap", // redundante com noWrap, mas OK
											width: "100%" // importante: define o espaço máximo
										}}
										variant="inherit" // Herda o estilo do MenuItem
										noWrap // Atalho para whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"
									>
										{option.label}
									</Typography>
								)}
							</MenuItem>
						))
					)}
				</Select>
			</SysLabelView>
			<FormHelperText>{errorState}</FormHelperText>
		</FormControl>
	);
};
