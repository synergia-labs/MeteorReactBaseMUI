import { validarEmail } from '/imports/libs/validaEmail';
import { IDoc } from '/imports/typings/IDoc';
import { ISchema } from '/imports/typings/ISchema';

export const userProfileSch: ISchema<IUserProfile> = {
    photo: {
        type: String,
        label: 'Photo',
        defaultValue: '',
        optional: true,
        isImage: true,
    },
    username: {
        type: String,
        label: 'Username',
        defaultValue: '',
        optional: true,
    },
    email: {
        type: String,
        label: 'Email',
        defaultValue: '',
        optional: false,
        validationFunction: (value: string) => {
            if (!value) return undefined;
            const email = validarEmail(value);
            if (!email) return 'Email inválido';
            return undefined;
        }
    },
    phone: {
        type: String,
        label: 'Telefone',
        defaultValue: '',
        optional: true,
        mask: '(##) ####-####',
    },
    roles: {
        type: [String],
        label: 'Perfil de acesso',
        defaultValue: [],
        optional: true,
        options: ()  => [
            {
                value: ['Administrador'],
                label: 'Admnistrador',
            },
            {
                value: ['Usuario'],
                label: 'Usuário',
            },
        ],
    },
    status: {
        type: [String],
        label: 'Status',
        defaultValue: 'disabled',
        optional: true,
        options: () => [
            {
                value: 'active',
                label: 'Ativo',
            },
            {
                value: 'disabled',
                label: 'Desativado',
            },
        ],
    },
};

export interface IUserProfile extends IDoc {
    photo?: string;
    phone?: string;
    username: string;
    email: string;
    roles?: string[];
    status?: string;
}
