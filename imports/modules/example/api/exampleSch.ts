import { IDoc } from '/imports/typings/IDoc';
import { ISchema } from '/imports/typings/ISchema';

export const exampleSch: ISchema<IExample> = {
    image: {
        type: String,
        label: 'Imagem',
        defaultValue: '',
        optional: true,
        isImage: true,
        defaultSize: {
            width: 300,
            height: 300,
        },
    },
    title: {
        type: String,
        label: 'Título',
        defaultValue: 'Lalal',
        optional: false,
    },
    description: {
        type: String,
        label: 'Descrição',
        defaultValue: '',
        optional: true,
    },
    check: {
        type: Object,
        label: 'check box',
        optional: true,
        options: ['Todo', 'Doing', 'Done'],
    },
    type: {
        type: String,
        label: 'Tipo',
        defaultValue: '',
        optional: false,
        options:[
            { value: 'normal', label: 'Normal' },
            { value: 'hard', label: 'Dificil' },
            { value: 'internal', label: 'Interna' },
            { value: 'extra', label: 'Extra' },
        ],
        validationFunction: (value: string) => {
            const regexNumeros: RegExp = /-?\d+(\.\d+)?/g;
            if (value.length < 3) return 'Muito curto';
            if (value.match(regexNumeros)) return "O texto deve conter apenas letras e espaços."
            return undefined;
        },
    },
    typeMulti: {
        type: [String],
        label: 'Tipos Multi',
        defaultValue: '',
        optional: false,
        multiple: true,
        visibilityFunction: (doc: any) => !!doc.type && doc.type === 'extra',
        options: [
            { value: 'normal', label: 'Normal' },
            { value: 'extra', label: 'Extra' },
            { value: 'minimo', label: 'Minimo' },
        ],
    },
    date: {
        type: Date,
        label: 'Data',
        defaultValue: '',
        optional: true,
    },
    files: {
        type: [Object],
        label: 'Arquivos',
        defaultValue: '',
        optional: true,
        isUpload: true,
    },
    chip: {
        type: [String],
        label: 'Chips',
        defaultValue: '',
        optional: true,
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
                defaultValue: '',
                optional: true,
                mask: '(##) ####-####',
            },
            cpf: {
                type: String,
                label: 'CPF',
                defaultValue: '',
                optional: true,
                mask: '###.###.###-##',
            },
        },
    },
    tasks: {
        type: [Object],
        label: 'Tarefas',
        defaultValue: '',
        optional: true,
        subSchema: {
            name: {
                type: String,
                label: 'Nome da Tarefa',
                defaultValue: '',
                optional: true,
            },
            description: {
                type: String,
                label: 'Descrição da Tarefa',
                defaultValue: '',
                optional: true,
            },
        },
    },
    audio: {
        type: String,
        label: 'Áudio',
        defaultValue: '',
        optional: true,
        isAudio: true,
    },
    address: {
        type: Object,
        label: 'Localização',
        defaultValue: '',
        isMapLocation: true,
        optional: true,
    },
    slider: {
        type: Number,
        label: 'Slider',
        defaultValue: 0,
        optional: true,
        max: 100,
        min: 0,
    },
    statusRadio: {
        type: String,
        label: 'Opções da Tarefa',
        defaultValue: '',
        optional: true,
        radiosList: ['Todo', 'Doing', 'Done'],
    },
    statusToggle: {
        type: Boolean,
        label: 'Status Toogle',
        defaultValue: false,
        optional: true,
    },
};

export interface IExample extends IDoc {
    image: string;
    title: string;
    description: string;
    check: object;
    type: string;
    typeMulti: string[];
    date: Date;
    files: object[];
    chip: string[];
    contacts: object;
    tasks: object[];
    audio: string;
    address: object;
    slider: number;
    statusRadio: string;
    statusToggle: boolean;
}
