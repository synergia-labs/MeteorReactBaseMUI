import React, { useContext, useRef, useState } from 'react';
import { IOption, ISysFormComponent } from '../../InterfaceBaseSimpleFormComponent';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Select,{ SelectChangeEvent, SelectProps,} from '@mui/material/Select';
import { SxProps, Theme } from '@mui/material';
import { SysFormContext } from '../../sysForm/sysForm';
import SysLabelView from '../../sysLabelView/sysLabelView';
import { SysViewField } from '../sysViewField/sysViewField';
import { hasValue } from '/imports/libs/hasValue';
import { ISysFormComponentRef } from '../../sysForm/typings';

interface ISysSelectFieldProps extends ISysFormComponent<Omit<SelectProps, 'variant'>> {
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

	label = label || schema?.label;
	defaultValue = refObject?.current.value || schema?.defaultValue;
	multiple = multiple || schema?.multiple;

	disabled = disabled || controllerSysForm?.disabled;
	readOnly = readOnly || controllerSysForm?.mode === 'view' || schema?.readOnly;
	options = options || refObject?.current?.options || ([] as any);
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

	const handleChange = (e: SelectChangeEvent) => {
		const newValue = e.target.value;
		setValueState(Array.isArray(newValue) ? newValue.join(',') : (newValue as string));
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
				showRequired={showRequired}
				requiredIndicator={requiredIndicator}
				sx={sxMap?.container}>
				<Select
					{...otherProps}
					labelId={`${label}${name}`}
					id={name}
					value={valueState || ''}
					onChange={handleChange}
					displayEmpty
					disabled={disabled || loading}
					multiple={multiple}
					renderValue={(options) => {
						if (!hasValue(options)) {
							return (
								<Typography variant="body1" color={'text.disabled'}>
									{placeholder}
								</Typography>
							);
						}
						return options;
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
			<FormHelperText>{errorState}</FormHelperText>
		</FormControl>
	);
};
