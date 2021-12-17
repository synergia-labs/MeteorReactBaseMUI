import React, {useEffect, useState} from 'react';

import SelectMunicipioDistritoField from './SelectMunicipioDistritoField';
import SelectField from "/imports/ui/components/SimpleFormFields/SelectField/SelectField";
import SimpleLabelView from "/imports/ui/components/SimpleLabelView/SimpleLabelView";
import * as appStyle from "/imports/materialui/styles";

import {hasValue} from "/imports/libs/hasValue";
import TextField from "/imports/ui/components/SimpleFormFields/TextField/TextField";


export default React.memo(({   naoObrigatorio,
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
    const [estado, setEstado] = useState(value ? value.estado : undefined)
    const [municipio, setMunicipio] = useState(value ? value.municipio : undefined)
    const [distrito, setDistrito] = useState(value ? value.distrito : undefined)


    const definirEstado = (e) => {
        setEstado(e.target.value)
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

    }


    const handleChange = (localizacao) => {

        if(localizacao&&Object.keys(localizacao).find(loc=>!!localizacao[loc])) {
            onChange({name, target: {name, value: localizacao}}, {name, value: localizacao});
        } else {
            if(value) {
                onChange({name, target: {name, value: undefined}}, {name, value: undefined});
            }

        }

    }

    const definirMunicipio = (e) => {
        const mundist = e.target.value;
        setMunicipio(mundist ? mundist.municipio : null);
        setDistrito(mundist ? mundist.distrito : null);
        //updateLocalizacao();
    }

    useEffect(() => {
        const localizacao = {estado, municipio, distrito};
        if (!hasValue(value)&&(hasValue(estado)||hasValue(municipio)||hasValue(distrito))||(hasValue(value) && (value.estado !== estado || value.municipio !== municipio || value.distrito !== distrito))) {
            if(isSearch) {
                handleChange(localizacao)
            } else if (estado&&municipio) {
                handleChange(localizacao)
            } else {
                handleChange(undefined)
            }

        }
    }, [estado, municipio, distrito]);

    useEffect(() => {
        if (value && value.estado !== estado) {
            setEstado(value.estado)
        }
        if (value && value.municipio !== municipio) {
            setMunicipio(value.municipio)
        }
        if (value && value.distrito !== distrito) {
            setDistrito(value.distrito)
        }

        if(!value) {
            setEstado(undefined)
            setMunicipio(undefined)
            setDistrito(undefined)
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
                    ...appStyle.fieldContainer,
                }}
            >
                {label && !otherProps.rounded ? <SimpleLabelView label={label} help={help}/> : null}
                <TextField
                    id={name}
                    key={name}
                    value={
                        (value === '-' || !value) ? '-' : (value.municipio + (value.distrito ? '-' + value.distrito : '') + '/' + value.estado)
                    }
                    readOnly={true}
                />
            </div>
        );
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'row', flexFlow: 'wrap' }}>
            <div style={{ minWidth: '160px', flex: 1, marginRight: '8px' }}>
                <SelectField
                    error={!!error&&!estado}
                    readOnly={!!readOnly}
                    label={naoObrigatorio?'Estado de Origem':'Estado de Origem'}
                    name={'estado'}
                    value={estado}
                    style={{backgroundColor: '#FFF'}}
                    options={["AC", "AL", "AM", "AP", "BA", "CE", "DF", "ES", "GO", "MA", "MG", "MS", "MT",
                        "PA", "PB", "PE", "PI", "PR", "RJ", "RN", "RO", "RR", "RS", "SC", "SE", "SP", "TO"].map(uf => ({
                        value: uf, label: uf
                    }))}
                    onChange={definirEstado}
                    rounded={otherProps.rounded}
                />
            </div>
            <div style={{ minWidth: '250px', flex: 2}}
                // display: estado === 'Não identificado' ? 'none' : undefined,
              >
                <SelectMunicipioDistritoField
                    label={naoObrigatorio?'Município / Distrito de Origem':'Município / Distrito de Origem'}
                    name={'municipio'}
                    error={!!error&&!municipio}
                    readOnly={!!readOnly || estado === 'Não identificado' || estado === 'Atribuição de Origem'}
                    estado={estado}
                    value={municipio && municipio != 'Não identificado' ? {municipio, distrito, estado} : undefined}
                    style={{backgroundColor: '#FFF'}}
                    onChange={definirMunicipio}
                    rounded={otherProps.rounded}
                />
            </div>
        </div>
    );
});
