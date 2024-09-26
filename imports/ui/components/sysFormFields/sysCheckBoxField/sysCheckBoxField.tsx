import React, { useContext, useRef, useState } from 'react';
import Checkbox, { CheckboxProps } from '@mui/material/Checkbox';
import { SxProps, Theme } from '@mui/material';
import { IOption, ISysFormComponent } from '../../InterfaceBaseSimpleFormComponent';
import { SysFormContext } from '../../sysForm/sysForm';
import FormControlLabel from '@mui/material/FormControlLabel';
import SysLabelView from '../../sysLabelView/sysLabelView';
import FormGroup from '@mui/material/FormGroup';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import { hasValue } from '../../../../libs/hasValue';
import { ISysFormComponentRef } from '../../sysForm/typings';
import { SysViewField } from '../sysViewField/sysViewField';
import { sysSizing } from '../../../../ui/materialui/styles';

interface ISysCheckBox extends ISysFormComponent<CheckboxProps> {
	/** Estilo do componente.*/
	sxMap?: {
		container?: SxProps<Theme>;
		formGroup?: SxProps<Theme>;
		formControlLabel?: SxProps<Theme>;
		checkbox?: SxProps<Theme>;
	};
	/** Posicionamento dos elementos */
	childrenAlignment?: 'row' | 'column';
}

export const SysCheckBox: React.FC<ISysCheckBox> = ({
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
	showLabelAdornment,
	labelAdornment,
	showTooltip,
	tooltipMessage,
	tooltipPosition,
	childrenAlignment = 'column',
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
	showLabelAdornment = showLabelAdornment ?? (!!schema && !!schema?.optional);

	const [valueState, setValueState] = useState<Array<string>>(defaultValue || []);
	const [visibleState, setVisibleState] = useState<boolean>(refObject?.current.isVisible ?? true);
	const [errorState, setErrorState] = useState<string | undefined>(error);
	const [optionsState, setOptionsState] = useState<Array<IOption> | undefined>(options);

	const [selectedOptions, setSelectedOptions] = useState<any[]>([] || [...defaultValue]);

	if (inSysFormContext)
		controllerSysForm.setInteractiveMethods({
			componentRef: refObject!,
			clearMethod: () => {
				setValueState([]);
				setSelectedOptions([]);
			},
			setValueMethod: (value) => setValueState(value),
			changeVisibilityMethod: (visible) => setVisibleState(visible),
			setErrorMethod: (error) => setErrorState(error),
			setOptionsMethod: (options) => setOptionsState(options)
		});

	//setSelectedOptions((prevSelectedOptions) => [...prevSelectedOptions, event.target.name]);
	const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { checked } = event.target;
		const value = optionsState?.find((item) => item.label === event.target.name)?.value;
		if (!hasValue(value)) return;
		const updatedOptions = checked ? [...selectedOptions, value] : selectedOptions.filter((option) => option !== value);
		setSelectedOptions(updatedOptions);
		if (inSysFormContext)
			controllerSysForm?.onChangeComponentValue?.({ refComponent: refObject!, value: updatedOptions });
		onChange?.(event);
	};

	React.useEffect(() => {
		if (valueState?.length > 0) {
			setSelectedOptions(valueState);
		}
	}, [valueState]);

	if (!visibleState || optionsState?.length === 0) return null;

	if (readOnly) {
		return (
			<SysViewField
				label={label}
				placeholder={
					valueState && valueState?.map
						? valueState?.map((value) => optionsState?.find((opt) => opt.value === value)?.label).join?.(', ') || '-'
						: undefined
				}
				showLabelAdornment={showLabelAdornment}
				labelAdornment={labelAdornment}
			/>
		);
	}

	return (
		<FormControl error={!!error} sx={sxMap?.container}>
			<SysLabelView
				label={label}
				showLabelAdornment={showLabelAdornment}
				labelAdornment={labelAdornment}
				disabled={disabled}
				showTooltip={showTooltip}
				tooltipMessage={tooltipMessage}
				tooltipPosition={tooltipPosition}>
				<FormGroup sx={{ flexDirection: childrenAlignment, gap: sysSizing.spacingRemMd, ...sxMap?.formGroup }}>
					{optionsState?.map((opt) => (
						<FormControlLabel
							key={opt.value}
							control={
								<Checkbox
									{...otherProps}
									onChange={handleCheckboxChange}
									name={opt.label}
									checked={selectedOptions.includes(opt.value)}
									sx={sxMap?.checkbox}
								/>
							}
							label={opt.label}
							sx={sxMap?.formControlLabel}
							disabled={disabled || loading}
						/>
					))}
				</FormGroup>
			</SysLabelView>
			{!!errorState && <FormHelperText>{errorState}</FormHelperText>}
		</FormControl>
	);
};
