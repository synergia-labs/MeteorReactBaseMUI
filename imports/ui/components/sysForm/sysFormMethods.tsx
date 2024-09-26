import { MutableRefObject } from 'react';
import { IDocRef, IDocValues, ISysFormComponentRef } from './typings';
import { IDefField, ISchema } from '../../../typings/ISchema';
import { hasValue } from '../../../libs/hasValue';

class SysFormMethods {
	public static setRefComponent = ({
		mainRef,
		componentRef,
		schema,
		key,
		initialDefaultValues,
		fieldsWithOptions
	}: {
		mainRef: IDocRef;
		componentRef: MutableRefObject<ISysFormComponentRef>;
		schema: ISchema<any>;
		key?: string;
		initialDefaultValues?: IDocValues;
		fieldsWithOptions: MutableRefObject<IDocRef>;
	}) => {
		try {
			if (!schema) throw new Error('schema não informado ou incompleto.');
			if (!componentRef || !componentRef.current) throw new Error('componentRef não informado ou inválido.');
			if (!mainRef) throw new Error('mainRef não informado ou inválido.');

			const name = key || componentRef.current.name;
			if (!name) throw new Error('nome do componente não informado não informado.');

			const path = name.split('.');

			if (path.length === 1) {
				if (hasValue(mainRef[name])) return mainRef;
				if (!!!schema[name]) throw new Error(`${name} não encontrado no schema.`);
				componentRef.current = {
					...componentRef.current,
					value: componentRef.current.value || initialDefaultValues?.[name],
					isVisible: schema[name].visibilityFunction?.(initialDefaultValues),
					schema: schema[name],
					options: schema[name].options?.(initialDefaultValues)
				};
				if (hasValue(schema[name].options)) fieldsWithOptions.current[componentRef.current.name] = componentRef;
				mainRef[name] = componentRef;
				return mainRef;
			}

			const subSchema = schema[path[0]].subSchema;
			if (!subSchema) throw new Error(`${path[0]} não possui subschema.`);

			mainRef[path[0]] = SysFormMethods.setRefComponent({
				mainRef: (mainRef[path[0]] as IDocRef) || {},
				componentRef,
				schema: subSchema,
				key: path.slice(1).join('.'),
				initialDefaultValues: initialDefaultValues?.[path[0]],
				fieldsWithOptions
			}) as IDocRef;

			return mainRef;
		} catch (error) {
			throw new Error(`[SysFormMethods.setRefComponent] ${error}`);
		}
	};

	public static getInitialParams = (
		schema: ISchema<any>,
		doc: IDocValues,
		initialDefaultValues: IDocValues = {},
		initialRequiredFields: Array<string> = [],
		fieldsWithVisibilityFunction: Array<string> = []
	): {
		initialDefaultValues: IDocValues;
		initialRequiredFields: string[];
		fieldsWithVisibilityFunction: string[];
	} => {
		if (!schema) throw new Error('schema não informado ou incompleto.');
		for (const key in schema) {
			const { defaultValue, optional, visibilityFunction, subSchema } = schema[key];
			if (!subSchema) {
				const value = doc[key] || defaultValue;
				initialDefaultValues[key] = value;
				if (!optional) initialRequiredFields.push(key);
				if (visibilityFunction) fieldsWithVisibilityFunction.push(key);
			} else {
				const {
					initialDefaultValues: subInitialDefaultValues,
					initialRequiredFields: subInitialRequiredFields,
					fieldsWithVisibilityFunction: subFieldsWithVisibilityFunction
				} = SysFormMethods.getInitialParams(subSchema, doc[key] || {});
				initialDefaultValues[key] = subInitialDefaultValues;
				initialRequiredFields.push(...subInitialRequiredFields.map((field) => `${key}.${field}`));
				fieldsWithVisibilityFunction.push(...subFieldsWithVisibilityFunction.map((field) => `${key}.${field}`));
			}
		}
		return { initialDefaultValues, initialRequiredFields, fieldsWithVisibilityFunction };
	};

	public static getDocValues = (doc: IDocRef, schema: ISchema<any>): IDocValues => {
		const docValues: IDocValues = {};
		try {
			if (!schema) throw new Error('schema não informado ou incompleto.');
			if (!doc) return docValues;
			for (const key in schema) {
				const { subSchema } = schema[key];
				if (!subSchema) docValues[key] = (doc[key] as MutableRefObject<ISysFormComponentRef>)?.current?.value;
				else docValues[key] = SysFormMethods.getDocValues(doc[key] as IDocRef, subSchema);
			}

			return Object.fromEntries(Object.entries(docValues)); //.filter(([_, value]) => hasValue(value))); //ToDo Removido porque estava gerando erro durante o update. Avaliar se vale a pena mantê-lo durante a criação.
		} catch (error) {
			throw new Error(`[SysFormMethods.getDocValues] ${error}`);
		}
	};

	public static getValueByName = (doc: IDocValues, name: string): any => {
		try {
			const path = name.split('.');
			if (path.length === 1) return doc[name];
			return SysFormMethods.getValueByName(doc[path[0]], path.slice(1).join('.'));
		} catch (error) {
			throw new Error(`[SysFormMethods.getValueByName] ${error}`);
		}
	};

