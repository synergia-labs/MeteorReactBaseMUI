import React, { useContext, useRef, useState } from 'react';
import { IOption, ISysFormComponent } from '../../InterfaceBaseSimpleFormComponent';
import {
	FormControl,
	ListItemText,
	MenuItem,
	Select,
	SelectChangeEvent,
	SelectProps,
	SxProps,
	Theme
} from '@mui/material';
import { SysFormContext } from '../../sysForm/sysForm';
import SysLabelView from '../../sysLabelView/sysLabelView';
import { SysViewField } from '../sysViewField/sysViewField';
import { hasValue } from '/imports/libs/hasValue';
import { ISysFormComponentRef } from '../../sysForm/typings';

interface ISysSelectFieldProps extends ISysFormComponent<SelectProps> {
	//options?: Array<{ value: any; label: string; description?: string }>;
	defaultValue?: string;
	description?: string;
	menuNone?: boolean;
	menuNotSelected?: boolean;
	multiple?: boolean;
	sxMap?: {
		container: SxProps<Theme>;
		menuProps: SxProps<Theme> | null;
	};
	placeholder?: string;
}

export const SysSelectField: React.FC<ISysSelectFieldProps> = ({
	name,
	label,
	value,
	disabled,
	loading,
	onChange,
	readOnly,
	error,
	tooltipMessage,
	defaultValue,
	options,
	description,
	menuNone,
	menuNotSelected,
	positionTooltip,
	helpIcon,
	multiple,
	renderValue,
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
	defaultValue = refObject?.current.value || schema?.defaultValue;
	multiple = multiple || schema?.multiple;

	disabled = disabled || controllerSysForm?.disabled;
	readOnly = readOnly || controllerSysForm?.mode === 'view' || schema?.readOnly;
	options = options || refObject?.current?.options || ([] as any);

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

	const handleChange = (e: SelectChangeEvent) => {
		const newValue = e.target.value;
		setValueState(newValue);
		if (inSysFormContext) {
			controllerSysForm?.onChangeComponentValue({ refComponent: refObject!, value: newValue });
		}
		onChange?.(e);
	};

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
				sx={sxMap?.container}>
				<Select
					{...otherProps}
					labelId={`${label}${name}`}
					id={name}
					value={valueState}
					onChange={handleChange}
					disabled={disabled || loading}
					multiple={multiple}
					renderValue={(options) => {
						if (options?.length === 0) {
							return <em>{placeholder}</em>;
						}
					}}>
					{options?.length === 0 ? (
						<MenuItem id={'NoValues'} disabled value="">
							<ListItemText primary="Nenhuma opção para selecionar" />
						</MenuItem>
					) : (
						options?.map((option) => (
							<MenuItem key={option.value} value={option.value}>
								{option.label}
							</MenuItem>
						))
					)}
				</Select>
			</SysLabelView>
		</FormControl>
	);
};
