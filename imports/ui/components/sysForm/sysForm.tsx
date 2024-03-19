import React, { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { ISchema } from "/imports/typings/ISchema";
import { hasValue } from "/imports/libs/hasValue";
import SysFormContext, { ISysFormContext } from "./sysFormContext";


interface ISysForm {
    schema: ISchema<any>;
    doc: { [key: string]: any };
    mode: 'view' | 'edit' | 'create';
    disabled?: boolean;
    loading?: boolean;
    onChange?: (doc: { [key: string]: any }) => void;
    onSubmit?: (doc: { [key: string]: any }) => void;
    children?: React.ReactNode;
}

const SysForm : React.FC<ISysForm> = ({ 
    schema, 
    doc, 
    mode = 'create', 
    disabled = false, 
    loading = false, 
    onChange, 
    onSubmit, 
    children 
}) => {
    const {initialDefaultValues, initialRequiredFields, initialHiddenFields} = useMemo(()=> {
        let initialDefaultValues : {[key: string]: any} = {};
        let initialRequiredFields : Array<string> = [];
        let initialHiddenFields : Array<string> = [];
        Object.keys(schema).forEach(key => {
            if (!schema[key].optional) 
                initialRequiredFields.push(key);
            if (schema[key].visibilityFunction && !schema[key].visibilityFunction?.(doc))
                initialHiddenFields.push(key);
            if (doc[key])
                initialDefaultValues[key] = doc[key];
            else if (schema[key].defaultValue)
                initialDefaultValues[key] = schema[key].defaultValue;
        });
        return {initialDefaultValues, initialRequiredFields, initialHiddenFields};
    }, [schema]);

    
    const [docValues, setDocValues] = useState<{[key:string] : any}>(initialDefaultValues);
    const [hiddenFields, setHiddenFields] = useState<Array<string>>(initialHiddenFields);
    const [requiredFieldsFilled, setRequiredFieldsFilled] = useState<boolean>(false);

    const [state, setState] = useState<{
        loading: boolean;
        disabled: boolean;
        fieldsWithErrors: {[key:string] : string | undefined};
    }>({
        loading: loading,
        disabled: disabled,
        fieldsWithErrors: {}
    });

    const compareArrays = useCallback((arr1: Array<any>, arr2: Array<any>) : boolean => {
        return arr1.some(item => !arr2.includes(item)) || arr2.some(item => !arr1.includes(item));
    } , []);

    const checkIfAllRequiredFieldsAreFilled = useCallback((doc: {[key: string] : any}) => {
        const allRequiredFieldsAreFilled = initialRequiredFields.length === 0 ? true : initialRequiredFields.every(key => {
            if (schema[key].visibilityFunction) {
                const visibility = !!schema[key].visibilityFunction?.(doc);
                if (!visibility) return true; 
            }
            return hasValue(doc[key]);
        });
        setRequiredFieldsFilled(allRequiredFieldsAreFilled);
    } , [initialRequiredFields, requiredFieldsFilled]);

    const getDocValues = useCallback(() => {
        let docs : {[key: string] : any} = {};
        setDocValues((prev) => {
            docs = prev;
            return prev;
        });
        return docs;
    }, []);

    const checkHiddenFieldsVisibilityChanged = useCallback((doc: {[key: string] : any}) => {
        const newHiddenFields = Object.keys(schema).filter(key => schema[key].visibilityFunction && !schema[key].visibilityFunction?.(doc));
        if(compareArrays(newHiddenFields, hiddenFields))
            setHiddenFields(newHiddenFields);
    } , [hiddenFields]);

    const changeDocValue = useCallback((key: string, value: any) => {
        setDocValues((prev: {[key: string] : any} ) => {
            const newDoc = { ...prev, [key]: value };
            onChange?.(newDoc);
            checkIfAllRequiredFieldsAreFilled(newDoc);
            checkHiddenFieldsVisibilityChanged(newDoc);
            return newDoc;
        });
    }, [hiddenFields]);

    const handleSubmit = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try{
            if(!requiredFieldsFilled) throw new Error('Os campos obrigatórios não foram preenchidos');
            const fieldsWithErrors = {...state.fieldsWithErrors};
            const docs = getDocValues();
            for(const keyDoc in docs){
                if(hiddenFields.includes(keyDoc)) continue;
                const erro = schema[keyDoc].validationFunction?.(docs[keyDoc], docs);
                if(erro) fieldsWithErrors[keyDoc] = erro;
                else if(fieldsWithErrors[keyDoc]) delete fieldsWithErrors[keyDoc];
            }
            if(compareArrays(Object.keys(fieldsWithErrors), Object.keys(state.fieldsWithErrors))) 
                setState({...state, fieldsWithErrors});
            if(Object.keys(fieldsWithErrors).length > 0) throw new Error('Existem campos com erro');
            onSubmit?.(docs);

        }catch(e){
            console.error(e);
        }
    }, [requiredFieldsFilled, state, hiddenFields]);


    const getSysFormComponentInfo = useCallback((name: string) => {
        if(!schema[name]) return undefined;
        return {
            isVisibile: !hiddenFields.includes(name),
            isOptional: !!schema[name].optional,
            onChange: changeDocValue,
            readOnly: mode === 'view' || schema[name].readOnly,
            loading: state.loading,
            erro: state.fieldsWithErrors[name],
            defaultValue: docValues[name]
        };
    }, [hiddenFields, state]);

    const getSysFormButtonInfo = useCallback(() => {
        return {
            disabled: !requiredFieldsFilled,
            loading: state.loading,
            onClick: handleSubmit
        }
    }, [requiredFieldsFilled, state]);


    useEffect(() => {
        checkIfAllRequiredFieldsAreFilled(docValues);
    }, []);

    const providerValue : ISysFormContext = useMemo(() => ({
        getSysFormComponentInfo: getSysFormComponentInfo,
        getSysFormButtonInfo: getSysFormButtonInfo
    }), [hiddenFields, state, requiredFieldsFilled]);

    return (
        <SysFormContext.Provider value={providerValue}>
            {children}
        </SysFormContext.Provider>
    );

}; 

export default SysForm;