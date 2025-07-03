import React, {
	createContext,
	forwardRef,
	ForwardRefRenderFunction,
	MutableRefObject,
	RefObject,
	useCallback,
	useContext,
	useEffect,
	useImperativeHandle,
	useMemo,
	useRef
} from "react";
import {
	IDocRef,
	IDocValues,
	ISysForm,
	ISysFormButtonRef,
	ISysFormComponentRef,
	ISysFormContext,
	ISysFormRef
} from "./typings";
import SysFormMethods from "./sysFormMethods";
import { hasValue } from "../../libs/hasValue";
import { IOption } from "../InterfaceBaseSimpleFormComponent";
import compareArrays from "../../libs/compareArrays";
import AppLayoutContext from "/imports/app/appLayoutProvider/appLayoutContext";
import { useTranslation } from "react-i18next";
import { debounce } from "lodash";

const SysFormContext = createContext<ISysFormContext>({} as ISysFormContext);

const SysForm: ForwardRefRenderFunction<ISysFormRef, ISysForm> = (
	{
		schema,
		doc = {},
		mode = "edit",
		disabled = false,
		loading = false,
		debugAlerts = true,
		submitWithKeyEnter = true,
		validateOnChange = false,
		onChange,
		onSubmit,
		children,
		onFalure
	},
	ref
) => {
	const { showNotification } = useContext(AppLayoutContext);
	const refComponents = useRef<IDocRef>({});
	let refButton: RefObject<ISysFormButtonRef> | null = null;
	const fieldsWithErrors = useRef<{ [key: string]: string }>({});
	const fieldsWithOptions = useRef<IDocRef>({});
	const refDoc = useRef<IDocValues>(doc);
	const validateOnChangeRef = useRef<boolean | Array<string>>(validateOnChange);
	const { t } = useTranslation();

	const _onFailure = (error: Error) => {
		onFalure?.(error, fieldsWithErrors.current);
		if (debugAlerts)
			showNotification({
				title: "Erro no Formulário",
				message: error.message.replace(/error:/gi, ""),
				type: "error"
			});
	};

	const onSubmitForm = useCallback(() => {
		try {
			const newDoc = SysFormMethods.getDocValues(refComponents.current, schema);
			for (const key in refDoc?.current) {
				if (refComponents.current[key]) continue;
				newDoc[key] = refDoc?.current[key];
			}
			refDoc.current = newDoc;
			validateFields();
			onSubmit?.(newDoc);
		} catch (error: any) {
			_onFailure(error);
			throw error;
		}
	}, [onSubmit]);

	const { initialDefaultValues, initialRequiredFields, fieldsWithVisibilityFunction } = useMemo(() => {
		try {
			return SysFormMethods.getInitialParams(schema, doc);
		} catch (e: any) {
			_onFailure(e);
			return { initialDefaultValues: {}, initialRequiredFields: [], fieldsWithVisibilityFunction: [] };
		}
	}, [schema, doc]);

	const setRefComponent = useCallback(
		(component: MutableRefObject<ISysFormComponentRef>) => {
			try {
				refComponents.current = SysFormMethods.setRefComponent({
					mainRef: refComponents.current,
					componentRef: component,
					schema: schema,
					key: component.current.name,
					initialDefaultValues: initialDefaultValues,
					fieldsWithOptions: fieldsWithOptions
				});
			} catch (error: any) {
				_onFailure(error);
			}
		},
		[initialDefaultValues]
	);

	const setInteractiveMethods = useCallback(
		({
			componentRef,
			clearMethod,
			setValueMethod,
			changeVisibilityMethod,
			setErrorMethod,
			setOptionsMethod,
			mapperSysForm
		}: {
			componentRef: MutableRefObject<ISysFormComponentRef>;
			clearMethod: () => void;
			setValueMethod: (value: any) => void;
			changeVisibilityMethod: (visible: boolean) => void;
			setErrorMethod: (error: string | undefined) => void;
			setOptionsMethod?: (options: Array<IOption>) => void;
			mapperSysForm?: (value: any) => any;
		}) => {
			try {
				componentRef.current = {
					...componentRef.current,
					clearValue: clearMethod,
					setValue: setValueMethod,
					setVisible: changeVisibilityMethod,
					setError: setErrorMethod,
					setOptions: setOptionsMethod,
					mapperSysForm: mapperSysForm
				};
			} catch (error: any) {
				_onFailure(error);
			}
		},
		[]
	);

	const onChangeComponentValue = useCallback(
		({ refComponent, value }: { refComponent: MutableRefObject<ISysFormComponentRef>; value: any }) => {
			try {
				refComponent.current.value = value;
				if (
					(!Array.isArray(validateOnChangeRef.current) && validateOnChangeRef.current) ||
					(Array.isArray(validateOnChangeRef.current) && validateOnChangeRef.current.includes(refComponent.current.name)) ||
					hasValue(fieldsWithErrors.current[refComponent.current.name])
				)
					checkIfErrorExists(refComponent);

				const newDoc = SysFormMethods.getDocValues(refComponents.current, schema);
				for (const key in refDoc?.current) {
					if (refComponents.current[key]) continue;
					newDoc[key] = refDoc?.current[key];
				}
				refDoc.current = newDoc;
				checkVisibilityFields();

				updateButtonState();

				debouncedCheckIfNeedToUpdateOptions();

				onChange?.(newDoc);
			} catch (error: any) {
				_onFailure(error);
			}
		},
		[onChange, refButton]
	);

	const updateButtonState = useCallback(() => {
		if (refButton?.current?.type != "submit") return;
		const isValid = checkIfAllRequiredFieldsAreFilled() && !hasValue(fieldsWithErrors.current);
		if (refButton?.current?.disabled !== !isValid) refButton?.current?.setDisabled?.(!isValid);
	}, []);

	const checkVisibilityFields = useCallback(() => {
		try {
			if (fieldsWithVisibilityFunction.length === 0) return;
			for (const field of fieldsWithVisibilityFunction) {
				const refComponent = SysFormMethods.getRefComponentByName(refComponents.current, field);
				if (!refComponent) continue;
				const isVisible = SysFormMethods.checkIfFieldIsVisible(schema, refDoc.current, field);
				refComponent.current.isVisible = isVisible;
				refComponent.current.setVisible?.(isVisible);
			}
		} catch (error: any) {
			_onFailure(error);
		}
	}, []);

	const checkIfAllRequiredFieldsAreFilled = useCallback((doc?: IDocValues): boolean => {
		try {
			if (initialRequiredFields.length === 0) return true;
			if (!doc) doc = refDoc.current;
			for (const field of initialRequiredFields) {
				const isVisible = SysFormMethods.checkIfFieldIsVisible(schema, doc, field);
				if (!isVisible) continue;
				const value = SysFormMethods.getValueByName(doc, field);
				if (!hasValue(value)) return false;
			}
			return true;
		} catch (error: any) {
			console.error(error);
			_onFailure(error);
			return false;
		}
	}, []);

	const checkIfErrorExists = useCallback((componentRef: MutableRefObject<ISysFormComponentRef>) => {
		try {
			const schamaInfo = SysFormMethods.getSchemaByName(schema, componentRef.current.name);
			const isOptional = schamaInfo?.optional;
			const value = componentRef.current.value;
			if (isOptional && !hasValue(value)) {
				componentRef.current.error = undefined;
				componentRef.current.setError?.(undefined);
				delete fieldsWithErrors.current[componentRef.current.name];
				return;
			}
			let errorMessage =
				!isOptional && !hasValue(value)
					? "Campo obrigatório"
					: schamaInfo?.validationFunction?.(value, SysFormMethods.getDocValues(refComponents.current, schema));

			if (hasValue(errorMessage)) errorMessage = t(errorMessage as string) ?? errorMessage;

			componentRef.current.error = errorMessage;
			componentRef.current.setError?.(errorMessage);
			if (errorMessage) {
				fieldsWithErrors.current[componentRef.current.name] = errorMessage;
				return true;
			} else {
				delete fieldsWithErrors.current[componentRef.current.name];
			}
			return false;
		} catch (error: any) {
			_onFailure(error);
		}
	}, []);

	const checkIfNeedToUpdateOptions = useCallback(() => {
		try {
			if (Object.keys(fieldsWithOptions.current).length === 0) return;
			for (const key in fieldsWithOptions.current) {
				const refComponent = fieldsWithOptions.current[key] as MutableRefObject<ISysFormComponentRef>;
				if (!refComponent.current) throw new Error("Componente não encontrado.");
				const schemaInfo = SysFormMethods.getSchemaByName(schema, refComponent.current.name);
				if (!schemaInfo) throw new Error("Schema não encontrado.");
				const newOptions = schemaInfo.options?.(SysFormMethods.getDocValues(refComponents.current, schema));
				if (!newOptions) throw new Error("Opções não encontradas.");
				if (compareArrays(newOptions, refComponent.current.options!)) continue;
				refComponent.current.options = newOptions;
				refComponent.current.setOptions?.(newOptions ?? []);
				refComponent.current.value = undefined;
				refComponent.current.clearValue?.();
			}
		} catch (error: any) {
			_onFailure(error);
		}
	}, []);

	const debouncedCheckIfNeedToUpdateOptions = useRef(
		debounce(() => {
			checkIfNeedToUpdateOptions();
		}, 500)
	).current;

	const validateFields = useCallback(() => {
		try {
			return SysFormMethods.validate({
				schema,
				doc: refComponents.current,
				requiredFields: initialRequiredFields,
				fieldsWithErrors,
				values: refDoc.current
			});
		} catch (error: any) {
			_onFailure(error);
			throw error;
		}
	}, []);

	const updateValue = useCallback(
		(doc: IDocValues) => {
			try {
				if (!hasValue(doc)) return;
				SysFormMethods.updateDoc(doc, schema, refComponents.current);
				const fieldsFilled = checkIfAllRequiredFieldsAreFilled() && !hasValue(fieldsWithErrors.current);
				refButton?.current?.setDisabled?.(!fieldsFilled);
			} catch (error: any) {
				_onFailure(error);
				throw error;
			}
		},
		[refButton]
	);

	useImperativeHandle(
		ref,
		() => ({
			getFieldWithErrors: () => fieldsWithErrors.current,
			getDocValues: () => {
				try {
					return SysFormMethods.getDocValues(refComponents.current, schema);
				} catch (__: any) {
					return {};
				}
			},
			setValue: (name: string, value: any) => {
				try {
					const refComponent = SysFormMethods.getRefComponentByName(refComponents.current, name);
					if (!refComponent) throw new Error("Componente não encontrado.");
					refComponent.current.value = value;
					refComponent.current.setValue?.(value);
					// onChangeComponentValue({ refComponent, value });
				} catch (error: any) {
					_onFailure(error);
					throw error;
				}
			},
			clearForm: () => SysFormMethods.clearForm(refComponents.current, schema),
			validateFields: () => validateFields(),
			submit: () => onSubmitForm(),
			getComponentRef: (name: string) => {
				try {
					return SysFormMethods.getRefComponentByName(refComponents.current, name);
				} catch (error: any) {
					_onFailure(error);
					return { current: {} as ISysFormComponentRef };
				}
			},
			getComponentsRef: () => refComponents.current,
			validateIndividualField: (name: string) => {
				try {
					return checkIfErrorExists(SysFormMethods.getRefComponentByName(refComponents.current, name));
				} catch (error: any) {
					_onFailure(error);
					throw error;
				}
			},
			checkVisibility: () => checkVisibilityFields(),
			checkVisibilityField: (name: string) => {
				try {
					return SysFormMethods.checkIfFieldIsVisible(
						schema,
						SysFormMethods.getDocValues(refComponents.current, schema),
						name
					);
				} catch (error: any) {
					_onFailure(error);
					return true;
				}
			}
		}),
		[onSubmitForm]
	);

	const setButtonRef = useCallback(
		(button: MutableRefObject<ISysFormButtonRef>) => {
			button.current.onClick = onSubmitForm;

			try {
				refButton = button;
			} catch (error: any) {
				_onFailure(error);
			}
		},
		[onSubmitForm]
	);

	useEffect(() => {
		checkVisibilityFields();
		updateButtonState();
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key !== "Enter" || !checkIfAllRequiredFieldsAreFilled()) return;
			if (submitWithKeyEnter) onSubmitForm();
		};
		document.addEventListener("keydown", handleKeyDown);
		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [onSubmitForm]);

	useEffect(() => {
		const newDoc = SysFormMethods.getDocValues(refComponents.current, schema);
		for (const key in doc) {
			newDoc[key] = doc[key];
		}

		refDoc.current = newDoc;
		updateValue(newDoc);
		checkVisibilityFields();
		updateButtonState();
	}, [doc]);

	useEffect(() => {
		validateOnChangeRef.current = validateOnChange;
	}, [validateOnChange]);

	const providerValue: ISysFormContext = useMemo(
		() => ({
			loading: loading,
			disabled: disabled,
			mode: mode,
			docId: doc._id || doc.id,
			setRefComponent: setRefComponent,
			onChangeComponentValue: onChangeComponentValue,
			setInteractiveMethods: setInteractiveMethods,
			setButtonRef: setButtonRef
		}),
		[loading, disabled, mode, onChange, initialDefaultValues, setButtonRef]
	);

	return <SysFormContext.Provider value={providerValue}>{children}</SysFormContext.Provider>;
};

export type { ISysFormRef as ISysFormMethods };
export { SysFormContext };
export default forwardRef(SysForm);
