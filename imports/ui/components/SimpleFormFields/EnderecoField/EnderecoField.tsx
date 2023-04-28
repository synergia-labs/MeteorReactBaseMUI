import React from 'react';
import { hasValue } from '/imports/libs/hasValue';
import { getEnderecoByCep } from './getEnderecoByCep';
import TextField from '../TextField/TextField';
import TextMaskField from '../TextMaskField/TextMaskField';
import SelectLocalizacao from '../SelectLocalizacaoField/SelectLocalizacao';
import { IBaseSimpleFormComponent } from '/imports/ui/components/InterfaceBaseSimpleFormComponent';
import Box from '@mui/material/Box/Box';

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

export const EnderecoField = ({
    value,
    name,
    onChange,
    error,
    readOnly,
    schema,
}: IEnderecoFiled): JSX.Element => {
    const defaultvalues = {
        cep: '',
        logradouro: '',
        bairro: '',
        estado: '',
        municipio: '',
        distrito: '',
        numero: '',
        complemento: '', // opcional
    };

    const [endereco, setEndereco] = React.useState<IEndereco>(
        value
            ? { ...defaultvalues, ...value }
            : {
                  ...defaultvalues,
              }
    );

    const [cepError, setCepError] = React.useState<boolean>(false);

    const isValidCep = endereco?.cep && endereco.cep.length === 9;
    const isRequired = schema.optional === false;

    React.useEffect(() => {
        const { cep } = endereco;

        if (isValidCep && (!value || value.cep !== cep) && !readOnly) {
            getEnderecoByCep(cep!, (error: string | null, response: IResponseCep | null) => {
                if (!error) {
                    if (response?.erro === 'true') {
                        setCepError(true);
                        setEndereco({
                            ...defaultvalues,
                        });
                        handleChangeEndereco(undefined);
                        return;
                    } else {
                        const doc = {
                            ...defaultvalues,
                            ...endereco,
                            cep,
                            logradouro: response?.logradouro,
                            bairro: response?.bairro,
                            estado: response?.uf,
                            municipio: response?.localidade,
                        };
                        handleChangeEndereco(doc);
                        setEndereco(doc);
                        cepError && setCepError(false);
                    }
                } else {
                    console.log('ERROR: ', error);
                }
            });
        }
    }, [endereco.cep]);

    React.useEffect(() => {
        handleChangeEndereco(endereco);
    }, [endereco.cep]);

    const handleChangeEndereco = (enderecoo: IEndereco | undefined) => {
        if (readOnly) return;
        let faltaCampoObrigatorio = null;

        if (typeof enderecoo === 'object') {
            for (let prop in enderecoo) {
                if (enderecoo[prop] === '' && prop !== 'distrito' && prop !== 'complemento') {
                    faltaCampoObrigatorio = undefined;
                }
            }
        }
        if (faltaCampoObrigatorio !== undefined) {
            onChange &&
                onChange(
                    //@ts-ignore
                    {
                        name,
                        target: {
                            name,
                            value: enderecoo,
                        },
                    },
                    {
                        name,
                        value: enderecoo,
                    }
                );
        } else {
            onChange &&
                onChange(
                    //@ts-ignore
                    {
                        name,
                        target: {
                            name,
                            value: null,
                        },
                    },
                    {
                        name,
                        value: null,
                    }
                );
        }
    };

    const handleChangeCep = (value: string) => {
        cepError && setCepError(false);
        setEndereco((endereco) => {
            return { ...endereco, cep: value };
        });
        // handleChangeEndereco({ ...endereco, cep: value })
    };

    const handleChangeBairro = (value: string) => {
        setEndereco({ ...endereco, bairro: value });
        handleChangeEndereco({ ...endereco, bairro: value });
    };

    const handleChangeLogradouro = (value: string) => {
        setEndereco({ ...endereco, logradouro: value });
        handleChangeEndereco({ ...endereco, logradouro: value });
    };

    const handleChangeLocalizacao = (event: IEventLocalizacao) => {
        if (event.target.value) {
            setEndereco({
                ...endereco,
                estado: event.target.value.estado,
                municipio: event.target.value.municipio,
                distrito: event.target.value.distrito,
            });
        }
        handleChangeEndereco({
            ...endereco,
            estado: event.target.value.estado,
            municipio: event.target.value.municipio,
            distrito: event.target.value.distrito,
        });
    };

    const handleComplemento = (value: string) => {
        setEndereco({ ...endereco, complemento: value });
        handleChangeEndereco({ ...endereco, complemento: value });
    };

    const handleChangeNumero = (value: string) => {
        setEndereco({ ...endereco, numero: value });
        handleChangeEndereco({ ...endereco, numero: value });
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: '3rem' }}>
                <TextMaskField
                    label={'CEP*'}
                    error={!!error || cepError}
                    placeholder="00000-000"
                    name="cep"
                    schema={{ mask: '#####-###' }}
                    value={endereco.cep}
                    readOnly={readOnly}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleChangeCep(e.target.value)
                    }
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
                            fontSize: 10,
                        }}
                    >
                        {'CEP inválido!'}
                    </div>
                )}
                <SelectLocalizacao
                    key={'enderecoField-SelectLocalizacao'}
                    name={'localizacao'}
                    naoObrigatorio={false}
                    readOnly={readOnly}
                    // @ts-ignore
                    onChange={handleChangeLocalizacao}
                    value={{
                        estado: endereco.estado,
                        municipio: endereco.municipio,
                        distrito: endereco.distrito,
                    }}
                    error={!!error && !hasValue(endereco.estado && endereco.municipio)}
                />
            </Box>
            <Box sx={{ display: 'flex', gap: '3rem' }}>
                <TextField
                    label={'Logradouro*'}
                    error={!!error && !hasValue(endereco.logradouro)}
                    fullWidth
                    name="logradouro"
                    type="text"
                    readOnly={readOnly}
                    placeholder="Ex.: Rua das Jardineiras"
                    value={endereco.logradouro}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleChangeLogradouro(e.target.value)
                    }
                    inputProps={{ maxLength: 100 }}
                />

                <TextField
                    label={'Bairro*'}
                    error={!!error && !hasValue(endereco.bairro)}
                    fullWidth
                    readOnly={readOnly}
                    name="bairro"
                    type="text"
                    placeholder="Ex.: Santa Matilde"
                    value={endereco.bairro}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleChangeBairro(e.target.value)
                    }
                    inputProps={{ maxLength: 100 }}
                />
            </Box>
            <Box sx={{ display: 'flex', width: '50%', gap: '3rem' }}>
                <TextField
                    label={'Número*'}
                    error={!!error && !hasValue(endereco.numero)}
                    fullWidth
                    name="numero"
                    readOnly={readOnly}
                    type="text"
                    placeholder="Ex.: 110"
                    value={endereco.numero}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleChangeNumero(e.target.value)
                    }
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
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleComplemento(e.target.value)
                    }
                    inputProps={{ maxLength: 100 }}
                />
            </Box>
        </Box>
    );
};
