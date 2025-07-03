import React, { useContext, useEffect, useRef, useState } from "react";
import { IBaseSimpleFormComponent } from "../../InterfaceBaseSimpleFormComponent";
import { hasValue } from "/imports/libs/hasValue";
import { SysFormContext } from "../../sysForm/sysForm";
import { ISysFormComponentRef } from "../../sysForm/typings";
import { SysViewField } from "../sysViewField/sysViewField";
import SysLabelView from "../../sysLabelView/sysLabelView";
import Styles from "./sysNumberCounter.styles";
import SysIcon from "../../sysIcon/sysIcon";
import { FormControl, InputBaseProps } from "@mui/material";
import numberValidator from "/imports/libs/validators/number";

interface IProps extends IBaseSimpleFormComponent {
	value?: number;
	defaultValue?: number;
	onChange?: (value: number | undefined) => void;
	onlyPositive?: boolean;
	onlyNegative?: boolean;
	min?: number;
	max?: number;
}

const SysNumberCounter: React.FC<IProps> = ({
	value,
	defaultValue,
	name = "sysNumberSelector",
	label,
	disabled,
	loading,
	readOnly,
	showLabelAdornment,
	labelAdornment,
	showTooltip,
	tooltipMessage,
	tooltipPosition,
	onlyPositive,
	onlyNegative,
	min,
	max,
	onChange
}) => {
	const controllerSysForm = useContext(SysFormContext);
	const inSysFormContext = hasValue(controllerSysForm);

	const refObject = useRef<ISysFormComponentRef>({ name: name, value: value ?? defaultValue });

	if (inSysFormContext) {
		controllerSysForm.setRefComponent(refObject);
		const schema = refObject?.current.schema;
		label = label || schema?.label;
		disabled = disabled || controllerSysForm.disabled;
		loading = loading || controllerSysForm.loading;
		readOnly = readOnly || controllerSysForm.mode === "view" || schema?.readOnly;
		defaultValue = defaultValue || schema?.defaultValue;
		value = value || refObject.current.value;
		min = min || schema?.min;
		max = max || schema?.max;
	}

	const [valueState, setValueState] = useState<string | undefined>(value?.toString() ?? defaultValue?.toString());
	const [visibilityState, setVisibilityState] = useState<boolean>(true);
	const [errorState, setErrorState] = useState<string | undefined>(undefined);

	useEffect(() => setValueState(value?.toString()), [value]);

	if (inSysFormContext)
		controllerSysForm.setInteractiveMethods({
			componentRef: refObject!,
			clearMethod: () => setValueState(undefined),
			setValueMethod: (newValue) => setValueState(newValue.toString()),
			changeVisibilityMethod: (visible: boolean) => setVisibilityState(visible),
			setErrorMethod: (error: string | undefined) => setErrorState(error)
		});

	const updateValue = (newValue: number | string | undefined) => {
		const nValue = typeof newValue === "string" ? parseInt(newValue) : newValue;
		if (inSysFormContext) controllerSysForm.onChangeComponentValue({ refComponent: refObject, value: nValue });

		onChange?.(nValue);
	};

	const handleOnChangeTextField: InputBaseProps["onChange"] = (e) => {
		const value = e.target.value;
		if (value === "") return setValueState(undefined);
		if (value === "-") return setValueState("-");
		if (!numberValidator(value)) return;
		setValueState(value);
		updateValue(value);
	};

	const handleAdd = () =>
		setValueState((prev) => {
			const newValue = prev ? parseInt(prev) + 1 : 1;
			if (onlyNegative && newValue > 0) return prev;
			updateValue(newValue);
			return newValue.toString();
		});

	const handleRemove = () =>
		setValueState((prev) => {
			const newValue = prev ? parseInt(prev) - 1 : -1;
			if (onlyPositive && newValue < 0) return prev;
			updateValue(newValue);
			return newValue.toString();
		});

	if (!visibilityState) return null;

	if (readOnly)
		return (
			<SysViewField
				label={label}
				placeholder={valueState?.toString() || "-"}
				showLabelAdornment={showLabelAdornment}
				labelAdornment={labelAdornment}
			/>
		);

	const disableComponent = disabled || loading || readOnly;
	const disabelRemoveButton =
		disableComponent ||
		(onlyPositive && parseInt(valueState ?? "0") <= 0) ||
		(min !== undefined && parseInt(valueState ?? "0") <= min);

	const disabelAddButton =
		disableComponent ||
		(onlyNegative && parseInt(valueState ?? "0") >= 0) ||
		(max !== undefined && parseInt(valueState ?? "0") >= max);

	return (
		<FormControl error={!!errorState} disabled={disableComponent}>
			<SysLabelView
				label={label}
				showLabelAdornment={showLabelAdornment}
				labelAdornment={labelAdornment}
				disabled={disabled}
				showTooltip={showTooltip}
				tooltipMessage={tooltipMessage}
				tooltipPosition={tooltipPosition}
				helperText={errorState}>
				<Styles.container>
					<Styles.button disabled={disabelRemoveButton} onClick={handleRemove}>
						<SysIcon name="checkIndeterminateSmall" />
					</Styles.button>
					<Styles.textField
						disabled={disableComponent}
						value={hasValue(valueState) ? valueState : ""}
						onChange={handleOnChangeTextField}
					/>
					<Styles.button disabled={disabelAddButton} onClick={handleAdd}>
						<SysIcon name="add" />
					</Styles.button>
				</Styles.container>
			</SysLabelView>
		</FormControl>
	);
};

export default SysNumberCounter;
