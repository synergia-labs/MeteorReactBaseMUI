import React, { useContext, useRef, useState } from 'react';
import Checkbox, { CheckboxProps } from '@mui/material/Checkbox';
import { SxProps, Theme } from '@mui/material';
import { IOption, ISysFormComponent } from '../../InterfaceBaseSimpleFormComponent';
import { SysFormContext } from '../../sysForm/sysForm';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import SysLabelView from '../../sysLabelView/sysLabelView';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import { hasValue } from '/imports/libs/hasValue';
import { ISysFormComponentRef } from '../../sysForm/typings';
import { SysViewField } from '../sysViewField/sysViewField';

interface ISysCheckBox extends ISysFormComponent<CheckboxProps> {
	/** Estilo do componente.*/
	sxMap?: {
		container?: SxProps<Theme>;
		formGroup?: SxProps<Theme>;
		formControllLabel?: SxProps<Theme>;
		checkbox?: SxProps<Theme>;
	};
	/** Posicionamento dos elementos */
	alignment?: 'row' | 'column';
	/** Posicionamento da Tooltip */
	helpIcon?: boolean;
}

export const SysCheckBox: React.FC<ISysCheckBox> = ({
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
	showRequired,
	requiredIndicator,
	helpIcon,
	alignment = 'column',
	sxMap,
	...otherProps
}) => {
	//Busca as informações do contexto do SysForm
	const controllerSysForm = useContext(SysFormContext);
	const inSysFormContext = hasValue(controllerSysForm);

	const refObject = !inSysFormContext ? null : useRef<ISysFormComponentRef>({ name, value: value || defaultValue });
	if (inSysFormContext) controllerSysForm.setRefComponent(refObject!);

	const schema = refObject?.current.schema;

	label = label || schema?.label;
	defaultValue = refObject?.current.value || schema?.defaultValue;
	readOnly = readOnly || controllerSysForm?.mode === 'view' || schema?.readOnly;
	options = options || refObject?.current?.options || ([] as any);
	showRequired = showRequired || !schema?.optional;

	const [valueState, setValueState] = useState<string>(defaultValue || '');
	const [visibleState, setVisibleState] = useState<boolean>(refObject?.current.isVisible ?? true);
	const [errorState, setErrorState] = useState<string | undefined>(error);
	const [optionsState, setOptionsState] = useState<Array<IOption> | undefined>(options);

	const [selectedOptions, setSelectedOptions] = useState<string[]>([] || [...defaultValue]);

	if (inSysFormContext)
		controllerSysForm.setInteractiveMethods({
			componentRef: refObject!,
			clearMethod: () => setValueState(''),
			setValueMethod: (value) => setValueState(value),
			changeVisibilityMethod: (visible) => setVisibleState(visible),
			setErrorMethod: (error) => setErrorState(error),
			setOptionsMethod: (options) => setOptionsState(options)
		});

	const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { checked } = event.target;
		if (checked) {
			setSelectedOptions((prevSelectedOptions) => [...prevSelectedOptions, event.target.name]);
			controllerSysForm?.onChangeComponentValue({ refComponent: refObject!, value: selectedOptions });
			onChange?.(event);
		} else {
			setSelectedOptions((prevSelectedOptions) => prevSelectedOptions.filter((option) => option !== event.target.name));
		}
	};

	if (!visibleState || options?.length === 0) return null;

	if (readOnly) {
		const viewValue = optionsState && optionsState.find((option) => option.value === valueState);
		return <SysViewField label={label} placeholder={viewValue?.label || '-'} />;
	}

	return (
		<FormControl error={!!error}>
			<SysLabelView
				label={label}
				tooltipMessage={tooltipMessage}
				disabled={disabled}
				placement={positionTooltip}
				helpIcon={helpIcon}
				showRequired={showRequired}
				requiredIndicator={requiredIndicator}
				sx={sxMap?.container}
			>
				<FormGroup sx={{ flexDirection: alignment === 'column' ? 'column' : 'row', ...sxMap?.formGroup }}>
					{options &&
						options.map((opt) => (
							<FormControlLabel
								key={opt.value}
								control={
									<Checkbox
										{...otherProps}
										onChange={handleCheckboxChange}
										name={opt.label}
										checked={selectedOptions.includes(opt.label)}
										sx={sxMap?.checkbox}
									/>
								}
								label={opt.label}
								sx={sxMap?.formControllLabel}
								disabled={disabled || loading}
							/>
						))}
				</FormGroup>
			</SysLabelView>
			<FormHelperText>{!!errorState}</FormHelperText>
		</FormControl>
	);
};
