import React, { createContext, useCallback, useEffect, useMemo, useState, ForwardRefRenderFunction, forwardRef, useRef, useImperativeHandle, useContext } from 'react';
import { hasValue } from '/imports/libs/hasValue';
import { IDocValues, IOnChangeDocValue, ISysForm, ISysFormContext, ISysFormRef, ISysFormState } from './typings';
import { IDefField, ISchema } from '/imports/typings/ISchema';
import { SysAppLayoutContext } from '/imports/app/AppLayout';

const SysFormContext = createContext<ISysFormContext>({} as ISysFormContext);

const getSchemInfo = (schema: ISchema<any>, name: string) : IDefField<any>  => {
	try{
		const path = name.split('.');
		if(path.length > 4 ) throw new Error('Não é possível ter mais que 4 níveis de aninhamento de subSchemas.');
		if(path.length === 1) return schema[name];
		if(!schema[path[0]].subSchema) throw new Error(`O campo não possui subSchema.`);
		return getSchemInfo(schema[path[0]].subSchema!, path.slice(1).join('.'));
	}catch(e: any){
		throw new Error(`Erro ao buscar informações do campo ${name}: ${e.message}`);
	}
};

const getValueDocValue = (doc: IDocValues, name: string, schema: ISchema<any>) : any => {
	try{
		const path = name.split('.');
		if(path.length === 1) return doc[name];
		if(!doc[path[0]]) return undefined;
		if(!schema[path[0]].subSchema) throw new Error(`O campo não possui subSchema.`);
		return getValueDocValue(doc[path[0]], path.slice(1).join('.'), schema[path[0]].subSchema!);
	}catch(e: any){
		throw new Error(`Erro ao buscar valor do campo ${name}: ${e.message}`);
	}

};

const setNewValueDocValue = (doc: IDocValues, name: string, value: any, schema: ISchema<any>) : IDocValues => {
	try{
		const path = name.split('.');
		if(path.length === 1) return {...doc, [name]: value};
		if(!doc[path[0]]) return doc;
		if(!schema[path[0]].subSchema) throw new Error(`O campo não possui subSchema.`);
		return {...doc, [path[0]]: setNewValueDocValue(doc[path[0]], path.slice(1).join('.'), value, schema[path[0]].subSchema!)};
	}catch(e: any){
		throw new Error(`Erro ao setar novo valor do campo ${name}: ${e.message}`);
	}
};

const getInitialParams = (
	schema: ISchema<any>,
	doc: IDocValues,
	initialDefaultValues: IDocValues = {},
	initialRequiredFields: string[] = [],
	fieldsWithVisibilityFunction: string[] = []
): {
	initialDefaultValues: IDocValues;
	initialRequiredFields: string[];
	fieldsWithVisibilityFunction: string[];
} => {
	for (const key in schema) {
		const { defaultValue, optional, visibilityFunction, subSchema } = schema[key];
	  	if (!subSchema) {
			const value = doc[key] !== undefined ? doc[key] : defaultValue;
			initialDefaultValues[key] = value;
			if (!optional) initialRequiredFields.push(key);
			if (visibilityFunction) fieldsWithVisibilityFunction.push(key);
	  	} else {
			const {
		  		initialDefaultValues: subInitialDefaultValues,
		  		initialRequiredFields: subInitialRequiredFields,
		  		fieldsWithVisibilityFunction: subFieldsWithVisibilityFunction,
			} = getInitialParams(subSchema, doc[key] || {});
			initialDefaultValues[key] = subInitialDefaultValues;
			initialRequiredFields.push(...subInitialRequiredFields.map((field) => `${key}.${field}`));
			fieldsWithVisibilityFunction.push(
		 		...subFieldsWithVisibilityFunction.map((field) => `${key}.${field}`)
			);
	  	}
	}
	return { initialDefaultValues, initialRequiredFields, fieldsWithVisibilityFunction };
};

const validateFields = (
	schema: ISchema<any>,
	doc: IDocValues,
	parentKey: string = '',
	fieldsWithErrors: { [key: string]: string | undefined } = {}
) : { [key: string]: string | undefined } => {
	for (const key in schema) {
		const currentKey = parentKey ? `${parentKey}.${key}` : key;
  
	  	if (schema[key].subSchema) {
			fieldsWithErrors = validateFields(
		  	schema[key].subSchema!,
		  	doc[key] || {},
		  	currentKey,
		  	fieldsWithErrors
			);
	  	}
  
	  	const { validationFunction, optional } = schema[key];
		const value = getValueDocValue(doc, key, schema);

	  	if (validationFunction) {
			const error = validationFunction(value, doc);
			if (error)  fieldsWithErrors[currentKey] = error;
			if((!optional) && (value === undefined || value === '')){
				fieldsWithErrors[currentKey] = "Esse campo é obrigatório";
			}
	  	}
	}
	return fieldsWithErrors;
};
  

const compareArrays = (arr1: Array<any>, arr2: Array<any>): boolean => {
	return arr1.some((item) => !arr2.includes(item)) || arr2.some((item) => !arr1.includes(item));
};


