import React from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import SimpleLabelView from '/imports/ui/components/SimpleLabelView/SimpleLabelView';
import type { IBaseSimpleFormComponent } from '/imports/ui/components/InterfaceBaseSimpleFormComponent';

interface FormatOption {
	value: string;
	label: string;
}

interface FormattedDateProps extends IBaseSimpleFormComponent {
	formatSchemaName: string;
	outroSchemaName: string;
	schemaAux: Record<string, { options?: FormatOption[] }>;
	doc: Record<string, any>;
	labelAddOn?: string;
}

const toInputDate = (value: unknown) => {
	if (!value) return '';
	const date = value instanceof Date ? value : new Date(String(value));
	return Number.isNaN(date.getTime()) ? '' : date.toISOString().slice(0, 10);
};

export default function FormattedDatePicker({
	name,
	value,
	onChange,
	readOnly,
	error,
	formatSchemaName,
	outroSchemaName,
	schemaAux,
	doc,
	labelAddOn = ''
}: FormattedDateProps) {
	const [format, setFormat] = React.useState<string>(doc[formatSchemaName] || 'data');
	const [other, setOther] = React.useState<string>(doc[outroSchemaName] || '');
	const [dateValue, setDateValue] = React.useState(() => toInputDate(value));
	const [year, setYear] = React.useState(value ? new Date(value).getFullYear().toString() : '');
	const options = schemaAux[formatSchemaName]?.options ?? [];

	const emit = (fieldName: string, fieldValue: unknown) =>
		onChange?.(
			{ name: fieldName, target: { name: fieldName, value: fieldValue } },
			{ name: fieldName, value: fieldValue }
		);

	const changeFormat = (event: SelectChangeEvent) => {
		setFormat(event.target.value);
		emit(formatSchemaName, event.target.value);
	};

	const changeDate = (rawValue: string) => {
		setDateValue(rawValue);
		emit(name, rawValue ? new Date(`${rawValue}T12:00:00`) : null);
	};

	const changeYear = (rawValue: string) => {
		const normalized = rawValue.replace(/\D/g, '').slice(0, 4);
		setYear(normalized);
		emit(name, normalized.length === 4 ? new Date(Number(normalized), 11, 31) : null);
	};

	return (
		<div style={{ display: 'flex', gap: 12, width: '100%', flexWrap: 'wrap' }}>
			<div style={{ display: 'flex', flexDirection: 'column', minWidth: 180 }}>
				<SimpleLabelView label={`Formato Data ${labelAddOn}`} disabled={readOnly} />
				<Select value={format} onChange={changeFormat} disabled={readOnly}>
					{options.map((option) => (
						<MenuItem key={option.value} value={option.value}>
							{option.label}
						</MenuItem>
					))}
				</Select>
			</div>
			{format === 'data' || format === 'desconhecida' ? (
				<TextField
					label={`Data ${labelAddOn}`}
					type="date"
					value={dateValue}
					onChange={(event) => changeDate(event.target.value)}
					disabled={readOnly || format === 'desconhecida'}
					error={!!error}
					inputProps={{ max: '9999-12-31' }}
				/>
			) : null}
			{format === 'somenteAno' || format === 'outrosAno' ? (
				<TextField
					label={`Ano ${labelAddOn}`}
					value={year}
					onChange={(event) => changeYear(event.target.value)}
					disabled={readOnly}
					error={!!error}
				/>
			) : null}
			{format === 'outrosAno' ? (
				<TextField
					label="Outros"
					value={other}
					onChange={(event) => {
						setOther(event.target.value);
						emit(outroSchemaName, event.target.value);
					}}
					disabled={readOnly}
				/>
			) : null}
		</div>
	);
}
