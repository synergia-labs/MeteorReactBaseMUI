import React from 'react';
import FormControl from '@mui/material/FormControl';
import SimpleLabelView from '/imports/ui/components/SimpleLabelView/SimpleLabelView';
import { CirclePicker } from 'react-color';

export default ({ name, renderValue, label, value, onChange, readOnly, error, ...otherProps }) => {
	const handleChange = (color) => {
		if (color) {
			console.log('Color', color);
			onChange({ name, target: { name, value: color.hex } });
		}
	};

	if (readOnly) {
		return (
			<FormControl key={name}>
				<SimpleLabelView label={label} disabled={readOnly} />
				<div
					style={{
						display: 'flex',
						flexDirection: 'row',
						alignItems: 'center'
					}}>
					<div
						style={{
							marginRight: 8,
							width: 40,
							height: 25,
							backgroundColor: value || '#FFF'
						}}
					/>
					{value || '#FFF'}
				</div>
			</FormControl>
		);
	}

	return (
		<FormControl key={name}>
			<SimpleLabelView label={label} />
			<CirclePicker name={'color'} color={value || '#FFF'} onChange={handleChange} {...otherProps} />
		</FormControl>
	);
};
