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
      },
      celphone: {
        type: String,
        label: 'Celular',
        defaultValue: '',
        optional: false,
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
  status: {
    type: Object,
    label: 'Status',
    defaultValue: '',
    optional: true,
    subSchema: {
      value: {
        type: String,
        label: 'Valor do Status',
        defaultValue: false,
        optional: false,
      },
      name: {
        type: String,
        label: 'Nome do Status',
        defaultValue: '',
        optional: false,
      },
    }
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
}
