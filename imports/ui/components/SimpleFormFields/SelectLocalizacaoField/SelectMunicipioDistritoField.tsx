import React from 'react';

import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';

import localidades from './localidades.json';
import SimpleLabelView from '/imports/ui/components/SimpleLabelView/SimpleLabelView';
import * as appStyle from '/imports/ui/materialui/styles';

const filterOptions = createFilterOptions({
	matchFrom: 'any',
	stringify: (option) => option.label,
	ignoreAccents: true,
	ignoreCase: true,
	limit: 100
});

interface IOtherProps {
	options: {
		value: any;
		label: string;
	}[];
	mode: any;
	estadoOn: boolean;
	distritoOn: boolean;
	municipioOn: boolean;
}

export default ({
	estadoOn = true,
	showRadios = true,
	distritoOn = true,
	municipioOn = true,
	name,
	label,
	estado,
	value = {},
	style,
	onChange,
	readOnly,
	help,
	error,
	...otherProps
}: IBaseSimpleFormComponent & IOtherProps) => {
	const handleOnChange = (evt, selected) => {
		if (!selected) {
			onChange({ name, target: { name, value: undefined } }, { name, value: undefined });
		} else {
			const value = JSON.parse(selected.value);
			onChange({ name, target: { name, value } }, { name, value });
		}
	};

	if (readOnly) {
		return (
			<div
				key={name}
				style={{
					width: '100%',
					display: 'flex',
					flexDirection: 'column',
					...appStyle.fieldContainer
				}}
				key={name}>
				<SimpleLabelView help={help} label={label} disabled={readOnly} />
				<TextField value={value && value.municipio ? value : '-'} disabled label={null} />
			</div>
		);
	}

	const initialValue =
		!!value && Object.keys(value).length > 0
			? `${value.municipio} ${value.distrito ? ' - ' + value.distrito : ''}`
			: undefined;

	const fieldProps = {
		inputValue: initialValue,
		value: !!value && Object.keys(value).length > 0 ? JSON.stringify(value) : undefined,
		defaultValue: !!value && Object.keys(value).length > 0 ? JSON.stringify(value) : undefined
	};

	if (!initialValue) {
		delete fieldProps.inputValue;
		delete fieldProps.value;
		delete fieldProps.defaultValue;
	}

	if (readOnly) {
	}

	return (
		<div
			style={{
				width: '100%',
				display: 'flex',
				flexDirection: 'column',
				...appStyle.fieldContainer
			}}
			key={name + initialValue ? 'hasValue' : 'noValue'}>
			{label ? <SimpleLabelView help={help} label={label} disabled={readOnly} /> : null}
			{initialValue ? (
				<Autocomplete
					key={name + 'hasValue'}
					id={name}
					name={name}
					noOptionsText={'Nenhuma opção'}
					autoSelect={true}
					clearOnEscape={true}
					filterOptions={filterOptions}
					options={localidades
						.filter(function (entry) {
							return entry.u == estado;
						})
						.map((l) => ({
							value: JSON.stringify({
								municipio: l.m,
								distrito: l.d ? l.d : null
							}),
							label: `${l.m} ${l.d ? ' - ' + l.d : ''}`
						}))}
					getOptionLabel={(option) => (option.label ? option.label : '')}
					style={style}
					onChange={handleOnChange}
					error={!!error}
					disabled={!!readOnly}
					renderInput={(params) => (
						<TextField error={!!error} {...params} key={name + 'inputHasValue'} id={name + 'input'} label={null} />
					)}
					{...fieldProps}
				/>
			) : (
				<Autocomplete
					key={name + 'noValue'}
					id={name}
					name={name}
					noOptionsText={'Nenhuma opção'}
					autoSelect={true}
					clearOnEscape={true}
					openOnFocus={true}
					blurOnSelect={true}
					filterOptions={filterOptions}
					options={localidades
						.filter(function (entry) {
							return entry.u == estado;
						})
						.map((l) => ({
							value: JSON.stringify({
								municipio: l.m,
								distrito: l.d ? l.d : null
							}),
							label: `${l.m} ${l.d ? ' - ' + l.d : ''}`
						}))}
					getOptionLabel={(option) => (option.label ? option.label : '')}
					style={
						style || {
							width: '100%',
							backgroundColor: '#FFF',
							height: 38
						}
					}
					onChange={handleOnChange}
					error={!!error}
					disabled={!!readOnly}
					renderInput={(params) => (
						<TextField error={!!error} key={name + 'inputNoValue'} id={name + 'input'} {...params} label={null} />
					)}
				/>
			)}
		</div>
	);
};
