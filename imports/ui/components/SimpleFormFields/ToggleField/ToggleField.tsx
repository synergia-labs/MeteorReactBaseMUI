import React from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import SimpleLabelView from '/imports/ui/components/SimpleLabelView/SimpleLabelView';
import { toggleSwitchStyle } from './ToggleFieldStyle';

export default ({ name, label, value, onChange, readOnly, error, ...otherProps }: IBaseSimpleFormComponent) => {
	const handleChangeSwitch = (event: React.BaseSyntheticEvent) => {
		if (!readOnly) {
			onChange({ name, target: { name, value: event.target.checked } }, { name, value: event.target.checked });
		}
	};

	return (
		<div style={error ? toggleSwitchStyle.fieldError : undefined}>
			<SimpleLabelView label={label} disabled={readOnly} />
			<FormControlLabel
				control={<Switch color={'primary'} checked={!!value} onChange={handleChangeSwitch} />}
				key={name}
				name={name}
				id={name}
				label={''}
			/>
		</div>
	);
};
