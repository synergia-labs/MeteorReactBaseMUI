import React, { useState } from 'react';
import type { IBaseSimpleFormComponent } from '/imports/ui/components/InterfaceBaseSimpleFormComponent';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import SimpleLabelView from '/imports/ui/components/SimpleLabelView/SimpleLabelView';
import { hasValue } from '/imports/libs/hasValue';
import Checkbox from '@mui/material/Checkbox';
import _ from 'lodash';
import { toggleSwitchStyle } from './ToggleFieldStyle';

export default ({ name, label, value, onChange, readOnly, error, ...otherProps }: IBaseSimpleFormComponent) => {
	const [loadRender, setLoadRender] = useState(0);

	const handleChangeCheck = (event: React.BaseSyntheticEvent, itemCheck: string) => {
		if (!readOnly) {
			const newValue: Record<string, boolean> = typeof value === 'object' && value !== null ? { ...value } : {};
			newValue[itemCheck] = event.target.checked;
			onChange?.({ target: { value: newValue } }, { name, value: newValue });
			setLoadRender(loadRender + 1);
		}
	};

	const handleChangeSwitch = (event: React.BaseSyntheticEvent) => {
		if (!readOnly) {
			const value: Record<string, boolean> = {};
			value[name] = event.target.checked;
			onChange?.({ target: { value } }, { name, value });
		}
	};

	return (
		<div style={error ? toggleSwitchStyle.fieldError : undefined}>
			<SimpleLabelView label={label ?? ''} />

			{otherProps && hasValue(otherProps.checksList) ? (
				<div>
					{(otherProps.checksList as string[]).map((itemCheck: string) => (
						<FormControlLabel
							style={toggleSwitchStyle.checksList}
							control={
								<Checkbox
									checked={!!value?.[itemCheck]}
									name={itemCheck}
									onChange={(event) => handleChangeCheck(event, itemCheck)}
								/>
							}
							key={itemCheck}
							value={value}
							id={itemCheck}
							label={itemCheck}
							{..._.omit(otherProps, ['disabled', 'checked'])}
						/>
					))}
				</div>
			) : (
				<FormControlLabel
					style={toggleSwitchStyle.checksList}
					control={<Switch checked={!!value?.[name]} onChange={handleChangeSwitch} name={name} />}
					key={name}
					value={value}
					id={name}
					name={name}
					label={value ? 'Ativo' : 'Inativo'}
					{..._.omit(otherProps, ['disabled', 'checked'])}
				/>
			)}
		</div>
	);
};
