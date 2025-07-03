import React, { ReactNode, useContext, useRef, useState } from "react";
import Styles from "./sysDetailedSwitch.styles";
import { SxProps, Theme } from "@mui/material/styles";
import SysSwitch from "../sysSwitch/sysSwitch";
import { SysFormContext } from "../../sysForm/sysForm";
import { hasValue } from "/imports/libs/hasValue";
import { ISysFormComponentRef } from "../../sysForm/typings";

interface ISysDetailedSwitch {
	label?: string;
	placeholder?: string;
	disabled?: boolean;
	name?: string;
	sx?: SxProps<Theme>;
	children?: ReactNode;
	onChange?: (checked: boolean) => void;
	value?: boolean;
	withSysForm: boolean;
}

const SysDetailedSwitch: React.FC<ISysDetailedSwitch> = ({
	label,
	placeholder,
	disabled = false,
	withSysForm = false,
	sx,
	name,
	onChange,
	value
}) => {
	const controllerSysForm = useContext(SysFormContext);
	const inSysFormContext = withSysForm && hasValue(controllerSysForm);

	const refObject = !inSysFormContext ? null : useRef<ISysFormComponentRef>({ name: name ?? "switch", value: value });
	if (inSysFormContext) controllerSysForm.setRefComponent(refObject!);
	const schema = refObject?.current.schema;

	label = label || schema?.label;
	placeholder = placeholder || schema?.placeholder;
	disabled =
		disabled ||
		controllerSysForm.disabled ||
		controllerSysForm.mode === "view" ||
		schema?.readOnly ||
		controllerSysForm.loading;

	value = value ?? refObject?.current.value;

	const [valueState, setValueState] = useState<boolean>(value ?? false);
	const [visibleState, setVisibleState] = useState<boolean>(refObject?.current.isVisible ?? true);

	if (inSysFormContext)
		controllerSysForm.setInteractiveMethods({
			componentRef: refObject!,
			clearMethod: () => setValueState(false),
			setValueMethod: (value) => setValueState(value),
			changeVisibilityMethod: (visible) => setVisibleState(visible),
			setErrorMethod: (_error) => {}
		});

	function handleChange(event: any) {
		onChange?.(event.target.checked);
		setValueState(event.target.checked);
		if (inSysFormContext)
			controllerSysForm.onChangeComponentValue({ refComponent: refObject!, value: event.target.checked });
	}

	if (!visibleState) return null;

	return (
		<Styles.container sx={sx}>
			<Styles.textContainer>
				<Styles.title disabled={disabled} variant="subtitle1">
					{label}
				</Styles.title>
				{placeholder && (
					<Styles.description variant="body2" disabled={disabled}>
						{placeholder}
					</Styles.description>
				)}
			</Styles.textContainer>
			<SysSwitch name={name} disabled={disabled} onChange={handleChange} value={valueState} withSysForm={false} />
		</Styles.container>
	);
};

export default SysDetailedSwitch;