	public static getSchemaByName = (schema: ISchema<any>, name: string): IDefField<any> => {
		try {
			if (!schema) throw new Error('schema não informado ou incompleto.');
			const path = name.split('.');
			if (path.length === 1) return schema[name];
			const { subSchema } = schema[path[0]];
			if (!subSchema) throw new Error(`[SysFormMethods.getSchemaByName] ${path[0]} não possui subschema.`);
			return SysFormMethods.getSchemaByName(subSchema, path.slice(1).join('.'));
		} catch (error) {
			throw new Error(`[SysFormMethods.getSchemaByName] ${error}`);
		}
	};

	public static getRefComponentByName = (doc: IDocRef, name: string): MutableRefObject<ISysFormComponentRef> => {
		try {
			const path = name.split('.');
			if (path.length === 1) return doc[name] as MutableRefObject<ISysFormComponentRef>;
			return SysFormMethods.getRefComponentByName(doc[path[0]] as IDocRef, path.slice(1).join('.'));
		} catch (error) {
			throw new Error(`[SysFormMethods.getRefComponentByName] ${error}`);
		}
	};

	public static checkIfFieldIsVisible = (schema: ISchema<any>, doc: IDocValues, name: string): boolean => {
		try {
			if (!schema) throw new Error('schema não informado ou incompleto.');
			const schemaInfo = SysFormMethods.getSchemaByName(schema, name);
			if (!schemaInfo) return false;
			if (!schemaInfo.visibilityFunction) return true;
			return !!schemaInfo.visibilityFunction?.(doc);
		} catch (error) {
			throw new Error(`[SysFormMethods.checkIfFieldIsVisible] ${error}`);
		}
	};

	public static updateDoc(doc: IDocValues, schema: ISchema<any>, ref: IDocRef) {
		try {
			if (!schema) throw new Error('schema não informado ou incompleto.');
			if (!doc) return;
			if (!ref) return;
			for (const key in schema) {
				const { subSchema } = schema[key];
				if (!!subSchema) {
					SysFormMethods.updateDoc(doc[key] as IDocValues, subSchema, ref[key] as IDocRef);
					continue;
				}
				const refComponent = ref[key] as MutableRefObject<ISysFormComponentRef>;
				if (!refComponent) continue;
				refComponent.current.value = doc[key];
				refComponent.current.setValue?.(doc[key]);
			}
		} catch (error) {
			throw new Error(`[SysFormMethods.updateDoc] ${error}`);
		}
	}

	public static validate = ({
		schema,
		doc,
		requiredFields,
		fieldsWithErrors
	}: {
		schema: ISchema<any>;
		doc: IDocRef;
		requiredFields: string[];
		fieldsWithErrors: MutableRefObject<{ [key: string]: string }>;
	}) => {
		try {
			if (!doc) return;
			for (const key in schema) {
				const { subSchema } = schema[key];
				if (!!subSchema) {
					SysFormMethods.validate({ schema: subSchema, doc: doc[key] as IDocRef, requiredFields, fieldsWithErrors });
					continue;
				}

				const isVisible = SysFormMethods.checkIfFieldIsVisible(schema, SysFormMethods.getDocValues(doc, schema), key);
				if (!isVisible) continue;

				const ref = doc[key] as MutableRefObject<ISysFormComponentRef>;

				if (!ref) continue;

				const isOptional = !requiredFields.includes(ref.current.name);
				const value = ref.current.value;

				if (isOptional && !hasValue(value)) continue;

				const errorMessage =
					schema[key].validationFunction?.(value) ??
					(!isOptional && !hasValue(value) ? 'Campo obrigatório.' : undefined);

				ref.current.error = errorMessage;
				ref.current.setError?.(errorMessage);

				if (hasValue(errorMessage)) {
					fieldsWithErrors.current[ref.current.name] = errorMessage!;
				} else {
					if (hasValue(fieldsWithErrors.current[ref.current.name])) delete fieldsWithErrors.current[ref.current.name];
				}
			}
			if (hasValue(fieldsWithErrors.current))
				throw new Error(`
                Erro nos campos: ${Object.keys(fieldsWithErrors.current)
									.map((key) => {
										const path = key.split('.');
										return path[path.length - 1];
									})
									.join(', ')}
            `);
		} catch (error) {
			throw error;
		}
	};

	public static clearForm = (doc: IDocRef, schema: ISchema<any>) => {
		try {
			for (const key in schema) {
				const { subSchema } = schema[key];
				if (!!subSchema) {
					SysFormMethods.clearForm(doc[key] as IDocRef, subSchema);
					continue;
				}
				const ref = doc[key] as MutableRefObject<ISysFormComponentRef>;
				ref.current.value = '';
				ref.current.clearValue?.();
			}
		} catch (error) {
			throw new Error(`[SysFormMethods.clearForm] ${error}`);
		}
	};
}

export default SysFormMethods;
