export const exampleSch = {
  image: {
    type: String,
    label: 'Imagem',
    defaultValue: '',
    optional: true,
    isImage: true,
  },
  imageC: {
    type: String,
    label: 'Imagem Comp',
    defaultValue: '',
    optional: true,
    isImage: true,
  },
  avatar: {
    type: String,
    label: 'Avatar',
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
    options:[
      {value:'normal',label:'Normal'},
      {value:'extra',label:'Extra'},
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
    isAudio:true,
  },
  address: {
    type: Object,
    label: 'Localização',
    defaultValue: '',
    isMapLocation:true,
    optional: true,
  },
  // statusCheck: {
  //   type: Object,
  //   label: 'Status CheckBox',
  //   defaultValue: '',
  //   optional: false,
  //   checksList: ['Todo', 'Doing', 'Done'],
  //   validate: (value) => {
  //     const statusTrue = value&&Object.keys(value).filter( status => {
  //       if(value[status]){
  //         return status
  //       }
  //     })
  //     return  statusTrue.length <= 1
  //   }
  // },
  statusRadio: {
    type: String,
    label: 'Status RadioButton',
    defaultValue: '',
    optional: false,
    radiosList: ['Todo', 'Doing', 'Done'],
  },
  statusToggle: {
    type: Boolean,
    label: 'Status Toogle',
    defaultValue: false,
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
  statusCheck: object;
  statusToggle: boolean;
}
