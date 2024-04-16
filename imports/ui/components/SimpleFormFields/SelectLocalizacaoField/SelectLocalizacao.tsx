import React, { useEffect, useState } from 'react';

import useMediaQuery from '@mui/material/useMediaQuery';
import SelectMunicipioDistritoField from './SelectMunicipioDistritoField';
import SelectField from '/imports/ui/components/SimpleFormFields/SelectField/SelectField';
import SimpleLabelView from '/imports/ui/components/SimpleLabelView/SimpleLabelView';
import * as appStyle from '/imports/ui/materialui/styles';

import { hasValue } from '/imports/libs/hasValue';
import TextField from '/imports/ui/components/SimpleFormFields/TextField/TextField';

export default React.memo(
	({
		naoObrigatorio,
		onChange,
		value,
		name,
		error,
		style,
		help,
		readOnly,
		label,
		isSearch,
		...otherProps
	}: IBaseSimpleFormComponent) => {
		const isSmall = useMediaQuery((theme) => theme.breakpoints.down('sm'));

		const [estado, setEstado] = useState(value ? value.estado : undefined);
		const [municipio, setMunicipio] = useState(value ? value.municipio : undefined);
		const [distrito, setDistrito] = useState(value ? value.distrito : undefined);

		const definirEstado = (e) => {
			setEstado(e.target.value);
			if (e.target.value == 'Não identificado') {
				setMunicipio('Não identificado');
				setDistrito(null);
			} else if (e.target.value == 'Atribuição de Origem') {
				setMunicipio('Não identificado');
				setDistrito(null);
			} else if (e.target.value == '') {
				setEstado(undefined);
				setMunicipio(undefined);
				setDistrito(undefined);
			} else {
				setMunicipio(null);
				setDistrito(null);
			}
		};

		const handleChange = (localizacao) => {
			if (localizacao && Object.keys(localizacao).find((loc) => !!localizacao[loc])) {
				onChange({ name, target: { name, value: localizacao } }, { name, value: localizacao });
			} else {
				if (value) {
					onChange({ name, target: { name, value: undefined } }, { name, value: undefined });
				}
			}
		};

		const definirMunicipio = (e) => {
			const mundist = e.target.value;
			setMunicipio(mundist ? mundist.municipio : null);
			setDistrito(mundist ? mundist.distrito : null);
		};

		useEffect(() => {
			const localizacao = { estado, municipio, distrito };
			if (
				(!hasValue(value) && (hasValue(estado) || hasValue(municipio) || hasValue(distrito))) ||
				(hasValue(value) && (value.estado !== estado || value.municipio !== municipio || value.distrito !== distrito))
			) {
				if (isSearch) {
					handleChange(localizacao);
				} else if (estado && municipio) {
					handleChange(localizacao);
				} else {
					handleChange(undefined);
				}
			}
		}, [estado, municipio, distrito]);

		useEffect(() => {
			if (value && value.estado !== estado) {
				setEstado(value.estado);
			}
			if (value && value.municipio !== municipio) {
				setMunicipio(value.municipio);
			}
			if (value && value.distrito !== distrito) {
				setDistrito(value.distrito);
			}

			if (!value) {
				setEstado(undefined);
				setMunicipio(undefined);
				setDistrito(undefined);
			}
		}, [value]);

		if (readOnly) {
			return (
				<div
					key={name}
					style={{
						width: '100%',
						display: 'flex',
						flexDirection: 'column',
						...appStyle.fieldContainer
					}}>
					{label && !otherProps.rounded ? (
						<SimpleLabelView label={(label = 'Estado/Cidade')} help={help} disabled={readOnly} />
					) : null}

					<TextField
						id={name}
						label={label ? label : 'Cidade/Estado'}
						key={name}
						value={
							value === '-' || !value || value.municipio === undefined || value.estado === undefined
								? '-'
								: value.municipio + (value.distrito ? '-' + value.distrito : '') + '/' + value.estado
						}
						readOnly={true}
					/>
				</div>
			);
		}

		return (
			<div style={{ display: 'flex', flexDirection: isSmall ? 'column' : 'row' }}>
				<div style={{ width: isSmall ? '100%' : '25%', marginRight: '1rem' }}>
					<SelectField
						error={!!error && !estado}
						readOnly={!!readOnly}
						label={naoObrigatorio ? 'Estado' : 'Estado'}
						name={'estado'}
						value={estado}
						options={[
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
						].map((uf) => ({
							value: uf,
							label: uf
						}))}
						onChange={definirEstado}
						rounded={otherProps.rounded}
					/>
				</div>
				<div style={{ width: isSmall ? '100%' : '75%' }}>
					<SelectMunicipioDistritoField
						label={naoObrigatorio ? 'Cidade' : 'Cidade'}
						name={'municipio'}
						error={!!error && !municipio}
						readOnly={!!readOnly || estado === 'Não identificado' || estado === 'Atribuição de Origem'}
						estado={estado}
						value={municipio && municipio != 'Não identificado' ? { municipio, distrito, estado } : undefined}
						onChange={definirMunicipio}
						rounded={otherProps.rounded}
					/>
				</div>
			</div>
		);
	}
);
