import React from 'react';

import { hasValue } from '/imports/libs/hasValue';

import { getEnderecoByCep } from './getEnderecoByCep';

import SelectLocalizacao from '/imports/ui/components/SimpleFormFields/SelectLocalizacaoField/SelectLocalizacao';
import TextField from '../TextField/TextField';
import TextMaskField from '../TextMaskField/TextMaskField';

interface IresponseCep {
	endereco: object;
	cep: string;
	logradouro: string;
	complemento: string;
	bairro: string;
	localidade: string;
	uf: string;
	ibge: string;
	gia: string;
	ddd: string;
	siafi: string;
	erro?: boolean;
}

interface IValue {
	cep?: string;
	logradouro?: string;
	bairro?: string;
	estado: string;
	municipio: string;
	distrito?: string;
}

interface ICepField {
	name: string;
	screenState: string | undefined;
	onChange?: (fieldTarget: object, field: object) => void;
	error?: boolean;
	readOnly?: boolean;
	value?: IValue;
	isRequired?: boolean;
	noShowMsgError?: boolean;
}

export const CepField = ({
	value,
	name,
	screenState,
	onChange,
	error,
	readOnly,
	isRequired = true,
	noShowMsgError
}: ICepField): JSX.Element => {
	const [endereco, setEndereco] = React.useState(value || {});
	const [readOnlyFlag, setreadOnlyFlag] = React.useState<object>();
	const [cepError, setCepError] = React.useState<boolean>(false);

	const { cep, logradouro, bairro, estado, municipio, distrito } = endereco;
	const isValidCep = cep && cep.length === 9;
	React.useEffect(() => {
		if (isValidCep && (!value || value.cep !== cep)) {
			getEnderecoByCep(cep, (error: string, response: IresponseCep) => {
				if (!error) {
					if (response && response.erro === true) {
						setCepError(true);
						setEndereco({ ...endereco, cep: '' });
						handleChangeEndereco(undefined);
						return;
					}

					cepError && setCepError(false);
					setEndereco({
						cep,
						logradouro: response.logradouro,
						bairro: response.bairro,
						estado: response.uf,
						municipio: response.localidade
					});
					handleChangeEndereco({
						cep,
						logradouro: response.logradouro,
						bairro: response.bairro,
						estado: response.uf,
						municipio: response.localidade
					});

					let obj = {};
					Object.keys(response).forEach((key) => {
						if (hasValue(response[key])) {
							obj = { ...obj, [key]: true };
						}
					});
					setreadOnlyFlag(obj);
				} else {
					console.log('ERROR: ', error);
				}
			});
		}
	}, [cep]);

	React.useEffect(() => {
		if (endereco.cep === undefined) {
			setEndereco((endereco) => ({
				...endereco,
				cep: undefined,
				logradouro: '',
				bairro: '',
				estado: '',
				municipio: '',
				distrito: ''
			}));
			setreadOnlyFlag((obj) => ({
				...obj,
				logradouro: false,
				bairro: false,
				uf: false,
				localidade: false,
				distrito: false
			}));
		}
	}, [endereco.cep]);

	React.useEffect(() => {
		if (screenState === 'edit' || screenState === 'view') {
			if (
				hasValue(value) &&
				(value.cep !== cep ||
					value.logradouro !== logradouro ||
					value.bairro !== bairro ||
					value.estado !== estado ||
					value.municipio !== municipio ||
					value.distrito !== distrito)
			) {
				setEndereco({
					cep: value.cep,
					logradouro: value.logradouro,
					bairro: value.bairro,
					estado: value.estado || '',
					municipio: value.municipio || '',
					distrito: value.distrito || ''
				});
			}
		}
	}, [value]);

	React.useEffect(() => {
		const endereco = { cep, logradouro, bairro, estado, municipio, distrito };

		if (isRequired) {
			if (isValidCep && !cepError) {
				if (
					hasValue(cep) &&
					hasValue(logradouro) &&
					hasValue(bairro) &&
					hasValue(estado) &&
					hasValue(municipio) &&
					(!value ||
						value.cep !== cep ||
						value.logradouro !== logradouro ||
						value.bairro !== bairro ||
						value.estado !== estado ||
						value.municipio !== municipio ||
						value.distrito !== distrito)
				) {
					handleChangeEndereco(endereco);
				}
			} else if (hasValue(value)) {
				handleChangeEndereco(undefined);
			}
		} else if (!isRequired) {
			if (
				hasValue(cep) ||
				hasValue(logradouro) ||
				hasValue(bairro) ||
				hasValue(estado) ||
				(hasValue(municipio) &&
					(!value ||
						value.cep !== cep ||
						value.logradouro !== logradouro ||
						value.bairro !== bairro ||
						value.estado !== estado ||
						value.municipio !== municipio ||
						value.distrito !== distrito))
			) {
				handleChangeEndereco(endereco);
			}
		}
	}, [endereco.cep, endereco.logradouro, endereco.bairro, endereco.estado, endereco.municipio, endereco.distrito]);

	const handleChangeEndereco = (
		endereco:
			| {
					cep?: string;
					logradouro?: string;
					bairro?: string;
					estado?: string;
					municipio?: string;
					distrito?: string;
			  }
			| undefined
	) => {
		onChange({ name, target: { name, value: endereco } }, { name, value: endereco });
	};

	const handleChangeCep = (value: string) => {
		cepError && setCepError(false);
		setEndereco({ ...endereco, cep: value });
	};

	const handleChangeBairo = (value: string) => {
		setEndereco({ ...endereco, bairro: value });
	};

	const handleChangeLogradouro = (value: string) => {
		setEndereco({ ...endereco, logradouro: value });
	};

	const handleChageLocalizacao = (event) => {
		if (event.target.value) {
			setEndereco({
				...endereco,
				estado: event.target.value.estado,
				municipio: event.target.value.municipio,
				distrito: event.target.value.distrito
			});
		}
	};

	return (
		<>
			<TextMaskField
				label={'CEP'}
				error={!!error || cepError}
				placeholder="00000-000"
				name="cep"
				schema={{ mask: '#####-###' }}
				value={cep}
				readOnly={readOnly}
				noShowMsgError={cepError}
				onChange={(e) => handleChangeCep(e.target.value)}
				inputProps={{ min: 0 }}
			/>

			{!noShowMsgError && cepError && (
				<div
					style={{
						width: '100%',
						textAlign: 'right',
						margin: 0,
						padding: 1,
						color: '#DD0000',
						fontSize: 10
					}}>
					{'CEP inválido!'}
				</div>
			)}

			<SelectLocalizacao
				name={'localizacao'}
				onChange={handleChageLocalizacao}
				value={{ estado: estado, municipio: municipio, distrito: distrito }}
				error={!!error && !hasValue(estado && municipio)}
				readOnly={(readOnlyFlag && readOnlyFlag.uf) || (readOnlyFlag && readOnlyFlag.localidade) || readOnly}
			/>

			<TextField
				label={'Bairro'}
				error={!!error && !hasValue(bairro)}
				readOnly={(readOnlyFlag && readOnlyFlag.bairro) || readOnly}
				fullWidth
				name="bairro"
				type="text"
				placeholder="Ex.: Santa Matilde"
				value={bairro}
				onChange={(e) => handleChangeBairo(e.target.value)}
				inputProps={{ maxLength: 100 }}
			/>

			<TextField
				label={'Logradouro'}
				error={!!error && !hasValue(logradouro)}
				readOnly={(readOnlyFlag && readOnlyFlag.logradouro) || readOnly}
				fullWidth
				name="logradouro"
				type="text"
				placeholder="Ex.: Rua das Jardineiras"
				value={logradouro}
				onChange={(e) => handleChangeLogradouro(e.target.value)}
				inputProps={{ maxLength: 100 }}
			/>
		</>
	);
};
