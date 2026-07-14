import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import localidades from './localidades.json';
import SimpleLabelView from '/imports/ui/components/SimpleLabelView/SimpleLabelView';
import type { IBaseSimpleFormComponent } from '/imports/ui/components/InterfaceBaseSimpleFormComponent';

interface LocationValue {
	municipio: string;
	distrito?: string | null;
	estado?: string;
}

interface LocationOption extends LocationValue {
	label: string;
}

interface Props extends IBaseSimpleFormComponent {
	estado?: string;
	value?: LocationValue;
}

const filterOptions = createFilterOptions<LocationOption>({
	matchFrom: 'any',
	stringify: (option) => option.label,
	ignoreAccents: true,
	ignoreCase: true,
	limit: 100
});

export default function SelectMunicipioDistritoField({
	name,
	label,
	estado,
	value,
	style,
	onChange,
	readOnly,
	help,
	error
}: Props) {
	const options: LocationOption[] = (localidades as Array<{ u: string; m: string; d?: string }>)
		.filter((entry) => entry.u === estado)
		.map((entry) => ({
			municipio: entry.m,
			distrito: entry.d ?? null,
			estado,
			label: `${entry.m}${entry.d ? ` - ${entry.d}` : ''}`
		}));
	const selected =
		options.find((option) => option.municipio === value?.municipio && option.distrito === (value?.distrito ?? null)) ??
		null;

	return (
		<div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
			{label ? <SimpleLabelView help={help} label={label} disabled={readOnly} /> : null}
			{readOnly ? (
				<TextField value={selected?.label ?? '-'} disabled />
			) : (
				<Autocomplete<LocationOption>
					id={name}
					options={options}
					value={selected}
					filterOptions={filterOptions}
					getOptionLabel={(option) => option.label}
					isOptionEqualToValue={(option, selectedOption) => option.label === selectedOption.label}
					onChange={(_event, option) => {
						const newValue = option ? { municipio: option.municipio, distrito: option.distrito, estado } : undefined;
						onChange?.({ name, target: { name, value: newValue } }, { name, value: newValue });
					}}
					sx={style}
					renderInput={(params) => <TextField {...params} error={!!error} />}
				/>
			)}
		</div>
	);
}
