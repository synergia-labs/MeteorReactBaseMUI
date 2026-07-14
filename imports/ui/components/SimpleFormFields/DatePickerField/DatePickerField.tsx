import React from 'react';
import TextField from '@mui/material/TextField';
import SimpleLabelView from '/imports/ui/components/SimpleLabelView/SimpleLabelView';
import type { IBaseSimpleFormComponent } from '/imports/ui/components/InterfaceBaseSimpleFormComponent';

export interface IDatePicker extends IBaseSimpleFormComponent {
	min?: string;
	containerStyle?: React.CSSProperties;
}

const toInputDate = (value: unknown) => {
	if (!value) return '';
	const date = value instanceof Date ? value : new Date(String(value));
	return Number.isNaN(date.getTime()) ? '' : date.toISOString().slice(0, 10);
};

export default function DatePicker({
	name,
	label,
	value,
	onChange,
	readOnly,
	error,
	containerStyle,
	min
}: IDatePicker) {
	const [dateValue, setDateValue] = React.useState(() => toInputDate(value));

	React.useEffect(() => setDateValue(toInputDate(value)), [value]);

	const emitValue = (rawValue: string) => {
		setDateValue(rawValue);
		const newValue = rawValue ? new Date(`${rawValue}T12:00:00`) : null;
		onChange?.({ name, target: { name, value: newValue } }, { name, value: newValue });
	};

	return (
		<div style={{ display: 'flex', flexDirection: 'column', width: '100%', ...containerStyle }}>
			<SimpleLabelView label={label ?? ''} disabled={readOnly} />
			<TextField
				value={readOnly && dateValue ? new Date(`${dateValue}T12:00:00`).toLocaleDateString('pt-BR') : dateValue}
				onChange={(event) => emitValue(event.target.value)}
				error={!!error}
				disabled={!!readOnly}
				id={name}
				name={name}
				type={readOnly ? 'text' : 'date'}
				inputProps={{ min }}
			/>
		</div>
	);
}
