import React from 'react';
import type { IBaseSimpleFormComponent } from '/imports/ui/components/InterfaceBaseSimpleFormComponent';
import SimpleLabelView from '/imports/ui/components/SimpleLabelView/SimpleLabelView';
import { hasValue } from '/imports/libs/hasValue';
import FormControl from '@mui/material/FormControl';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { toggleButtonStyle } from './ToggleButtonFieldStyle';
import SysIcon from '/imports/ui/components/sysIcon/sysIcon';

type LegacyOption = string | { label: string; value: string | number };
const optionValue = (option: LegacyOption) => (typeof option === 'string' ? option : option.value);
const optionLabel = (option: LegacyOption) => (typeof option === 'string' ? option : option.label);

export default ({ name, label, value, onChange, readOnly, schema, error, ...otherProps }: IBaseSimpleFormComponent) => {
	const list: LegacyOption[] | null =
		otherProps.options && hasValue(otherProps.options)
			? otherProps.options
			: schema && hasValue(schema.options)
				? (schema.options as LegacyOption[])
				: null;

	const handleChangeCheck = (event: React.BaseSyntheticEvent, itemCheck: string) => {
		onChange?.({ name, target: { name, value: itemCheck } }, { name, value: itemCheck });
	};

	return (
		<FormControl component="fieldset" style={error ? toggleButtonStyle.fieldError : undefined}>
			<SimpleLabelView label={label ?? ''} />
			{!readOnly && list ? (
				<ToggleButtonGroup
					id="radioGroup"
					value={value}
					exclusive
					onChange={handleChangeCheck}
					style={toggleButtonStyle.radio}>
					{list.map((itemCheck: LegacyOption) => {
						return (
							<ToggleButton
								style={{ flex: 1 }}
								key={String(optionValue(itemCheck))}
								value={optionValue(itemCheck)}
								id={String(optionValue(itemCheck))}>
								{optionLabel(itemCheck)}
							</ToggleButton>
						);
					})}
				</ToggleButtonGroup>
			) : list ? (
				<div
					style={{
						display: 'flex',
						flexDirection: 'row',
						alignItems: 'center',
						flexWrap: 'wrap',
						width: '100%'
					}}>
					{list.map((itemCheck: LegacyOption) => {
						return (
							<div
								style={{
									marginLeft: 20,
									color: value !== optionValue(itemCheck) ? '#999' : undefined
								}}>
								{value === optionValue(itemCheck) ? <SysIcon name="check" style={{ fontSize: 15 }} /> : null}
								{optionLabel(itemCheck)}
							</div>
						);
					})}
				</div>
			) : null}
		</FormControl>
	);
};
