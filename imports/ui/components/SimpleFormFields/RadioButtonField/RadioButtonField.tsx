import React from 'react';
import type { IBaseSimpleFormComponent } from '/imports/ui/components/InterfaceBaseSimpleFormComponent';
import SysIcon from '/imports/ui/components/sysIcon/sysIcon';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import SimpleLabelView from '/imports/ui/components/SimpleLabelView/SimpleLabelView';
import { hasValue } from '/imports/libs/hasValue';
import * as appStyle from '/imports/ui/materialui/styles';
import { radioButtonStyle } from './RadioButtonFieldStyle';

import { Typography } from '@mui/material';

type LegacyOption = string | { label: string; value: string };
const optionValue = (option: LegacyOption) => (typeof option === 'string' ? option : option.value);
const optionLabel = (option: LegacyOption) => (typeof option === 'string' ? option : option.label);

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
	const list: LegacyOption[] | null =
		otherProps.options && hasValue(otherProps.options)
			? (otherProps.options as LegacyOption[])
			: schema && hasValue(schema.options)
				? (schema.options as LegacyOption[])
				: null;

	const handleChangeCheck = (event: React.BaseSyntheticEvent, itemCheck: string) => {
		onChange?.({ name, target: { name, value: itemCheck } }, { name, value: itemCheck });
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
					{list.map((itemCheck: LegacyOption, index: number) => (
						<FormControlLabel
							key={optionValue(itemCheck)}
							value={optionValue(itemCheck)}
							id={optionValue(itemCheck)}
							label={optionLabel(itemCheck)}
							control={
								<Radio
									key={`${index}`}
									color="secondary"
									size="small"
									inputProps={{ 'aria-label': optionLabel(itemCheck) }}
								/>
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
						.filter((itemCheck: LegacyOption) => !!value && value === optionValue(itemCheck))
						.map((itemCheck: LegacyOption, index: number) => (
							<div
								key={`${index}`}
								style={{
									color: value !== optionValue(itemCheck) ? '#999' : undefined,
									display: 'flex'
								}}>
								{value === optionValue(itemCheck) ? <SysIcon name={'check'} style={{ paddingRight: 10 }} /> : null}
								<Typography component={'p'}>{optionLabel(itemCheck)}</Typography>
							</div>
						))}
				</div>
			) : null}
		</FormControl>
	);
};