const SysForm: ForwardRefRenderFunction<ISysFormRef, ISysForm> = ({
	schema,
	doc,
	mode = 'view',
	disabled = false,
	loading = false,
	submitWithKeyEnter = true,
	onChange,
	onSubmit,
	children
}, ref) => {
	const {showNotification} = useContext(SysAppLayoutContext);

	const {initialDefaultValues, initialRequiredFields, fieldsWithVisibilityFunction } = useMemo(() => {
		try{
			if(!schema) throw new Error('Não há um schema definido para o sysForm.');
			return getInitialParams(schema, doc);
		}catch(e:any){
			showNotification({title: 'Erro ao iniciar SysForm', message: e.message, type: 'error'});
			return { initialDefaultValues: {}, initialRequiredFields: [], fieldsWithVisibilityFunction: [] };
		}
	}, [schema]);

	const docValues = useRef<IDocValues>(initialDefaultValues);
	
	const [hiddenFields, setHiddenFields] = useState<Array<string>>([]);
	const [requiredFieldsFilled, setRequiredFieldsFilled] = useState<boolean>(false);
	const [state, setState] = useState<ISysFormState>({
		loading: loading,
		disabled: disabled,
		mode: mode,
		fieldsWithErrors: {}
	});

	useImperativeHandle(ref, () => ({
		doc: docValues,
		hiddenFields: hiddenFields,
		hiddenFieldsRef: hiddenFieldsRef,
		requiredFields: initialRequiredFields,
		onChangeDocValue: onChangeDocValue,
		checkIfAllRequiredFieldsAreFilled: checkIfAllRequiredFieldsAreFilled,
		checkVisibilityFields: checkVisibilityFields,
		validateFields: validate,
		submit: submit
	}), []);

	useEffect(() => {
		checkIfAllRequiredFieldsAreFilled();
		checkVisibilityFields();
		const handleKeyDown = (event : KeyboardEvent) => {
            if(event.key !== 'Enter' || !requiredFieldsFilledRef.current) return;
			if(submitWithKeyEnter) submit();
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => {
          document.removeEventListener('keydown', handleKeyDown);
        };
	}, []);

	useEffect(() => {
		setState((prev) => ({ ...prev, loading, disabled, mode }));
	}, [loading, disabled, mode]);

	const hiddenFieldsRef = useRef(hiddenFields);
	const requiredFieldsFilledRef = useRef(requiredFieldsFilled);

	const checkIfAllRequiredFieldsAreFilled = useCallback(() => {
		const allRequiredFieldsAreFilled = initialRequiredFields.length === 0
			? true
			: initialRequiredFields.every((key) => {
				const shcemaInfo = getSchemInfo(schema, key);
				if (!!shcemaInfo.visibilityFunction && !shcemaInfo.visibilityFunction?.(docValues.current)) {
					return true;
				}
				return hasValue(getValueDocValue(docValues.current, key, schema));
			});
		if(allRequiredFieldsAreFilled !== requiredFieldsFilledRef.current){
			requiredFieldsFilledRef.current = allRequiredFieldsAreFilled;
			setRequiredFieldsFilled(allRequiredFieldsAreFilled);
		}

	}, [initialDefaultValues, requiredFieldsFilled]);

	const checkVisibilityFields = useCallback(() => {
		const newHiddenFields = fieldsWithVisibilityFunction.filter((field) => {
			const schemaInfo = getSchemInfo(schema, field);
			return !schemaInfo.visibilityFunction?.(docValues.current);
		});

		if(compareArrays(hiddenFieldsRef.current, newHiddenFields)){
			hiddenFieldsRef.current = newHiddenFields;
			setHiddenFields(newHiddenFields);
		}

	}, [hiddenFields]);

	const onChangeDocValue = useCallback(({name, value}: IOnChangeDocValue) => {
		docValues.current = setNewValueDocValue(docValues.current, name, value, schema);
		checkIfAllRequiredFieldsAreFilled();
		checkVisibilityFields();
		onChange?.(docValues.current);	
	}, []);

	const validate = useCallback(() => {
		try{
			const fieldsWithErrors = validateFields(schema, docValues.current);
			setState((prev) => ({ ...prev, fieldsWithErrors }));
			if(!requiredFieldsFilledRef.current) throw new Error('Preencha todos os campos obrigatórios.');
			if(Object.keys(fieldsWithErrors).length > 0) throw new Error('Existem campos com erro.');
			return true;
		}catch(e:any){
			showNotification({title: 'Erro ao validar campos', message: e.message, type: 'error'});
			return false;
		}
	}, []);

	const submit = useCallback(() => {
		if(validate()) onSubmit?.(docValues.current);
	}, []);

	const getSysFormComponentInfo = useCallback(
		(name: string) => {
			if (!!!getSchemInfo(schema, name)) return undefined;
			return {
				isVisibile: !hiddenFields.includes(name),
				isOptional: !!getSchemInfo(schema, name).optional,
				onChange: onChangeDocValue,
				loading: state.loading,
				disabled: state.disabled,
				erro: state.fieldsWithErrors[name],
				defaultValue: getValueDocValue(docValues.current, name, schema),
				schema: getSchemInfo(schema, name),
				readOnly: state.mode === 'view' || !!getSchemInfo(schema, name).readOnly,
			};
		},
		[hiddenFields, state]
	);

	const getSysFormButtonInfo = useCallback(() => {
		return {
			disabled: !requiredFieldsFilled,
			loading: state.loading,
			onClick: submit
		};
	}, [requiredFieldsFilled, state]);

	const providerValue: ISysFormContext = useMemo(()=> ({
		getSysFormComponentInfo: getSysFormComponentInfo,
		getSysFormButtonInfo: getSysFormButtonInfo
	}), [hiddenFields, state, requiredFieldsFilled]);

	return (
		<SysFormContext.Provider value={providerValue}>
			{children}
		</SysFormContext.Provider>
	)
}

export type { ISysFormRef as ISysFormMethods };
export { SysFormContext };
export default forwardRef(SysForm);