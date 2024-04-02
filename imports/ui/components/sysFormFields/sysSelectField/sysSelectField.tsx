import React, { useContext, useState } from 'react';
import { ISysFormComponent } from '../../InterfaceBaseSimpleFormComponent';
import { ListItemText, MenuItem, Select, SelectChangeEvent, SelectProps, SxProps, Theme } from '@mui/material';
import { SysFormContext } from '../../sysForm/sysForm';
import SysLabelView from '../../sysLabelView/sysLabelView';
import { SysViewField } from '../sysViewField/sysViewField';

interface ISysSelectFieldProps extends ISysFormComponent<SelectProps> {
	options?: Array<{ value: any; label: string; description?: string }>;
	defaultValue?: string;
	description?: string;
	menuNone?: boolean;
	menuNotSelected?: boolean;
	multiple?: boolean;
	sxMap?: {
		menuProps: SxProps<Theme> | null;
	};
}

export const SysSelectField: React.FC<ISysSelectFieldProps> = ({
	name,
	label,
	value,
	disabled,
	onChange,
	readOnly,
	error,
	tooltipMessage,
	defaultValue,
	options,
	description,
	menuNone,
	menuNotSelected,
	multiple,
	renderValue,
	placeholder,
	sxMap,
	...otherProps
}) => {
	const { getSysFormComponentInfo } = useContext(SysFormContext);
	const sysFormController = getSysFormComponentInfo?.(name);

	label = label || sysFormController?.schema?.label;
	defaultValue = defaultValue || value || sysFormController?.defaultValue;
	disabled = disabled || sysFormController?.disabled;
	error = error || sysFormController?.error;
	readOnly = readOnly || sysFormController?.readOnly;
	options = options || sysFormController?.schema?.options || ([] as any);
	multiple = multiple || sysFormController?.schema?.multiple;

	const [valueText, setValueText] = useState(defaultValue);

	const handleChange = (e: SelectChangeEvent) => {
		const newValue = e.target.value;
		setValueText(newValue);
		sysFormController?.onChange({ name, value: newValue });
	};

	if (readOnly) {
		const viewValue = options?.find((option) => option.value === valueText)?.label;
		return <SysViewField label={label} placeholder={viewValue || '-'} />;
	}

	return (
		<SysLabelView label={label}>
			<Select
				labelId={`${label}${name}`}
				id={name}
				value={valueText}
				onChange={handleChange}
				disabled={disabled || sysFormController?.loading}
				multiple={multiple}>
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
	);
};
