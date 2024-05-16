import React, { useContext, useEffect, useRef, useState } from 'react';
import { ISysFormComponent } from '../../InterfaceBaseSimpleFormComponent';
import Switch, { SwitchProps } from '@mui/material/Switch';
import { SysFormContext } from '../../sysForm/sysForm';
import { hasValue } from '/imports/libs/hasValue';
import { ISysFormComponentRef } from '../../sysForm/typings';
import SysLabelView from '../../sysLabelView/sysLabelView';
import { FormControlLabel, FormHelperText, SxProps, Theme } from '@mui/material';

interface ISysSwitchProps extends ISysFormComponent<SwitchProps> {
	/** Estilo do componente.*/
	sxMap?: {
		container?: SxProps<Theme>;
		header?: SxProps<Theme>;
		switch?: SxProps<Theme>;
	};
	labelPosition?: 'top' | 'start' | 'bottom' | 'end';
	valueLabel?: string;
}

const SysSwitch: React.FC<ISysSwitchProps> = ({
	name,
	error,
	label,
	tooltipMessage,
	value,
	sxMap,
	defaultValue,
	onChange,
	readOnly,
	loading,
	disabled,
	labelPosition = 'end',
	valueLabel,
	showRequired,
	requiredIndicator,
	...otherProps
}) => {
	const controllerSysForm = useContext(SysFormContext);
	const inSysFormContext = hasValue(controllerSysForm);

	const refObject = !inSysFormContext ? null : useRef<ISysFormComponentRef>({ name, value: value || defaultValue });
	if (inSysFormContext) controllerSysForm.setRefComponent(refObject!);
	const schema = refObject?.current.schema;

	label = label || schema?.label;
	readOnly = readOnly || controllerSysForm.mode === 'view' || schema?.readOnly;
	disabled = disabled || controllerSysForm.disabled;
	loading = loading || controllerSysForm.loading;
	defaultValue = defaultValue || refObject?.current.value || schema?.defaultValue;
	showRequired = showRequired || (!!schema && !schema?.optional);

	const [valueState, setValueState] = useState<boolean | undefined>(defaultValue);
	const [visibleState, setVisibleState] = useState<boolean>(refObject?.current.isVisible ?? true);
	const [errorState, setErrorState] = useState<string | undefined>(error);

	if (!visibleState) return null;

	if (inSysFormContext)
		controllerSysForm.setInteractiveMethods({
			componentRef: refObject!,
			clearMethod: () => setValueState(false),
			setValueMethod: (value) => setValueState(value),
			changeVisibilityMethod: (visible) => setVisibleState(visible),
			setErrorMethod: (error) => setErrorState(error)
		});

	const handleToggleSwitch = (e: React.BaseSyntheticEvent) => {
		setValueState(!valueState);
		onChange?.(e);
	};

	useEffect(() => {
		controllerSysForm?.onChangeComponentValue({ refComponent: refObject!, value: valueState });
	}, [valueState]);

	return (
		<SysLabelView
			label={label}
			tooltipMessage={tooltipMessage}
			sxMap={sxMap}
			disabled={disabled}
			showRequired={showRequired}
			requiredIndicator={requiredIndicator}>
			<FormControlLabel
				value={labelPosition}
				label={valueLabel ?? (valueState ? 'Sim' : 'Não')}
				control={
					<Switch
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
				}
			/>
			<FormHelperText sx={{ color: (theme) => theme.palette.error.main }}> {errorState} </FormHelperText>
		</SysLabelView>
	);
};

export type { ISysSwitchProps };
export default SysSwitch;
