import React, { useContext, useRef, useState } from 'react';
import Radio, { RadioProps } from '@mui/material/Radio';
import { SysFormContext } from '../../sysForm/sysForm';
import { IOption, ISysFormComponent } from '../../InterfaceBaseSimpleFormComponent';
import { SxProps, Theme } from '@mui/material';
import { SysViewField } from '../sysViewField/sysViewField';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import SysLabelView from '../../sysLabelView/sysLabelView';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import { hasValue } from '/imports/libs/hasValue';
import { ISysFormComponentRef } from '../../sysForm/typings';

interface ISysRadioProps extends ISysFormComponent<RadioProps> {
	/** Estilo do componente.*/
	sxMap?: {
		container?: SxProps<Theme>;
		radioGroup?: SxProps<Theme>;
	};
	/** Posicionamento dos elementos */
	alignment?: 'row' | 'column';
}

export const SysRadioButton: React.FC<ISysRadioProps> = ({
	name,
	label,
	options,
	value,
	disabled,
	loading,
	onChange,
	readOnly,
	error,
	tooltipMessage,
	defaultValue,
	positionTooltip,
	helpIcon,
	alignment = 'column',
	showRequired,
	requiredIndicator,
	sxMap,
	...otherProps
}) => {
	const controllerSysForm = useContext(SysFormContext);
	const inSysFormContext = hasValue(controllerSysForm);

	const refObject = !inSysFormContext ? null : useRef<ISysFormComponentRef>({ name, value: value || defaultValue });
	if (inSysFormContext) controllerSysForm.setRefComponent(refObject!);
	const schema = refObject?.current.schema;

	options = options || refObject?.current.options || ([] as any);
	defaultValue = defaultValue || schema?.defaultValue;
	label = label || schema?.label;
	readOnly = readOnly || controllerSysForm.mode === 'view' || schema?.readOnly;
	disabled = disabled || controllerSysForm.disabled;
	loading = loading || controllerSysForm.loading;
	defaultValue = refObject?.current.value || schema?.defaultValue;
	showRequired = showRequired || (!!schema && !schema?.optional);

	const [valueState, setValueState] = useState<string>(defaultValue || '');
	const [visibleState, setVisibleState] = useState<boolean>(refObject?.current.isVisible ?? true);
	const [errorState, setErrorState] = useState<string | undefined>(error);
	const [optionsState, setOptionsState] = useState<Array<IOption> | undefined>(options);

	if (inSysFormContext)
		controllerSysForm.setInteractiveMethods({
			componentRef: refObject!,
			clearMethod: () => setValueState(''),
			setValueMethod: (value) => setValueState(value),
			changeVisibilityMethod: (visible) => setVisibleState(visible),
			setErrorMethod: (error) => setErrorState(error),
			setOptionsMethod: (options) => setOptionsState(options)
		});

	function onFieldChange(e: React.BaseSyntheticEvent) {
		const newValue = e.target.value;
		setValueState(newValue);
		controllerSysForm?.onChangeComponentValue({ refComponent: refObject!, value: newValue });
		onChange?.(e);
	}

	if (!visibleState || options?.length === 0) return null;

	if (readOnly) {
		const viewValue = optionsState && optionsState.find((option) => option.value === valueState);
		return <SysViewField label={label} placeholder={viewValue?.label || '-'} />;
	}

	return (
		<FormControl error={!!errorState}>
			<SysLabelView
				label={label}
				tooltipMessage={tooltipMessage}
				disabled={disabled}
				placement={positionTooltip}
				helpIcon={helpIcon}
				showRequired={showRequired}
				requiredIndicator={requiredIndicator}
				sx={sxMap?.container}>
				<RadioGroup
					value={valueState}
					name="controlled-radio-buttons-group"
					onChange={onFieldChange}
					sx={[
						{
							flexDirection: alignment,
							flexWrap: 'wrap'
						},
						...(Array.isArray(sxMap?.radioGroup) ? sxMap?.radioGroup : [sxMap?.radioGroup])
					]}>
					{optionsState &&
						optionsState.map((opt) => (
							<FormControlLabel
								key={opt.value}
								value={opt.value}
								control={<Radio {...otherProps} />}
								label={opt.label}
								disabled={disabled || loading}
							/>
						))}
				</RadioGroup>
			</SysLabelView>
			<FormHelperText>{errorState}</FormHelperText>
		</FormControl>
	);
};
