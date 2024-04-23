import React from 'react';
import { hasValue } from '/imports/libs/hasValue';
import { getEnderecoByCep } from './getEnderecoByCep';
import TextField from '../TextField/TextField';
import TextMaskField from '../TextMaskField/TextMaskField';
import SelectLocalizacao from '../SelectLocalizacaoField/SelectLocalizacao';

export interface IResponseCep {
	[key: string]: any;

	endereco: object;
	cep: string;
	logradouro: string;
	bairro: string;
	localidade: string;
	uf: string;
	ibge: string;
	gia: string;
	ddd: string;
	siafi: string;
	erro?: string;
}

export interface IEndereco {
	cep?: string;
	logradouro?: string;
	numero?: number;
	bairro?: string;
	estado?: string;
	municipio?: string;
	distrito?: string;
}

interface ICepField {
	name: string;
	screenState: string | undefined;
	onChange?: (fieldTarget: object, field: object) => void;
	error?: boolean;
	readOnly?: boolean;
	value?: IEndereco;
	isRequired?: boolean;
	noShowMsgError?: boolean;
	permitirEdicao?: boolean;
}

export interface IEventLocalizacao extends React.ChangeEvent<HTMLInputElement> {
	target: (EventTarget & HTMLInputElement) & {
		value: {
			estado: string;
			municipio: string;
			distrito: string;
		};
	};
}

interface IReadOnlyFlag {
	uf?: boolean;
	estado?: boolean;
	municipio?: boolean;
	distrito?: boolean;
	localidade?: boolean;
	bairro?: boolean;
	logradouro?: boolean;
}

export const CepField = ({
	value,
	name,
	screenState,
	onChange,
	error,
	readOnly,
	isRequired = true,
	noShowMsgError,
	permitirEdicao = false
}: ICepField): JSX.Element => {
	const [endereco, setEndereco] = React.useState<IEndereco>(
		value! ?? {
			cep: undefined,
			logradouro: '',
			bairro: '',
			estado: '',
			municipio: '',
			distrito: ''
		}
	);
	// const [readOnlyFlag, setReadOnlyFlag] = React.useState<IReadOnlyFlag | undefined>();
	const [cepError, setCepError] = React.useState<boolean>(false);
	const [permiteEdicao, setPermiteEdicao] = React.useState<boolean>(permitirEdicao);
	const isValidCep = endereco.cep && endereco.cep.length === 9;

	React.useEffect(() => {
		const { cep } = endereco;
		if (isValidCep && (!value || value.cep !== cep)) {
			getEnderecoByCep(cep!, (error: string | null, response: IResponseCep | null) => {
				if (!error) {
					if (response && response.erro === 'true') {
						setCepError(true);
						// setPermiteEdicao(true);
						setEndereco({
							...endereco,
							cep: undefined,
							logradouro: '',
							bairro: '',
							estado: '',
							municipio: '',
							distrito: ''
						});
						handleChangeEndereco(undefined);
						return;
					}
					setPermiteEdicao(false);
					cepError && setCepError(false);
					setEndereco({
						cep,
						logradouro: response?.logradouro,
						bairro: response?.bairro,
						estado: response?.uf,
						municipio: response?.localidade
					});
					handleChangeEndereco({
						cep,
						logradouro: response?.logradouro,
						bairro: response?.bairro,
						estado: response?.uf,
						municipio: response?.localidade
					});

					// let obj = {}
					// Object.keys(response).forEach((key) => {
					// 	if (hasValue(response[key])) {
					// 		obj = { ...obj, [key]: true };
					// 	}
					// });
					// setReadOnlyFlag(obj);
				} else {
					console.log('ERROR: ', error);
				}
			});
		} else {
			setEndereco({
				...endereco,
				cep: undefined,
				logradouro: '',
				bairro: '',
				estado: '',
				municipio: '',
				distrito: ''
			});
		}
	}, [endereco.cep]);

	React.useEffect(() => {
		if (endereco.cep === undefined) {
			setEndereco({
				...endereco,
				cep: undefined,
				logradouro: '',
				bairro: '',
				estado: '',
				municipio: '',
				distrito: ''
			});
		}
	}, [endereco.cep]);

	React.useEffect(() => {
		const { cep, logradouro, bairro, estado, municipio, distrito } = endereco;
		if (screenState === 'edit' || screenState === 'view') {
			if (
				hasValue(value) &&
				(value?.cep !== cep ||
					value?.logradouro !== logradouro ||
					value?.bairro !== bairro ||
					value?.estado !== estado ||
					value?.municipio !== municipio ||
					value?.distrito !== distrito)
			) {
				setEndereco({
					cep: value?.cep,
					logradouro: value?.logradouro,
					bairro: value?.bairro,
					estado: value?.estado || '',
					municipio: value?.municipio || '',
					distrito: value?.distrito || ''
				});
			}
		}
	}, [value]);

	React.useEffect(() => {
		const { cep, logradouro, bairro, estado, municipio, distrito } = endereco;

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

	const handleChangeBairro = (value: string) => {
		setEndereco({ ...endereco, bairro: value });
	};

	const handleChangeLogradouro = (value: string) => {
		setEndereco({ ...endereco, logradouro: value });
	};

	const handleChangeLocalizacao = (event: IEventLocalizacao) => {
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
				value={endereco.cep}
				readOnly={readOnly}
				noShowMsgError={cepError}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeCep(e.target.value)}
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
				// @ts-ignore
				onChange={handleChangeLocalizacao}
				value={{
					estado: endereco.estado,
					municipio: endereco.municipio,
					distrito: endereco.distrito
				}}
				error={!!error && !hasValue(endereco.estado && endereco.municipio)}
				// readOnly={readOnlyFlag && readOnlyFlag.uf || readOnlyFlag && readOnlyFlag.localidade || !permiteEdicao|| readOnly}
				readOnly={!permiteEdicao}
			/>

			<TextField
				label={'Bairro'}
				error={!!error && !hasValue(endereco.bairro)}
				// readOnly={readOnlyFlag && readOnlyFlag.bairro  || readOnly || !permiteEdicao}
				readOnly={!permiteEdicao}
				fullWidth
				name="bairro"
				type="text"
				placeholder="Ex.: Santa Matilde"
				value={endereco.bairro}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeBairro(e.target.value)}
				inputProps={{ maxLength: 100 }}
			/>

			<TextField
				label={'Logradouro'}
				error={!!error && !hasValue(endereco.logradouro)}
				// readOnly={readOnlyFlag && readOnlyFlag.logradouro  ||  readOnly || !permiteEdicao}
				readOnly={!permiteEdicao}
				fullWidth
				name="logradouro"
				type="text"
				placeholder="Ex.: Rua das Jardineiras"
				value={endereco.logradouro}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeLogradouro(e.target.value)}
				inputProps={{ maxLength: 100 }}
			/>
		</>
	);
};
