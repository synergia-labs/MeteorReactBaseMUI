import { MutableRefObject } from 'react';
import { IDefField, ISchema } from '../../../typings/ISchema';
import { IOption } from '../InterfaceBaseSimpleFormComponent';

interface IDocValues {
	[key: string]: any;
}

interface IDocRef {
	[key: string]: MutableRefObject<ISysFormComponentRef> | IDocRef;
}

interface ISysForm {
	schema: ISchema<any>;
	doc?: IDocValues;
	mode?: 'view' | 'edit' | 'create';
	ref?: React.RefObject<HTMLFormElement>;
	debugAlerts?: boolean;
	disabled?: boolean;
	loading?: boolean;
	onChange?: (doc: any) => void;
	onSubmit?: (doc: any) => void;
	submitWithKeyEnter?: boolean;
	validateOnChange?: boolean | Array<string>;
	children?: React.ReactNode;
}

interface ISysFormRef {
	getFieldWithErrors(): { [key: string]: string };

	getDocValues(): IDocValues;

	clearForm(): void;

	validateFields(): void;

	submit(): void;

	getComponentRef(name: string): MutableRefObject<ISysFormComponentRef>;

	getComponentsRef(): IDocRef;

	validateIndividualField(name: string): void;

	checkVisibility: () => void;
	checkVisibilityField: (name: string) => boolean;
}

interface ISysFormContext {
	mode: 'view' | 'edit' | 'create';
	loading: boolean;
	disabled: boolean;
	docId?: string;
	setRefComponent: (component: MutableRefObject<ISysFormComponentRef>) => void;
	setButtonRef: (button: MutableRefObject<ISysFormButtonRef>) => void;
	onChangeComponentValue: ({
		refComponent,
		value
	}: {
		refComponent: MutableRefObject<ISysFormComponentRef>;
		value: any;
	}) => void;
	setInteractiveMethods: ({
		componentRef,
		clearMethod,
		setValueMethod,
		changeVisibilityMethod,
		setErrorMethod,
		setOptionsMethod
	}: {
		componentRef: MutableRefObject<ISysFormComponentRef>;
		clearMethod: () => void;
		setValueMethod: (value: any) => void;
		changeVisibilityMethod: (visible: boolean) => void;
		setErrorMethod: (error: string | undefined) => void;
		setOptionsMethod?: (options: Array<IOption>) => void;
	}) => void;
}

interface ISysFormComponentRef {
	name: string;
	value?: any;
	schema?: IDefField<any>;
	options?: Array<IOption>;
	isVisible?: boolean;
	error?: string;
	setValue?: (value: any) => void;
	clearValue?: () => void;
	setVisible?: (visible: boolean) => void;
	setError?: (error: string | undefined) => void;
	setOptions?: (options: Array<IOption>) => void;
}

interface ISysFormButtonRef {
	disabled?: boolean;
	setDisabled?: (disabled: boolean) => void;
	onClick?: () => void;
}

interface ISysFormState {
	loading: boolean;
	disabled: boolean;
	mode: 'view' | 'edit' | 'create';
	fieldsWithErrors: { [key: string]: string | undefined };
}

interface IOnChangeDocValue {
	name: string;
	value: any;
}

export type {
	IDocValues,
	IDocRef,
	ISysForm,
	ISysFormRef,
	ISysFormButtonRef,
	ISysFormState,
	IOnChangeDocValue,
	ISysFormContext,
	ISysFormComponentRef
};
