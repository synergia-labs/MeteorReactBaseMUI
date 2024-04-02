import React, { useContext, useState } from 'react';
import { SysFormContext } from '../../sysForm/sysForm';
import { ISysFormComponent } from '../../InterfaceBaseSimpleFormComponent';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import SysLabelView from '../../sysLabelView/sysLabelView';
import { SxProps, Theme } from '@mui/material';
import { SysViewField } from '../sysViewField/sysViewField';
import Box from '@mui/material/Box';

interface ISysDatePickerField extends ISysFormComponent<TextFieldProps> {
	sxMap?: {
		container?: SxProps<Theme>;
		textField?: SxProps<Theme>;
		boxContainer: SxProps<Theme>;
	};
	/** Posicionamento da Tooltip */
	positionTooltip?:
		| 'bottom-end'
		| 'bottom-start'
		| 'bottom'
		| 'left-end'
		| 'left-start'
		| 'left'
		| 'right-end'
		| 'right-start'
		| 'right'
		| 'top-end'
		| 'top-start'
		| 'top'
		| undefined;
	/** Ícone de ajuda */
	helpIcon?: boolean;
	/** posicao dos elementos */
	view?: 'linha' | 'coluna';
}

export const SysDatePickerField: React.FC<ISysDatePickerField> = ({
	name,
	label,
	value,
	disabled,
	onChange,
	readOnly,
	error,
	tooltipMessage,
	defaultValue,
	positionTooltip,
	helpIcon,
	sxMap,
	view = 'coluna',
	...otherProps
}) => {
	//Busca as informações do contexto do SysForm
	const { getSysFormComponentInfo } = useContext(SysFormContext);
	const sysFormController = getSysFormComponentInfo?.(name);

	defaultValue = defaultValue || sysFormController?.schema?.defaultValue;
	label = label || sysFormController?.schema?.label;
	readOnly = readOnly || sysFormController?.readOnly;
	error = error || sysFormController?.error;
	disabled = disabled || sysFormController?.disabled;
	defaultValue = defaultValue || value || sysFormController?.defaultValue;

	const [dateValue, setDateValue] = useState(defaultValue || new Date());

	const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = evt.target.value;

		if (!newValue) {
			const nullValue: null = null;
			sysFormController?.onChange({ name, value: nullValue });
			setDateValue(nullValue);
			return;
		}

		const date = new Date(newValue);

		if (!isNaN(date.getTime())) {
			date.setHours(date.getHours() + 10);
			sysFormController?.onChange({ name, value: date });
		}

		setDateValue(newValue);
	};

	const onBlur = () => {
		if (new Date(dateValue) !== new Date(value)) {
			try {
				const date = new Date(dateValue);
				if (!isNaN(date.getTime())) {
					date.setHours(date.getHours() + 10);
					sysFormController?.onChange({ name, value: date });
				}
			} catch (e) {
				console.log('Data Inválida', e);
			}
		}
	};

	const formatDate = (dateValue: Date) => {
		const data = new Date(dateValue);
		const formattedDate = data.toLocaleDateString('pt-BR').split('/').reverse().join('-');
		return formattedDate;
	};

	if (readOnly)
		return <SysViewField label={label} placeholder={typeof dateValue != 'string' ? '-' : dateValue || '-'} />;

	return (
		<Box sx={{ display: 'flex', alignItems: 'center', ...sxMap?.boxContainer }}>
			<SysLabelView
				label={label}
				tooltipMessage={tooltipMessage}
				disabled={disabled}
				placement={positionTooltip}
				helpIcon={helpIcon}
				sx={sxMap?.container}>
				{view === 'coluna' && (
					<TextField
						type="date"
						onBlur={onBlur}
						onChange={handleChange}
						value={dateValue && dateValue instanceof Date ? formatDate(dateValue) : dateValue}
						error={!!error}
						disabled={disabled || sysFormController?.loading}
						name={name}
						sx={sxMap?.textField}
					/>
				)}
			</SysLabelView>
			{view === 'linha' && (
				<TextField
					type="date"
					onBlur={onBlur}
					onChange={handleChange}
					value={dateValue && dateValue instanceof Date ? formatDate(dateValue) : dateValue}
					error={!!error}
					disabled={disabled || sysFormController?.loading}
					name={name}
					sx={sxMap?.textField}
				/>
			)}
		</Box>
	);
};
