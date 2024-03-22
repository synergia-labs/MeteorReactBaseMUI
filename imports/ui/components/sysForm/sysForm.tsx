import React, { createContext, useCallback, useEffect, useMemo, useState, ForwardRefRenderFunction, forwardRef, useRef, useImperativeHandle } from 'react';
import { ISchema } from '/imports/typings/ISchema';
import { hasValue } from '/imports/libs/hasValue';
import SysFormContext, { ISysFormContext } from './sysFormContext';

interface IDocValues {
	[key: string]: any;
}

interface ISysForm {
	schema: ISchema<any>;
	doc: IDocValues;
	mode: 'view' | 'edit' | 'create';
	ref?: React.RefObject<HTMLFormElement>;
	disabled?: boolean;
	loading?: boolean;
	onChange?: (doc: IDocValues) => void;
	onSubmit?: (doc: IDocValues) => void;
	children?: React.ReactNode;
}

interface ISysFormRef {
	doc: IDocValues;
	onChangeDocValue: ({name, value}: IOnChangeDocValue) => void;

}

interface ISysFormState {
	loading: boolean;
	disabled: boolean;
	fieldsWithErrors: { [key: string]: string | undefined };
}

export interface IOnChangeDocValue {
	name: string;
	value: any;
}

const SysForm: ForwardRefRenderFunction<ISysFormRef, ISysForm> = ({
	schema,
	doc,
	mode = 'create',
	disabled = false,
	loading = false,
	onChange,
	onSubmit,
	children
}, ref) => {
	const { initialDefaultValues, initialRequiredFields, fieldsWithVisibilityFunction } = useMemo(() => {
		let initialDefaultValues: { [key: string]: any } = {};
		let initialRequiredFields: Array<string> = [];
		let fieldsWithVisibilityFunction: Array<string> = [];
		Object.keys(schema).forEach((key) => {
			if (!schema[key].optional) initialRequiredFields.push(key);
			if (!!schema[key].visibilityFunction) fieldsWithVisibilityFunction.push(key);
			if (doc[key]) initialDefaultValues[key] = doc[key];
			else if (schema[key].defaultValue) initialDefaultValues[key] = schema[key].defaultValue;
		});
		return { initialDefaultValues, initialRequiredFields, fieldsWithVisibilityFunction };
	}, [schema]);

	const docValues = useRef<IDocValues>(doc);
	const [hiddenFields, setHiddenFields] = useState<Array<string>>([]);
	const [requiredFieldsFilled, setRequiredFieldsFilled] = useState<boolean>(false);
	const [state, setState] = useState<ISysFormState>({
		loading: loading,
		disabled: disabled,
		fieldsWithErrors: {}
	});

	const onChangeDocValue = useCallback(({name, value}: IOnChangeDocValue) => {
		docValues.current = {
			...docValues.current,
			[name]: value
		};
		console.log(docValues.current);
		checkIfAllRequiredFieldsAreFilled();
		checkHiddenFieldsVisibility();
		onChange?.(docValues.current);	
	}, []);

	const checkIfAllRequiredFieldsAreFilled = useCallback(() => {
		const allRequiredFieldsAreFilled = initialRequiredFields.length === 0
			? true
			: initialRequiredFields.every((key) => {
				if (schema[key].visibilityFunction) {
					return schema[key].visibilityFunction?.(docValues.current);
				}
				return hasValue(docValues.current[key]);
			});
		if(allRequiredFieldsAreFilled !== requiredFieldsFilled)
			setRequiredFieldsFilled(allRequiredFieldsAreFilled);
	}, [requiredFieldsFilled, initialDefaultValues]);

	const __compareArrays = useCallback((arr1: Array<any>, arr2: Array<any>): boolean => {
		return arr1.some((item) => !arr2.includes(item)) || arr2.some((item) => !arr1.includes(item));
	}, []);

	const checkHiddenFieldsVisibility = useCallback(() => {
		const newHiddenFields = fieldsWithVisibilityFunction.filter((field) => {
			return !schema[field].visibilityFunction?.(docValues.current);
		});
		if(hiddenFields.length === newHiddenFields.length && __compareArrays(hiddenFields, newHiddenFields)) return;
		setHiddenFields(newHiddenFields);
	}, [hiddenFields]);
	
	
	
	
	
	
	
	useImperativeHandle(ref, () => ({
		doc: docValues.current,
		onChangeDocValue
	}), []);

	const getSysFormComponentInfo = useCallback(
		(name: string) => {
			console.log('name', name);
			if (!schema[name]) return undefined;
			return {
				isVisibile: !hiddenFields.includes(name),
				isOptional: !!schema[name].optional,
				onChange: onChangeDocValue,
				readOnly: mode === 'view' || schema[name].readOnly,
				loading: state.loading,
				erro: state.fieldsWithErrors[name],
				defaultValue: docValues.current[name],
				schema: schema[name]
			};
		},
		[hiddenFields, state]
	);

	const getSysFormButtonInfo = useCallback(() => {
		return {
			disabled: !requiredFieldsFilled,
			loading: state.loading,
			onClick: () => {}
		};
	}, [requiredFieldsFilled, state]);

	useEffect(() => {
		checkIfAllRequiredFieldsAreFilled();
		checkHiddenFieldsVisibility();
	}, []);

	const providerValue: ISysFormContext = useMemo(
		() => ({
			getSysFormComponentInfo: getSysFormComponentInfo,
			getSysFormButtonInfo: getSysFormButtonInfo
		}),
		[hiddenFields, state, requiredFieldsFilled]
	);





	return <SysFormContext.Provider value={providerValue}>{children}</SysFormContext.Provider>;
	

}

export type { ISysFormRef as ISysFormMethods };
export default forwardRef(SysForm);
