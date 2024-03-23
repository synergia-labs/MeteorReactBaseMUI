import { IDefField, ISchema } from "/imports/typings/ISchema";

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
    submitWithKeyEnter?: boolean;
	children?: React.ReactNode;
}

interface ISysFormRef {
	doc: IDocValues;
	onChangeDocValue: ({name, value}: IOnChangeDocValue) => void;
    checkIfAllRequiredFieldsAreFilled: () => void;
    checkVisibilityFields: () => void;
    validateFields: () => void;
    submit: () => void;

}

interface ISysFormContext {
	getSysFormComponentInfo: (name: string) =>
		{
            schema?: IDefField<any>;
            isVisibile: boolean;
            isOptional: boolean;
            onChange: ({name, value} : IOnChangeDocValue) => void;
            erro: string | undefined;
            defaultValue: any;
		  }
		| undefined;
	getSysFormButtonInfo: () => {
		disabled: boolean;
		loading: boolean;
		onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
	};
}

interface ISysFormState {
	loading: boolean;
	disabled: boolean;
	fieldsWithErrors: { [key: string]: string | undefined };
}

interface IOnChangeDocValue {
	name: string;
	value: any;
}


export type {
    IDocValues,
    ISysForm,
    ISysFormRef,
    ISysFormState,
    IOnChangeDocValue,
    ISysFormContext
}