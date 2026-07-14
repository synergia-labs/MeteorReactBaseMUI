import React from 'react';
import FormControl from '@mui/material/FormControl';
import SimpleLabelView from '/imports/ui/components/SimpleLabelView/SimpleLabelView';
import type { IBaseSimpleFormComponent } from '/imports/ui/components/InterfaceBaseSimpleFormComponent';

export default function ColorPicker({ name, label, value, onChange, readOnly, error }: IBaseSimpleFormComponent) {
	const color = typeof value === 'string' && /^#[0-9a-f]{6}$/i.test(value) ? value : '#ffffff';

	return (
		<FormControl key={name} error={!!error} sx={{ gap: 1 }}>
			<SimpleLabelView label={label ?? ''} disabled={readOnly} />
			<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 8 }}>
				<input
					aria-label={label ?? 'Cor'}
					type="color"
					name={name}
					value={color}
					disabled={readOnly}
					onChange={(event) =>
						onChange?.({ name, target: { name, value: event.target.value } }, { name, value: event.target.value })
					}
				/>
				<span>{color}</span>
			</div>
		</FormControl>
	);
}
