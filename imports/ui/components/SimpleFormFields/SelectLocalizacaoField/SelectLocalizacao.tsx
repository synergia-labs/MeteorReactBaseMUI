import React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import SelectMunicipioDistritoField from './SelectMunicipioDistritoField';
import SelectField from '/imports/ui/components/SimpleFormFields/SelectField/SelectField';
import SimpleLabelView from '/imports/ui/components/SimpleLabelView/SimpleLabelView';
import type { IBaseSimpleFormComponent } from '/imports/ui/components/InterfaceBaseSimpleFormComponent';

interface LocationValue {
	estado?: string;
	municipio?: string;
	distrito?: string | null;
}

interface Props extends IBaseSimpleFormComponent {
	value?: LocationValue;
	naoObrigatorio?: boolean;
	isSearch?: boolean;
}

const states = [
	'AC',
	'AL',
	'AM',
	'AP',
	'BA',
	'CE',
	'DF',
	'ES',
	'GO',
	'MA',
	'MG',
	'MS',
	'MT',
	'PA',
	'PB',
	'PE',
	'PI',
	'PR',
	'RJ',
	'RN',
	'RO',
	'RR',
	'RS',
	'SC',
	'SE',
	'SP',
	'TO'
];

export default React.memo(function SelectLocalizacao({
	name,
	label,
	value = {},
	onChange,
	error,
	help,
	readOnly,
	...otherProps
}: Props) {
	const isSmall = useMediaQuery('(max-width:600px)');
	const emit = (newValue: LocationValue | undefined) =>
		onChange?.({ name, target: { name, value: newValue } }, { name, value: newValue });

	if (readOnly) {
		const displayValue =
			value.municipio && value.estado
				? `${value.municipio}${value.distrito ? ` - ${value.distrito}` : ''}/${value.estado}`
				: '-';
		return (
			<div>
				<SimpleLabelView label={label ?? 'Estado/Cidade'} help={help} disabled />
				<div>{displayValue}</div>
			</div>
		);
	}

	return (
		<div style={{ display: 'flex', flexDirection: isSmall ? 'column' : 'row', gap: 16, width: '100%' }}>
			<div style={{ width: isSmall ? '100%' : '25%' }}>
				<SelectField
					error={!!error && !value.estado}
					label="Estado"
					name="estado"
					value={value.estado}
					options={states.map((state) => ({ value: state, label: state }))}
					onChange={(event: { target: { value?: string } }) =>
						emit(event.target.value ? { estado: event.target.value } : undefined)
					}
					rounded={otherProps.rounded}
				/>
			</div>
			<div style={{ width: isSmall ? '100%' : '75%' }}>
				<SelectMunicipioDistritoField
					label="Cidade"
					name="municipio"
					error={!!error && !value.municipio}
					readOnly={!value.estado}
					estado={value.estado}
					value={value.municipio ? { ...value, municipio: value.municipio } : undefined}
					onChange={(event: { target: { value?: LocationValue } }) =>
						emit(event.target.value ? { ...event.target.value, estado: value.estado } : { estado: value.estado })
					}
				/>
			</div>
		</div>
	);
});
