import React from 'react';
import FormGroup from '@mui/material/FormGroup';
import TextField from '@mui/material/TextField';
import SimpleLabelView from '/imports/ui/components/SimpleLabelView/SimpleLabelView';
import type { IBaseSimpleFormComponent } from '/imports/ui/components/InterfaceBaseSimpleFormComponent';

interface MapPosition {
	lat: number;
	lng: number;
}

interface MapsFieldValue {
	position?: MapPosition;
}

interface MapsFieldProps extends IBaseSimpleFormComponent {
	value?: MapsFieldValue;
}

const defaultPosition: MapPosition = { lat: -19.9051, lng: -43.9445 };

export default function MapsField({ name, label, value = {}, onChange, readOnly, error }: MapsFieldProps) {
	const position = value.position ?? defaultPosition;

	const updatePosition = (field: keyof MapPosition, fieldValue: string) => {
		const parsedValue = Number(fieldValue);
		if (!Number.isFinite(parsedValue)) return;
		const newPosition = { ...position, [field]: parsedValue };
		onChange?.(
			{ name, target: { name, value: { position: newPosition } } },
			{ name, value: { position: newPosition } }
		);
	};

	const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${position.lng - 0.02}%2C${
		position.lat - 0.02
	}%2C${position.lng + 0.02}%2C${position.lat + 0.02}&marker=${position.lat}%2C${position.lng}`;

	return (
		<FormGroup sx={{ width: '100%', gap: 1 }}>
			{label ? <SimpleLabelView label={label} disabled={readOnly} /> : null}
			{!readOnly ? (
				<div style={{ display: 'flex', gap: 8 }}>
					<TextField
						label="Latitude"
						type="number"
						value={position.lat}
						error={!!error}
						onChange={(event) => updatePosition('lat', event.target.value)}
					/>
					<TextField
						label="Longitude"
						type="number"
						value={position.lng}
						error={!!error}
						onChange={(event) => updatePosition('lng', event.target.value)}
					/>
				</div>
			) : null}
			<iframe
				title={label ?? 'Mapa'}
				src={mapUrl}
				style={{ width: '100%', minHeight: 320, border: 0 }}
				loading="lazy"
				referrerPolicy="no-referrer"
			/>
		</FormGroup>
	);
}
