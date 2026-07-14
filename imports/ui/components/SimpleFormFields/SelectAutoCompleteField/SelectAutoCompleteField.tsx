import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import localidades from '/imports/ui/components/SimpleFormFields/SelectLocalizacaoField/localidades.json';

import RadioButtonField from '/imports/ui/components/SimpleFormFields/RadioButtonField/RadioButtonField';
import SimpleLabelView from '/imports/ui/components/SimpleLabelView/SimpleLabelView';

import { selectAutoCompleteStyle } from './SelectAutoCompleteFieldStyle';
import { hasValue } from '/imports/libs/hasValue';
import * as appStyle from '/imports/ui/materialui/styles';
import type { IBaseSimpleFormComponent } from '/imports/ui/components/InterfaceBaseSimpleFormComponent';

interface Localidade {
	u: string;
	m: string;
	d?: string;
}

const bemculturalLocalidade = localidades as Localidade[];

function downloadObjectAsJson(exportObj: unknown, exportName: string) {
	const dataStr = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(exportObj))}`;
	const downloadAnchorNode = document.createElement('a');
	downloadAnchorNode.setAttribute('href', dataStr);
	downloadAnchorNode.setAttribute('download', `${exportName}.json`);
	document.body.appendChild(downloadAnchorNode); // required for firefox
	downloadAnchorNode.click();
	downloadAnchorNode.remove();
}

export const getLocalidade = () => {
	downloadObjectAsJson(bemculturalLocalidade, 'localidades');
};

interface IOtherProps {
	options: {
		value: any;
		label: string;
	}[];
	mode: any;
	estadoOn: boolean;
	distritoOn: boolean;
	municipioOn: boolean;
	showRadios?: boolean;
}

export default ({
	estadoOn = true,
	showRadios = true,
	distritoOn = true,
	municipioOn = true,
	name,
	label,
	value = {},
	onChange,
	readOnly,
	error,
	...otherProps
}: IBaseSimpleFormComponent & IOtherProps) => {
	const mode = otherProps.mode;

	const opcoesEstados = [
		{
			id: 31,
			sigla: 'MG',
			nome: 'Minas Gerais',
			regiao: {
				id: 3,
				sigla: 'SE',
				nome: 'Sudeste'
			}
		}
	];

	const municipios = bemculturalLocalidade
		.filter((x) => (!value.estado?.sigla || x.u === value.estado.sigla) && !x.d)
		.map((x) => ({ nome: x.m }));

	const distritos = (municipio: { nome?: string } | undefined) =>
		municipio && municipio.nome
			? bemculturalLocalidade.filter((x) => x.m === municipio.nome && !!x.d).map((x) => ({ nome: x.d ?? '' }))
			: [];
	const onChangeFields = (_evt: React.SyntheticEvent, nameField: string, values: unknown) => {
		onChange?.(
			{ name, target: { name, value: { ...value, [nameField]: values } } },
			{ name, value: { ...value, [nameField]: values } }
		);
	};

	const onChangeOrigem = (evt: React.BaseSyntheticEvent) => {
		onChange?.(
			{
				name,
				target: {
					name,
					value: { ...value, identificada: evt.target.value === 'Sim' }
				}
			},
			{ name, value: { ...value, identificada: evt.target.value === 'Sim' } }
		);
	};

	if (readOnly) {
		return (
			<div key={name}>
				{value ? (
					<div
						style={{
							width: '100%',
							display: 'flex',
							flexDirection: 'column',
							...appStyle.fieldContainer
						}}
						key={name}>
						<SimpleLabelView label={label ?? ''} disabled={readOnly} />
						{value.distrito && <SimpleLabelView label="" value={value.distrito.nome} disabled={readOnly} />}
						{value.municipio && <SimpleLabelView label="" value={value.municipio.nome} disabled={readOnly} />}
						{value.estado && <SimpleLabelView label="" value={value.estado.nome} disabled={readOnly} />}
					</div>
				) : (
					<div style={selectAutoCompleteStyle.containerEmptyItens}>{'Não identificada'}</div>
				)}
			</div>
		);
	}

	return (
		<div>
			{showRadios && mode != 'filter' && (
				<RadioButtonField
					label={'Identificada?'}
					value={value && value.identificada ? 'Sim' : 'Não'}
					readOnly={readOnly}
					name={'identificada'}
					onChange={onChangeOrigem}
					error={error}
					otherProps={otherProps}
					options={[
						{ value: 'Sim', label: 'Sim' },
						{ value: 'Não', label: 'Não' }
					]}
				/>
			)}

			{((value && value.identificada) || !showRadios || mode === 'filter') && (
				<div>
					{estadoOn && (
						<Autocomplete
							key={'estado'}
							options={opcoesEstados}
							getOptionLabel={(option) => option.nome}
							isOptionEqualToValue={(option, selected) => option.nome === selected.nome}
							style={{ width: 300, backgroundColor: '#f2f2f2' }}
							onChange={(e, v) => onChangeFields(e, 'estado', v)}
							disabled={!!readOnly}
							renderInput={(params) => <TextField {...params} label={'Estado'} />}
							defaultValue={
								value && value.estado ? opcoesEstados.find((x) => x.nome === value.estado.nome) : opcoesEstados[0]
							}
						/>
					)}

					<Autocomplete
						options={municipios}
						getOptionLabel={(option) => option.nome}
						style={{ width: 300, backgroundColor: '#f2f2f2' }}
						onChange={(e, v) => onChangeFields(e, 'municipio', v)}
						disabled={!!readOnly}
						renderInput={(params) => <TextField {...params} label={null} />}
						defaultValue={value && value.municipio ? municipios.find((x) => x.nome === value.municipio.nome) : null}
					/>
					{hasValue(value.municipio) && distritoOn && municipioOn && (
						<Autocomplete
							options={distritos(value.municipio)}
							getOptionLabel={(option) => option.nome}
							isOptionEqualToValue={(option, selected) => option.nome === selected.nome}
							style={{ width: 300, backgroundColor: '#f2f2f2' }}
							onChange={(e, v) => onChangeFields(e, 'distrito', v)}
							disabled={!!readOnly}
							renderInput={(params) => <TextField {...params} label={'Distrito (Opcional)'} />}
							defaultValue={
								value && value.distrito
									? distritos(value.municipio).find((x) => x.nome === value.distrito.nome)
									: { nome: '' }
							}
						/>
					)}
				</div>
			)}
		</div>
	);
};
