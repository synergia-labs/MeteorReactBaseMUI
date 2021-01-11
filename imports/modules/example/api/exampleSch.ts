export const exampleSch = {
  image: {
    type: String,
    label: 'Imagem',
    defaultValue: '',
    optional: true,
    isImage: true,
  },
  title: {
    type: String,
    label: 'Título',
    defaultValue: '',
    optional: false,

  },
  description: {
    type: String,
    label: 'Descrição',
    defaultValue: '',
    optional: true,
  },
  type: {
    type: String,
    label: 'Tipo',
    defaultValue: '',
    optional: true,
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
    isUpload:true,
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
    optional: false,
    subSchema: {
      phone: {
        type: String,
        label: 'Telefone',
        defaultValue: '',
        optional: false,
        mask : '(##) ####-####',
      },
      cpf: {
        type: String,
        label: 'CPF',
        defaultValue: '',
        optional: false,
        mask : '###.###.###-##',
      },
    }
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
        optional: false,
      },
      description: {
        type: String,
        label: 'Descrição da Tarefa',
        defaultValue: '',
        optional: true,
      },
    }
  },
  audio: {
    type: String,
    label: 'Áudio',
    defaultValue: '',
    optional: true,
  },
  address: {
    type: Object,
    label: 'Localização',
    defaultValue: '',
    optional: true,
  },
  status: {
    type: Object,
    label: 'Status',
    defaultValue: '',
    optional: false,
  }
};

export interface IExample {
  _id?: string;
  image: string;
  title: string;
  description: string;
  createdat: Date;
  updatedat: Date;
  createdby: string;
  audio: string;
}
