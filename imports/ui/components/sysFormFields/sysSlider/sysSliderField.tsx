import React, { useContext, useRef, useState } from 'react';
import Slider, { SliderProps } from '@mui/material/Slider';
import { ISysFormComponentRef } from '../../sysForm/typings';
import { ISysFormComponent } from '../../InterfaceBaseSimpleFormComponent';
import { SxProps, Theme } from '@mui/material';
import { hasValue } from '../../../../libs/hasValue';
import { SysFormContext } from '../../sysForm/sysForm';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import SysLabelView from '../../sysLabelView/sysLabelView';
import { SysViewField } from '../sysViewField/sysViewField';

interface ISysSliderProps extends ISysFormComponent<SliderProps> {
	/** Estilo do componente.*/
	sxMap?: {
		container?: SxProps<Theme>;
		slider?: SxProps<Theme>;
	};
}

const SysSlider: React.FC<ISysSliderProps> = ({
	name,
	label,
	value,
	defaultValue,
	onChange,
	disabled,
	loading,
	readOnly,
	error,
	showLabelAdornment,
	labelAdornment,
	showTooltip,
	tooltipMessage,
	tooltipPosition,
	sxMap,
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
	showLabelAdornment = showLabelAdornment ?? (!!schema && !!schema?.optional);

	const [valueState, setValueState] = useState<number>(defaultValue || 0);
	const [visibleState, setVisibleState] = useState<boolean>(refObject?.current.isVisible ?? true);
	const [errorState, setErrorState] = useState<string | undefined>(error);

	if (inSysFormContext)
		controllerSysForm.setInteractiveMethods({
			componentRef: refObject!,
			clearMethod: () => setValueState(0),
			setValueMethod: (value) => setValueState(value),
			changeVisibilityMethod: (visible) => setVisibleState(visible),
			setErrorMethod: (error) => setErrorState(error)
		});

	const handleChange = (event: Event, newValue: number | number[]) => {
		setValueState(newValue as number);
		if (inSysFormContext) controllerSysForm?.onChangeComponentValue?.({ refComponent: refObject!, value: newValue });
		onChange?.(event);
	};

	if (!visibleState) return null;

	if (readOnly) {
		return (
			<SysViewField
				label={label}
				placeholder={valueState?.toString() || '-'}
				showLabelAdornment={showLabelAdornment}
				labelAdornment={labelAdornment}
			/>
		);
	}

	return (
		<FormControl error={!!errorState} sx={sxMap?.container}>
			<SysLabelView
				label={label}
				showLabelAdornment={showLabelAdornment}
				labelAdornment={labelAdornment}
				disabled={disabled}
				showTooltip={showTooltip}
				tooltipMessage={tooltipMessage}
				tooltipPosition={tooltipPosition}>
				<Slider
					aria-label={'slider'}
					value={valueState || 0}
					onChange={handleChange}
					disabled={disabled || loading}
					sx={sxMap?.slider}
					{...otherProps}
				/>
			</SysLabelView>
			{!!errorState && <FormHelperText>{errorState}</FormHelperText>}
		</FormControl>
	);
};

export default SysSlider;
