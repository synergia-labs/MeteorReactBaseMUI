import React, { useEffect, useState } from 'react';
import SimpleLabelView from '/imports/ui/components/SimpleLabelView/SimpleLabelView';
import { hasValue } from '/imports/libs/hasValue';
import * as appStyle from '/imports/ui/materialui/styles';
import TextField from '@mui/material/TextField';
import InputBase from '@mui/material/InputBase';

export default ({ name, label, value, onChange, readOnly, error, ...otherProps }: IBaseSimpleFormComponent) => {
	if (readOnly) {
		return (
			<div key={name} style={{ display: 'flex', flexDirection: 'column' }}>
				<SimpleLabelView label={label} disabled={readOnly} />
				<TextField
					variant={'outlined'}
					key={name}
					value={value}
					error={!!error}
					disabled={!!readOnly}
					id={name}
					name={name}
					{...otherProps}
					label={null}
				/>
			</div>
		);
	}
	const [dateValue, setDateValue] = useState(hasValue(value) ? value : new Date());

	useEffect(() => {
		if (hasValue(value) && value !== dateValue) {
			setDateValue(hasValue(value) ? value : new Date());
		}
	}, [value]);

	if (otherProps.isNaked) {
		return (
			<InputBase
				key={name}
				onChange={onChange}
				value={value}
				error={!!error}
				disabled={!!readOnly}
				id={name}
				name={name}
				label={otherProps.labelDisable ? undefined : label}
				{...otherProps}
			/>
		);
	}

	const handleChange = (evt) => {
		const date = new Date(evt.target.value);
		onChange({ name, target: { name, value: date } });
	};

	return (
		<div
			key={name}
			style={{
				display: 'flex',
				flexDirection: 'column',
				...appStyle.fieldContainer
			}}>
			<SimpleLabelView label={label} disabled={readOnly} />
			<TextField
				variant={'outlined'}
				key={name}
				onChange={handleChange}
				value={
					dateValue && dateValue instanceof Date
						? dateValue.toISOString().split('T')[0]
						: new Date().toISOString().split('T')[0]
				}
				error={!!error}
				disabled={!!readOnly}
				id={name}
				name={name}
				label={null}
				type="date"
				InputLabelProps={{
					shrink: true
				}}
				{...otherProps}
			/>
		</div>
	);
};
