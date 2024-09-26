import React from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import SimpleLabelView from '/imports/ui/components/SimpleLabelView/SimpleLabelView';
import { hasValue } from '/imports/libs/hasValue';
import * as appStyle from '/imports/ui/materialui/styles';
import { radioButtonStyle } from './RadioButtonFieldStyle';

import { Typography } from '@mui/material';

export default ({
	name,
	label,
	value,
	onChange,
	readOnly,
	schema,
	error,
	help,
	...otherProps
}: IBaseSimpleFormComponent) => {
	const list =
		otherProps.options && hasValue(otherProps.options)
			? otherProps.options
			: schema && hasValue(schema.options)
				? schema.options
				: null;

	const handleChangeCheck = (event: React.BaseSyntheticEvent, itemCheck: string) => {
		onChange({ name, target: { name, value: itemCheck } }, { name, value: itemCheck });
	};

	const valueRadio = Array.isArray(value) ? value[0] && value[0] : value;

	return (
		<FormControl
			component="fieldset"
			style={{
				...(error ? radioButtonStyle.fieldError : {}),
				...appStyle.fieldContainer
			}}>
			{label ? <SimpleLabelView label={label} help={help} disabled={readOnly} /> : null}
			{!readOnly && list ? (
				<RadioGroup id="radioGroup" value={valueRadio} onChange={handleChangeCheck} style={radioButtonStyle.radio}>
					{list.map((itemCheck, index) => (
						<FormControlLabel
							key={itemCheck.value}
							value={itemCheck.value}
							id={itemCheck.value}
							label={itemCheck.label}
							control={
								<Radio key={`${index}`} color="secondary" size="small" inputProps={{ 'aria-label': itemCheck.label }} />
							}
						/>
					))}
				</RadioGroup>
			) : list ? (
				<div
					style={{
						display: 'flex',
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'flex-start',
						flexWrap: 'wrap',
						width: '100%'
					}}>
					{list
						.filter((itemCheck) => !!value && (value === itemCheck || value === itemCheck.value))
						.map((itemCheck, index) => (
							<div
								key={`${index}`}
								style={{
									color: value !== itemCheck && value !== itemCheck.value ? '#999' : undefined,
									display: 'flex'
								}}>
								{value === itemCheck || value === itemCheck.value ? <SysIcon name={'check'} style={{ paddingRight: 10 }} /> : ''}
								<Typography component={'p'}>{itemCheck.label || itemCheck}</Typography>
							</div>
						))}
				</div>
			) : null}
		</FormControl>
	);
};
