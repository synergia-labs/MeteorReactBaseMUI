import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import bemculturalLocalidade from '/imports/modules/bemcultural/api/distritos.json';

import RadioButtonField from '/imports/ui/components/SimpleFormFields/RadioButtonField/RadioButtonField';
import SimpleLabelView from '/imports/ui/components/SimpleLabelView/SimpleLabelView';
import { createStyles, Theme, withStyles } from '@mui/styles';

import { selectAutoCompleteStyle } from './SelectAutoCompleteFieldStyle';
import { hasValue } from '/imports/libs/hasValue';
import * as appStyle from '/imports/ui/materialui/styles';
import InputBase from '@mui/material/InputBase';

function downloadObjectAsJson(exportObj, exportName) {
	const dataStr = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(exportObj))}`;
	const downloadAnchorNode = document.createElement('a');
	downloadAnchorNode.setAttribute('href', dataStr);
	downloadAnchorNode.setAttribute('download', `${exportName}.json`);
	document.body.appendChild(downloadAnchorNode); // required for firefox
	downloadAnchorNode.click();
	downloadAnchorNode.remove();
}

export const getLocalidade = () => {
	const newLocalidade = bemculturalLocalidade.map((l) => {
		const uf =
			l.municipio.microrregiao && l.municipio.microrregiao.mesorregiao && l.municipio.microrregiao.mesorregiao.UF
				? l.municipio.microrregiao.mesorregiao.UF.sigla
				: l['regiao-imediata'] &&
					  l.municipio['regiao-imediata']['regiao-intermediaria'] &&
					  l.municipio['regiao-imediata']['regiao-intermediaria'].UF
					? l.municipio['regiao-imediata']['regiao-intermediaria'].UF.sigla
					: null;

		return {
			u: uf,
			m: l.nome === l.municipio.nome ? l.nome : l.municipio.nome,
			d: l.nome !== l.municipio.nome ? l.nome : undefined
		};
	});
	downloadObjectAsJson(newLocalidade, 'localidades');
};

const BootstrapInput = withStyles((theme: Theme) =>
	createStyles({
		root: {
			'label + &': {
				marginTop: theme.spacing(3)
			}
		},
		input: {
			borderRadius: 4,
			position: 'relative',
			backgroundColor: '#cbcbcb',
			border: '1px solid #80bdff',
			fontSize: 16,
			padding: '10px 26px 10px 12px',
			transition: theme.transitions.create(['border-color', 'box-shadow']),
			// Use the system font instead of the default Roboto font.
			// fontFamily: [
			//  //'PT',
			// ].join(','),
			'&:focus': {
				borderRadius: 4,
				borderColor: '#80bdff',
				boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)'
			}
		}
	})
)(InputBase);

interface IOtherProps {
	options: {
		value: any;
		label: string;
	}[];
	mode: any;
	estadoOn: boolean;
	distritoOn: boolean;
	municipioOn: boolean;
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

	const municipios =
		value.estado && value.estado.id
			? bemculturalLocalidade.filter(
					(x) => x.municipio.microrregiao.mesorregiao.UF.id === value.estado.id && x.municipio.nome === x.nome
				)
			: bemculturalLocalidade.filter((x) => x.municipio.nome === x.nome);

	const distritos = (municipio) =>
		municipio && municipio.nome
			? bemculturalLocalidade.filter(
					(x) => x.municipio.nome === value.municipio.nome && x.nome !== value.municipio.nome
				)
			: [];
	const onChangeFields = (evt: React.BaseSyntheticEvent, nameField: string, values: [string]) => {
		onChange(
			{ name, target: { name, value: { ...value, [nameField]: values } } },
			{ name, value: { ...value, [nameField]: values } }
		);
	};

	const onChangeOrigem = (evt: React.BaseSyntheticEvent) => {
		onChange(
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
						<SimpleLabelView label={label} disabled={readOnly} />
						{value.distrito && <SimpleLabelView value={value.distrito.nome} disabled={readOnly} />}
						{value.municipio && <SimpleLabelView value={value.municipio.nome} disabled={readOnly} />}
						{value.estado && <SimpleLabelView value={value.estado.nome} disabled={readOnly} />}
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
							name={'estado'}
							options={opcoesEstados}
							getOptionLabel={(option) => option.nome}
							getOptionSelected={(option) => option.nome}
							style={{ width: 300, backgroundColor: '#f2f2f2' }}
							onChange={(e, v) => onChangeFields(e, 'estado', v)}
							error={!!error}
							disabled={!!readOnly}
							renderInput={(params) => <TextField {...params} label={'Estado'} />}
							defaultValue={
								value && value.estado ? opcoesEstados.find((x) => x.nome === value.estado.nome) : opcoesEstados[0]
							}
						/>
					)}

					<Autocomplete
						name={'municipio'}
						options={municipios}
						getOptionLabel={(option) => option.nome}
						style={{ width: 300, backgroundColor: '#f2f2f2' }}
						onChange={(e, v) => onChangeFields(e, 'municipio', v)}
						error={!!error}
						disabled={!!readOnly}
						renderInput={(params) => <TextField {...params} label={null} />}
						defaultValue={
							value && value.municipio
								? bemculturalLocalidade.find((x) => x.municipio.nome === value.municipio.nome)
								: bemculturalLocalidade
						}
					/>
					{hasValue(value.municipio) && distritoOn && municipioOn && (
						<Autocomplete
							name={'distrito'}
							options={distritos(value.municipio)}
							getOptionLabel={(option) => option.nome}
							getOptionSelected={(option) => option.value === value}
							style={{ width: 300, backgroundColor: '#f2f2f2' }}
							onChange={(e, v) => onChangeFields(e, 'distrito', v)}
							error={!!error}
							disabled={!!readOnly}
							renderInput={(params) => <TextField {...params} label={'Distrito (Opcional)'} />}
							defaultValue={
								value && value.distrito
									? bemculturalLocalidade.find((x) => x.nome === value.distrito.nome)
									: { nome: '' }
							}
						/>
					)}
				</div>
			)}
		</div>
	);
};
