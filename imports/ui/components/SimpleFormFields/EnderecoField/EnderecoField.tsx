import React from 'react';
import { hasValue } from '/imports/libs/hasValue';
import { getEnderecoByCep } from './getEnderecoByCep';
import TextField from '../TextField/TextField';
import TextMaskField from '../TextMaskField/TextMaskField';
import SelectLocalizacao from '../SelectLocalizacaoField/SelectLocalizacao';
import { IBaseSimpleFormComponent } from '/imports/ui/components/InterfaceBaseSimpleFormComponent';

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
	bairro?: string;
	estado?: string;
	municipio?: string;
	distrito?: string;
	numero?: string;
	complemento?: string;
}

interface IEnderecoFiled extends IBaseSimpleFormComponent {}

export interface IEventLocalizacao extends React.ChangeEvent<HTMLInputElement> {
	target: (EventTarget & HTMLInputElement) & {
		value: {
			estado: string;
			municipio: string;
			distrito: string;
		};
	};
}

export const EnderecoField = ({ value, name, onChange, error, readOnly, schema }: IEnderecoFiled): JSX.Element => {
	const [endereco, setEndereco] = React.useState<IEndereco>(
		value! ?? {
			cep: '',
			logradouro: '',
			bairro: '',
			estado: '',
			municipio: '',
			distrito: '',
			numero: '',
			complemento: '' // opcional
		}
	);

	const [cepError, setCepError] = React.useState<boolean>(false);

	const isValidCep = endereco?.cep && endereco.cep.length === 9;
	const isRequired = schema.optional === false;

	React.useEffect(() => {
		const { cep } = endereco;
		if (isValidCep && (!value || value.cep !== cep)) {
			getEnderecoByCep(cep!, (error: string | null, response: IResponseCep | null) => {
				if (!error) {
					if (response?.erro === 'true') {
						setCepError(true);
						setEndereco({
							cep: undefined,
							logradouro: '',
							bairro: '',
							estado: '',
							municipio: '',
							distrito: '',
							numero: '',
							complemento: ''
						});
						handleChangeEndereco(undefined);
						return;
					} else {
						cepError && setCepError(false);
						setEndereco({
							...endereco,
							cep,
							logradouro: response?.logradouro,
							bairro: response?.bairro,
							estado: response?.uf,
							municipio: response?.localidade
						});
					}
				} else {
					console.log('ERROR: ', error);
				}
			});
		}
	}, [endereco.cep]);

	React.useEffect(() => {
		if (isRequired) {
			if (!!endereco && endereco.cep && endereco.cep?.length < 9) {
				handleChangeEndereco(undefined);
			}
		}
	}, [endereco.cep]);

	React.useEffect(() => {
		const { cep, logradouro, bairro, estado, municipio, distrito, complemento, numero } = endereco;

		if (isValidCep && !cepError) {
			if (
				hasValue(cep) &&
				hasValue(logradouro) &&
				hasValue(bairro) &&
				hasValue(estado) &&
				hasValue(municipio) &&
				hasValue(numero) &&
				(!value ||
					value.cep !== cep ||
					value.logradouro !== logradouro ||
					value.bairro !== bairro ||
					value.estado !== estado ||
					value.municipio !== municipio ||
					value.numero !== numero ||
					value.complemento !== complemento ||
					value.distrito !== distrito)
			) {
				handleChangeEndereco(endereco);
			} else if (
				!hasValue(cep) ||
				!hasValue(logradouro) ||
				!hasValue(bairro) ||
				!hasValue(estado) ||
				!hasValue(municipio) ||
				!hasValue(numero) ||
				!value ||
				value.cep !== cep ||
				value.logradouro !== logradouro ||
				value.bairro !== bairro ||
				value.estado !== estado ||
				value.municipio !== municipio ||
				value.numero !== numero ||
				value.complemento !== complemento ||
				value.distrito !== distrito
			) {
				handleChangeEndereco(undefined);
			}
		} else if (!isRequired) {
			handleChangeEndereco(endereco);
		}
	}, [
		endereco.cep,
		endereco.logradouro,
		endereco.bairro,
		endereco.estado,
		endereco.municipio,
		endereco.distrito,
		endereco.numero,
		endereco.complemento
	]);

	const handleChangeEndereco = (endereco: IEndereco | undefined) => {
		onChange &&
			onChange(
				//@ts-ignore
				{ name, target: { name, value: endereco } },
				{ name, value: endereco }
			);
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

	const handleComplemento = (value: string) => {
		setEndereco({ ...endereco, complemento: value });
	};

	const handleChangeNumero = (value: string) => {
		setEndereco({ ...endereco, numero: value });
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
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeCep(e.target.value)}
				inputProps={{ min: 0 }}
			/>

			{cepError && (
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
				key={'enderecoField-SelectLocalizacao'}
				name={'localizacao'}
				readOnly={readOnly}
				// @ts-ignore
				onChange={handleChangeLocalizacao}
				value={{
					estado: endereco.estado,
					municipio: endereco.municipio,
					distrito: endereco.distrito
				}}
				error={!!error && !hasValue(endereco.estado && endereco.municipio)}
			/>

			<TextField
				label={'Bairro'}
				error={!!error && !hasValue(endereco.bairro)}
				fullWidth
				readOnly={readOnly}
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
				fullWidth
				name="logradouro"
				type="text"
				readOnly={readOnly}
				placeholder="Ex.: Rua das Jardineiras"
				value={endereco.logradouro}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeLogradouro(e.target.value)}
				inputProps={{ maxLength: 100 }}
			/>

			<TextField
				label={'Número'}
				error={!!error && !hasValue(endereco.numero)}
				fullWidth
				name="numero"
				readOnly={readOnly}
				type="text"
				placeholder="Ex.: 110"
				value={endereco.numero}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeNumero(e.target.value)}
				inputProps={{ maxLength: 100 }}
			/>

			<TextField
				label={'Complemento'}
				error={!!error}
				readOnly={readOnly}
				fullWidth
				name="complemento"
				type="text"
				placeholder="Ex.: apartamento 88"
				value={endereco.complemento}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleComplemento(e.target.value)}
				inputProps={{ maxLength: 100 }}
			/>
		</>
	);
};
