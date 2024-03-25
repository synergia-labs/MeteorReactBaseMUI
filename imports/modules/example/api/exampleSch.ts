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
        label: 'Nome',
        defaultValue: '',
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
        frontEndComponent: 'checkbox',
        label: 'Grupos associados',
        defaultValue: {},
        optional: true,
        options: ['Grupo 1', 'Grupo 2', 'Grupo 3'],
    },
    type: {
        type: String,
        label: 'Categoria',
        defaultValue: '',
        optional: false,
        options: [
            { value: 'Categoria A', label: 'Categoria A' },
            { value: 'Categoria B', label: 'Categoria B' },
            { value: 'Categoria C', label: 'Categoria C' },
        ],
        validationFunction: (value: string) => {
            const regexNumeros: RegExp = /-?\d+(\.\d+)?/g;
            if (value.length < 3) return 'Muito curto';
            if (value.match(regexNumeros)) return "O texto deve conter apenas letras e espaços."
            return undefined;
        },
    },
    typeMulti: {
        type: [Object],
        label: 'Prioridade',
        defaultValue: '',
        optional: false,
        multiple: true,
        visibilityFunction: (doc: any) => !!doc.type && doc.type === 'media',
        options: [
            { value: 'baixa', label: 'Baixa' },
            { value: 'media', label: 'Média' },
            { value: 'alta', label: 'Alta' },
        ],
    },
    date: {
        type: Date,
        label: 'Data de fabricação',
        defaultValue: '',
        optional: true,
    },
    files: {
        type: [Object],
        label: 'Anexos',
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
        label: 'Prioridade',
        defaultValue: '',
        optional: true,
        radiosList: ['Baixa', 'Média', 'Alta'],
    },
    statusToggle: {
        type: Boolean,
        label: 'Exigir comprovação',
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
