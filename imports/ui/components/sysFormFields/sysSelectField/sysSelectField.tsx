import React, { useContext, useRef, useState } from 'react';
import { IOption, ISysFormComponent } from '../../InterfaceBaseSimpleFormComponent';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent, SelectProps } from '@mui/material/Select';
import { Collapse, SxProps, Theme } from '@mui/material';
import { SysFormContext } from '../../sysForm/sysForm';
import SysLabelView from '../../sysLabelView/sysLabelView';
import { SysViewField } from '../sysViewField/sysViewField';
import { hasValue } from '../../../../libs/hasValue';
import { ISysFormComponentRef } from '../../sysForm/typings';
import SysIcon from '../../../../ui/components/sysIcon/sysIcon';

interface ISysSelectFieldProps extends ISysFormComponent<Omit<SelectProps, 'variant'>> {
	defaultValue?: string;
	description?: string;
	menuNone?: boolean;
	menuNotSelected?: boolean;
	multiple?: boolean;
	sxMap?: {
		container: SxProps<Theme>;
		menuProps: SxProps<Theme> | null;
	};
}

export const SysSelectField: React.FC<ISysSelectFieldProps> = ({
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
	description,
	menuNone,
	menuNotSelected,
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
	showLabelAdornment = showLabelAdornment ?? (!!schema && !!schema?.optional);

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
		const selectedOption = optionsState?.find((option) => option.value === newValue);
		setValueState(selectedOption?.label || '');
		if (inSysFormContext) {
			controllerSysForm?.onChangeComponentValue({ refComponent: refObject!, value: newValue });
		}
		onChange?.(e);
	};

	if (readOnly) {
		const viewValue = optionsState && optionsState.find((option) => option.value === valueState);
		return (
			<SysViewField
				label={label}
				placeholder={viewValue?.label || '-'}
				showLabelAdornment={showLabelAdornment}
				labelAdornment={labelAdornment}
			/>
		);
	}

	return (
		<Collapse in={!!visibleState && options?.length !== 0} unmountOnExit sx={{ width: '100%' }}>
			<FormControl error={!!errorState} sx={sxMap?.container}>
				<SysLabelView
					label={label}
					showLabelAdornment={showLabelAdornment}
					labelAdornment={labelAdornment}
					disabled={disabled}
					showTooltip={showTooltip}
					tooltipMessage={tooltipMessage}
					tooltipPosition={tooltipPosition}>
					<Select
						{...otherProps}
						labelId={`${label}${name}`}
						id={name}
						value={valueState || ''}
						onChange={handleChange}
						displayEmpty
						disabled={disabled || loading}
						multiple={multiple}
						IconComponent={() => <SysIcon name={'arrowDropDown'} />}
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
				{!!errorState && <FormHelperText>{errorState}</FormHelperText>}
			</FormControl>
		</Collapse>
	);
};
