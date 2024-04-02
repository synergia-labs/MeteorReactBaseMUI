import { MutableRefObject } from 'react';
import { IDocRef, IDocValues, ISysFormComponentRef } from './typings';
import { IDefField, ISchema } from '/imports/typings/ISchema';
import { hasValue } from '/imports/libs/hasValue';

class SysFormMethods{
    public static setRefComponent = ({
        mainRef,
        componentRef,
        schema,
        key,
        initialDefaultValues,
    } : {
        mainRef: IDocRef;
        componentRef: MutableRefObject<ISysFormComponentRef>;
        schema: ISchema<any>;
        key?: string;
        initialDefaultValues?: IDocValues;
    }) => {
        try{
            if(!schema) throw new Error('schema não informado ou incompleto.');
            if(!componentRef || !componentRef.current) throw new Error('componentRef não informado ou inválido.');
            if(!mainRef) throw new Error('mainRef não informado ou inválido.');

            const name = key || componentRef.current.name;
            if(!name) throw new Error('nome do componente não informado não informado.');

            const path = name.split('.');

            if(path.length === 1){
                if(hasValue(mainRef[name])) return mainRef;
                if(!!!schema[name]) throw new Error(`${name} não encontrado no schema.`);
                componentRef.current = {
                    ...componentRef.current,
                    value: componentRef.current.value || initialDefaultValues?.[name],
                    isVisible: schema[name].visibilityFunction?.(initialDefaultValues),
                    schema: schema[name]
                };
                mainRef[name] = componentRef;
                return mainRef;
            }

            const subSchema = schema[path[0]].subSchema;
            if(!subSchema) throw new Error(`${path[0]} não possui subschema.`);

            mainRef[path[0]] = SysFormMethods.setRefComponent({
                mainRef: mainRef[path[0]] as IDocRef || {},
                componentRef,
                schema: subSchema,
                key: path.slice(1).join('.'),
                initialDefaultValues : initialDefaultValues?.[path[0]],
            }) as IDocRef;

            return mainRef;
        }catch(error){
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
                      fieldsWithVisibilityFunction: subFieldsWithVisibilityFunction,
                } = SysFormMethods.getInitialParams(subSchema, doc[key] || {});
                initialDefaultValues[key] = subInitialDefaultValues;
                initialRequiredFields.push(...subInitialRequiredFields.map((field) => `${key}.${field}`));
                fieldsWithVisibilityFunction.push(
                     ...subFieldsWithVisibilityFunction.map((field) => `${key}.${field}`)
                );
              }
        }
        return { initialDefaultValues, initialRequiredFields, fieldsWithVisibilityFunction };
    };

    public static getDocValues = (doc: IDocRef, schema: ISchema<any>): IDocValues => {
        const docValues: IDocValues = {};
        try{
            for (const key in schema) {
                const { subSchema } = schema[key];
                if (!subSchema) 
                    docValues[key] = (doc[key] as MutableRefObject<ISysFormComponentRef>)?.current?.value;
                else 
                    docValues[key] = SysFormMethods.getDocValues(doc[key] as IDocRef, subSchema);
            }
            return docValues;
        }catch(error){
            throw new Error(`[SysFormMethods.getDocValues] ${error}`);
        }
    };

    public static getValueByName = (doc: IDocValues, name: string): any => {
        try{
            const path = name.split('.');
            if(path.length === 1) return doc[name];
            return SysFormMethods.getValueByName(doc[path[0]], path.slice(1).join('.'));
        }catch(error){
            throw new Error(`[SysFormMethods.getValueByName] ${error}`);
        }
    }

    public static getSchemaByName = (schema: ISchema<any>, name: string): IDefField<any> => {
        try{
            if(!schema) throw new Error('schema não informado ou incompleto.');
            const path = name.split('.');
            if(path.length === 1) return schema[name];
            const { subSchema } = schema[path[0]];
            if(!subSchema) throw new Error(`[SysFormMethods.getSchemaByName] ${path[0]} não possui subschema.`);
            return SysFormMethods.getSchemaByName(subSchema, path.slice(1).join('.'));
        }catch(error){
            throw new Error(`[SysFormMethods.getSchemaByName] ${error}`);
        }
    };

    public static getRefComponentByName = (doc: IDocRef, name: string): MutableRefObject<ISysFormComponentRef> => {
        try{
            const path = name.split('.');
            if(path.length === 1) return doc[name] as MutableRefObject<ISysFormComponentRef>;
            return SysFormMethods.getRefComponentByName(doc[path[0]] as IDocRef, path.slice(1).join('.'));
        }catch(error){
            throw new Error(`[SysFormMethods.getRefComponentByName] ${error}`);
        }
    };

    public static checkIfFieldIsVisible = (schema: ISchema<any>, doc: IDocValues, name: string): boolean => {
        try{
            if(!schema) throw new Error('schema não informado ou incompleto.');
            const schemaInfo = SysFormMethods.getSchemaByName(schema, name);
            if(!schemaInfo) return false;
            if(!schemaInfo.visibilityFunction) return true;
            return !!schemaInfo.visibilityFunction?.(doc);
        }catch(error){
            throw new Error(`[SysFormMethods.checkIfFieldIsVisible] ${error}`);
        }
    };

    public static validate = ({
        schema, 
        doc,
        requiredFields,
        fieldsWithErrors
    }: {
        schema: ISchema<any>;
        doc: IDocRef;
        requiredFields: string[];
        fieldsWithErrors: MutableRefObject<string[]>;
    }): boolean => {
        try{
            let hasError = false;
            for(const key in schema){
                const { subSchema } = schema[key];
                if(!!subSchema){
                    SysFormMethods.validate({schema: subSchema, doc: doc[key] as IDocRef, requiredFields, fieldsWithErrors});
                    continue;
                }
                
                const isVisible = SysFormMethods.checkIfFieldIsVisible(schema, SysFormMethods.getDocValues(doc, schema), key);
                if(!isVisible) continue;

                const ref = doc[key] as MutableRefObject<ISysFormComponentRef>;

                const value = ref.current.value;
                const errorMessage = schema[key].validationFunction?.(value) ?? ((requiredFields.includes(ref.current.name) && !hasValue(value)) ? 'Campo obrigatório.' : undefined);
                if(hasValue(errorMessage)){
                    hasError = true;
                    fieldsWithErrors.current.push(ref.current.name);
                }else{
                    fieldsWithErrors.current = fieldsWithErrors.current.filter((field) => field !== ref.current.name);
                }

                ref.current.error = errorMessage;
                ref.current.setError?.(errorMessage);               
            }
            return hasError;
        }catch(error){
            throw new Error(`[SysFormMethods.validate] ${error}`);
        }
    };

    public static clearForm = (doc: IDocRef, schema: ISchema<any>) => {
        try{
            for(const key in schema){
                const { subSchema } = schema[key];
                if(!!subSchema){
                    SysFormMethods.clearForm(doc[key] as IDocRef, subSchema);
                    continue;
                }
                const ref = doc[key] as MutableRefObject<ISysFormComponentRef>;
                ref.current.value = '';
                ref.current.clearValue?.();
            }
        }catch(error){
            throw new Error(`[SysFormMethods.clearForm] ${error}`);
        }
    };
}

export default SysFormMethods;