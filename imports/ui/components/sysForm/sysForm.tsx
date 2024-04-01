import React, { createContext, useCallback, useMemo, ForwardRefRenderFunction, forwardRef, useRef, useContext, MutableRefObject, useEffect, useImperativeHandle } from 'react';
import { IDocRef, IDocValues, ISysForm, ISysFormButtonRef, ISysFormComponentRef, ISysFormContext, ISysFormRef,} from './typings';
import { SysAppLayoutContext } from '/imports/app/AppLayout';
import SysFormMethods from './sysFormMethods';
import { hasValue } from '/imports/libs/hasValue';

const SysFormContext = createContext<ISysFormContext>({} as ISysFormContext);

const SysForm: ForwardRefRenderFunction<ISysFormRef, ISysForm> = ({
	schema,
	doc,
	mode = 'view',
	disabled = false,
	loading = false,
	debugAlerts = true,
	submitWithKeyEnter = true,
	validateOnChange = false,
	onChange,
	onSubmit,
	children
}, ref) => {


	const {showNotification} = useContext(SysAppLayoutContext);
	const refComponents = useRef<IDocRef>({});
	const refButton = useRef<MutableRefObject<ISysFormButtonRef>>();
	const fieldsWithErrors = useRef<Array<string>>([]);

	const __onFailure = (error: Error) => {
		if(debugAlerts) 
			showNotification({
				title: 'Erro no Formulário',
				message: error.message, 
				type: 'error'
			});
	};

	const {initialDefaultValues, initialRequiredFields, fieldsWithVisibilityFunction } = useMemo(() => {
		try{
			return SysFormMethods.getInitialParams(schema, doc);
		}catch(e:any){
			__onFailure(e);
			return { initialDefaultValues : {}, initialRequiredFields: [], fieldsWithVisibilityFunction: [] };
		}
	}, [schema]);

	const setRefComponent = useCallback((component: MutableRefObject<ISysFormComponentRef>) => {
		try{
			refComponents.current = SysFormMethods.setRefComponent({
				mainRef: refComponents.current,
				componentRef: component,
				schema: schema,
				initialDefaultValues: initialDefaultValues
			});
		}catch(error:any){
			__onFailure(error);
		}
	}, []);

	const setInteractiveMethods = useCallback(({
		componentRef, 
		clearMethod,
		setValueMethod,
		changeVisibilityMethod,
		setErrorMethod,
	}:{
		componentRef: MutableRefObject<ISysFormComponentRef>;
		clearMethod: () => void;
		setValueMethod: (value: any) => void;
		changeVisibilityMethod: (visible: boolean) => void;
		setErrorMethod: (error: string | undefined) => void;
	}) => {
		try{
			componentRef.current = {
				...componentRef.current,
				clearValue: clearMethod,
				setValue: setValueMethod,
				setVisible: changeVisibilityMethod,
				setError: setErrorMethod,
			};
		}catch(error:any){
			__onFailure(error);
		}
	}, []);

	const setButtonRef = useCallback((button: MutableRefObject<ISysFormButtonRef>) => {
		button.current = {
			...button.current,
			disabled: !checkIfAllRequiredFieldsAreFilled(initialDefaultValues),
			onClick: onSubmitForm,
		}
		try{
			refButton.current = button;
		}catch(error:any){
			__onFailure(error);
		}
	}, []);

	const onChangeComponentValue = useCallback(({refComponent, value}: {refComponent: MutableRefObject<ISysFormComponentRef>, value: any}) => {
		try{
			refComponent.current.value = value;
			checkVisibilityFields();
			if(
				(!Array.isArray(validateOnChange) && validateOnChange) ||
				Array.isArray(validateOnChange) && validateOnChange.includes(refComponent.current.name) ||
				fieldsWithErrors.current.includes(refComponent.current.name)
			) checkIfErrorExists(refComponent);
			if(initialRequiredFields.includes(refComponent.current.name))
				refButton.current?.current?.setDisabled?.(!checkIfAllRequiredFieldsAreFilled());

			onChange?.(SysFormMethods.getDocValues(refComponents.current, schema));
		}catch(error:any){
			__onFailure(error);
		}
	}, [onChange]);

	const checkVisibilityFields = useCallback(() => {
		try{
			if(fieldsWithVisibilityFunction.length === 0) return;
			for(const field of fieldsWithVisibilityFunction){
				const refComponent = SysFormMethods.getRefComponentByName(refComponents.current, field);
				if(!refComponent) continue;
				const isVisible = SysFormMethods.checkIfFieldIsVisible(schema, SysFormMethods.getDocValues(refComponents.current, schema), field);
				refComponent.current.isVisible = isVisible;
				refComponent.current.setVisible?.(isVisible);
			}
		}catch(error:any){
			__onFailure(error);
		}
	}, []);

	const checkIfAllRequiredFieldsAreFilled = useCallback((doc?: IDocValues) : boolean => {
		try{
			if(initialRequiredFields.length === 0) return true;
			if(!doc) doc = SysFormMethods.getDocValues(refComponents.current, schema);
			for(const field of initialRequiredFields){
				if(!SysFormMethods.checkIfFieldIsVisible(schema, doc, field)) continue;
				const value = SysFormMethods.getValueByName(doc, field);
				if(!hasValue(value)) return false;
			}
			return true;
		}catch(error:any){
			__onFailure(error);
			return false;
		}
	}, []);

	const checkIfErrorExists = useCallback((componentRef: MutableRefObject<ISysFormComponentRef>) => {
		try{
			const schamaInfo = SysFormMethods.getSchemaByName(schema, componentRef.current.name);
			const errorMessage = schamaInfo?.validationFunction?.(componentRef.current.value);
			componentRef.current.error = errorMessage;
			componentRef.current.setError?.(errorMessage);
		}catch(error:any){
			__onFailure(error);
		}
		
	}, []);

	const validateFields = useCallback(() => {
		try{
			return SysFormMethods.validate({
				schema,
				doc: refComponents.current,
				requiredFields: initialRequiredFields,
				fieldsWithErrors,
			});
		}catch(error:any){
			__onFailure(error);
			return false;
		}
	}, []);
	
	const onSubmitForm = useCallback(() => {
		try{
			if(validateFields()) throw new Error('Existem campos inválidos.');
			if(onSubmit) onSubmit(SysFormMethods.getDocValues(refComponents.current, schema));
		}catch(error:any){
			__onFailure(error);
		}
	}, []);

	useImperativeHandle(ref, () => ({
		getDocValues: () => SysFormMethods.getDocValues(refComponents.current, schema),
		clearForm: () => SysFormMethods.clearForm(refComponents.current, schema),
		validateFields: () => validateFields(),
		submit: () => onSubmitForm(),
		getComponentRef: (name: string) => SysFormMethods.getRefComponentByName(refComponents.current, name),
		getComponentsRef: () => refComponents.current,
		validateIndividualField: (name: string) => checkIfErrorExists(SysFormMethods.getRefComponentByName(refComponents.current, name)),
		checkVisibility: () => checkVisibilityFields(),
		checkVisibilityField: (name: string) => {
			try{
				return SysFormMethods.checkIfFieldIsVisible(schema, SysFormMethods.getDocValues(refComponents.current, schema), name);
			}catch(error:any){
				__onFailure(error);
				return true;
			}
		}
	}), []);

	useEffect(() => {
		checkIfAllRequiredFieldsAreFilled();
		checkVisibilityFields();
		const handleKeyDown = (event : KeyboardEvent) => {
            if(event.key !== 'Enter' || !checkIfAllRequiredFieldsAreFilled()) return;
			if(submitWithKeyEnter) onSubmitForm();
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => {
          document.removeEventListener('keydown', handleKeyDown);
        };
	}, []);

	const providerValue : ISysFormContext = useMemo(() => ({
		loading: loading,
		disabled: disabled,
		mode: mode,
		setRefComponent : setRefComponent,
		onChangeComponentValue : onChangeComponentValue,
		setInteractiveMethods : setInteractiveMethods,
		setButtonRef : setButtonRef,
	}), [loading, disabled, mode, onChange]);

	return (
		<SysFormContext.Provider value={providerValue}>
			{children}
		</SysFormContext.Provider>
	);
}

export type { ISysFormRef as ISysFormMethods };
export { SysFormContext };
export default forwardRef(SysForm);