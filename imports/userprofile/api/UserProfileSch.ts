import { IDoc } from '/imports/typings/IDoc'

export const userProfileSch = {
    photo: {
        type: String,
        label: 'Photo',
        defaultValue: '',
        optional: true,
        isImage: true,
    },
    username: {
        type: String,
        label: 'UserName',
        defaultValue: '',
        optional: true,
    },
    email: {
        type: String,
        label: 'Email',
        defaultValue: '',
        optional: false,
    },
    phone: {
        type: String,
        label: 'Telefone',
        defaultValue: '',
        optional: false,
        mask: '(##) ####-####',
    },
    roles: {
        type: [String],
        label: 'Access profile',
        defaultValue: [],
        optional: false,
        componentName: 'ChipSelect',
        options: [
            {
                value: 'Administrador',
                label: 'Admnistrador',
            },
            {
                value: 'Usuario',
                label: 'Usuário',
            },
        ],
    },
}

export interface IUserProfile extends IDoc {
    photo?: string
    username: string
    email: string
    roles?: string[]
}
