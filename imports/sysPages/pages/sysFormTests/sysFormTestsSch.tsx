import { IDoc } from '/imports/typings/IDoc';
import { ISchema } from '/imports/typings/ISchema';

export const sysFormTestsSch: ISchema<ISysFormTestsSch> = {
    title: {
        type: String,
        label: 'Título',
        defaultValue: 'Teste',
        optional: false,
    },
    type: {
        type: String,
        label: 'Tipo',
        defaultValue: '',
        optional: false,
        validationFunction: (value: string) => {
            const regexNumeros: RegExp = /-?\d+(\.\d+)?/g;
            if (value.length < 3) return 'Muito curto';
            if (value.match(regexNumeros)) return "O texto deve conter apenas letras e espaços."
            return undefined;
        },
    },
    typeMulti: {
        type: Array<String>,
        label: 'Tipos Multi',
        defaultValue: '',
        optional: false,
        multiple: true,
        visibilityFunction: (doc: any) => !!doc.type && doc.type === 'extra',
    },
    contacts: {
        type: Object,
        label: 'Contatos',
        defaultValue: '',
        optional: true,
        subSchema: {
            phone: {
                type: String,
                label: 'Telefone',
                defaultValue: '37999767465',
                optional: true,
                mask: '(##) ####-####',
            },
            cpf: {
                type: String,
                label: 'CPF',
                defaultValue: '16187235614',
                optional: true,
                mask: '###.###.###-##',
            },
        },
    },
};

export interface ISysFormTestsSch extends IDoc {
    title: string;
    description: string;
    type: string;
    typeMulti: Array<string>;
    contacts: {
        phone: string;
        cpf: string;
    };
}
