import React from "react";
import TextField from "../TextField/TextField";
import TextMaskField from "../TextMaskField/TextMaskField";
import { getEnderecoByCep } from "./getEnderecoByCep";
import { hasValue } from "/imports/libs/hasValue";

interface IresponseCep {
    endereco: object,
    cep: string,
    logradouro: string,
    complemento: string,
    bairro: string,
    localidade: string,
    uf: string,
    ibge: string,
    gia: string,
    ddd: string,
    siafi: string,
    erro?: boolean;

};

interface ICepField {
    name: string;
    onChange: (fieldTarget: object, field: object) => void;
    error: boolean;
};

export const CepField = ({ value, name, onChange, error, readOnly, showNotification }: ICepField) => {

    const [endereco, setEndereco] = React.useState<object | string | undefined>(value||{});
    const [readOnlyFlag, setreadOnlyFlag] = React.useState<boolean>();

    const {cep,logradouro,bairro} = endereco;
    console.log('value', value);
    React.useEffect(() => {

        if (cep && cep.length === 9 && (!value || value.cep !== cep)) {
            getEnderecoByCep(cep, (error: string, response: IresponseCep) => {
                if (!error) {

                    if(response&&response.erro === true){
                        console.log('cep invalido', response.erro);
                        if(!value&&value!==undefined){
                            setEndereco({ cep: '', logradouro: '', bairro: ''});
                            showNotification({
                                type: 'warning',
                                title: 'Problema no campo de CEP!',
                                description: 'Você digitou um CEP inválido!',
                            });
                            // return;
                        }else{
                            if(value === undefined &&response.erro === true){
                                handleChangeEndereco({cep:'', logradouro: '', bairro: '', })
                                showNotification({
                                    type: 'warning',
                                    title: 'Problema no campo de CEP!',
                                    description: 'Você digitou um CEP inválido!',
                                });
                            };
                        };
                    };

                    setEndereco({cep, logradouro: response.logradouro, bairro: response.bairro, });
                    setreadOnlyFlag(!!(response.logradouro && response.bairro));
                } else {
                    console.log("ERROR: ", error);
                };
            });
        };
    }, [cep]);

    React.useEffect(() => {
        if (cep !== undefined && (cep === '' || cep && cep.length <= 0)) {
            setreadOnlyFlag(false);
            setEndereco({...endereco, logradouro:'', bairro:'', })
        };
    }, [cep])

    React.useEffect(() => {
        if (!hasValue(value)) {
            setreadOnlyFlag(false);
            setEndereco({})
        }else{
            setEndereco({cep: value.cep, logradouro: value.logradouro, bairro: value.bairro})
        }
    }, [value])

    React.useEffect(() => {
        const endereco = { cep, logradouro, bairro };
        if (hasValue(cep) && hasValue(logradouro) && hasValue(bairro)
        && (!value || value.cep !== cep && value.logradouro !== logradouro && value.bairro !== bairro)) {
            handleChangeEndereco(endereco)
        };

        if ((!hasValue(cep) || !hasValue(logradouro) || !hasValue(bairro)) && hasValue(value)) {
            handleChangeEndereco(undefined)

        };
    }, [cep, logradouro, bairro]);

    const handleChangeEndereco = (endereco: ({ cep?: string, logradouro?: string, bairro?: string } | undefined)) => {
        onChange({ name, target: { name, value: endereco } }, { name, value: endereco });
    };


    const handleChangeCep = (value: string) => {
        setEndereco({...endereco, cep: value, })
    };

    const handleChangeBairo = (value: string) => {
        setEndereco({...endereco, bairro: value, })
    };

    const handleChangeLogradouro = (value: string) => {
        //setLogradouro(value);
        setEndereco({...endereco, logradouro: value, })
    };
    return (
        <>
            <TextMaskField
                error={!!error && !hasValue(cep)}
                label={"CEP"}
                placeholder="Ex.: 123.456.789-12"
                name="cep"
                schema={{ mask: '#####-###' }}
                value={cep}
                readOnly={readOnly}
                onChange={(e) => handleChangeCep(e.target.value)}
            />

            <TextField
                error={!!error && !hasValue(logradouro)}
                readOnly={readOnlyFlag||readOnly}
                label={"Logradouro"}
                fullWidth
                name="logradouro"
                type="text"
                placeholder=""
                value={logradouro}
                onChange={(e) => handleChangeLogradouro(e.target.value)}
            />

            <TextField
                error={!!error && !hasValue(bairro)}
                readOnly={readOnlyFlag||readOnly}
                label={"Bairro"}
                fullWidth
                name="bairro"
                type="text"
                placeholder=""
                value={bairro}
                onChange={(e) => handleChangeBairo(e.target.value)}
            />
        </>
    );
};


