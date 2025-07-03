import React, { useContext, useEffect, useRef, useState } from "react";
import { SysFormComponentType } from "../../InterfaceBaseSimpleFormComponent";
import { SwitchProps } from "@mui/material/Switch";
import { SysFormContext } from "../../sysForm/sysForm";
import { hasValue } from "../../../libs/hasValue";
import { ISysFormComponentRef } from "../../sysForm/typings";
import SysLabelView from "../../sysLabelView/sysLabelView";
import { Box, SxProps, Theme } from "@mui/material";
import FormHelperText from "@mui/material/FormHelperText";
import Style from "./sysSwitch.styles";

interface ISysSwitchProps extends SysFormComponentType<SwitchProps> {
	/** Estilo do componente.*/
	sxMap?: {
		switch?: SxProps<Theme>;
	};
	valueLabel?: string;
	withSysForm?: boolean;
}

const SysSwitch: React.FC<ISysSwitchProps> = ({
	name,
	label,
	value,
	defaultValue,
	onChange,
	disabled,
	loading,
	readOnly,
	error,
	showLabelAdornment = false,
	labelAdornment,
	showTooltip = false,
	tooltipMessage,
	tooltipPosition,
	valueLabel,
	withSysForm = true,
	sxMap,
	...otherProps
}) => {
	const controllerSysForm = useContext(SysFormContext);
	const inSysFormContext = withSysForm && hasValue(controllerSysForm);

	const refObject = !inSysFormContext
		? null
		: useRef<ISysFormComponentRef>({ name: name ?? "", value: value || defaultValue });
	if (inSysFormContext) controllerSysForm?.setRefComponent(refObject!);
	const schema = refObject?.current.schema;
	if (inSysFormContext)
		controllerSysForm?.setInteractiveMethods({
			componentRef: refObject!,
			clearMethod: () => setValueState(false),
			setValueMethod: (value) => setValueState(value),
			changeVisibilityMethod: (visible) => {
				setVisibleState(visible);
			},
			setErrorMethod: (error) => setErrorState(error)
		});

	label = label || schema?.label;
	readOnly = readOnly || controllerSysForm?.mode === "view" || schema?.readOnly;
	disabled = disabled || controllerSysForm?.disabled;
	loading = loading || controllerSysForm?.loading;
	defaultValue = value ?? (defaultValue || refObject?.current.value || schema?.defaultValue);
	showLabelAdornment = showLabelAdornment ?? (!!schema && !!schema?.optional);

	const [valueState, setValueState] = useState<boolean | undefined>(defaultValue);
	const [visibleState, setVisibleState] = useState<boolean>(refObject?.current.isVisible ?? true);
	const [errorState, setErrorState] = useState<string | undefined>(error);

	useEffect(() => {
		if (!inSysFormContext) return;
		controllerSysForm?.onChangeComponentValue({ refComponent: refObject!, value: valueState });
	}, [valueState]);

	useEffect(() => {
		setValueState(value);
	}, [value]);

	if (!visibleState) return null;

	const handleToggleSwitch = (e: React.BaseSyntheticEvent) => {
		setValueState(!valueState);
		onChange?.(e);
	};

	return (
		<Box>
			<SysLabelView
				label={label}
				showLabelAdornment={showLabelAdornment}
				labelAdornment={labelAdornment}
				disabled={disabled}
				showTooltip={showTooltip}
				tooltipMessage={tooltipMessage}
				tooltipPosition={tooltipPosition}>
				<Style.switch
					{...otherProps}
					name={name}
					id={name}
					key={name}
					sx={sxMap?.switch}
					value={valueState || false}
					checked={valueState}
					onChange={handleToggleSwitch}
					disabled={disabled || loading || readOnly}
				/>

				{!!errorState && <FormHelperText sx={{ color: "error.main" }}> {errorState} </FormHelperText>}
			</SysLabelView>
		</Box>
	);
};

export type { ISysSwitchProps };
export default SysSwitch;
