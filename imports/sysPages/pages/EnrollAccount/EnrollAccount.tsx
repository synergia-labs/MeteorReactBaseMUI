import React from 'react';
import { Accounts } from 'meteor/accounts-base';

import { enrollAccountStyle } from './EnrollAccountStyle';
import { useParams } from 'react-router-dom';
import { IDefaultContainerProps } from '/imports/typings/BoilerplateDefaultTypings';

let emailVerified = false;
export const EnrollAccount = (props: IDefaultContainerProps) => {
    const [status, setStatus] = React.useState<string | null>(null);

    const { token } = useParams();

    if (!status) {
        Accounts.verifyEmail(token!, (err: any) => {
            if (err) {
                if (err.reason === 'Verify email link expired') {
                    setStatus(
                        'Problema na verificação do Email: Token expirado, solicite uma nova senha!'
                    );
                } else {
                    setStatus('Problema na verificação do Email: Token Inválido, tente novamente');
                }
            } else {
                setTimeout(() => {
                    props.navigate('/');
                }, 2000);
                setStatus('Email verificado com sucesso! Redirecionando, aguarde....');
            }
        });
    }

    return (
        <h2 style={enrollAccountStyle.labelStatus}>
            <img src="/images/wireframe/logo.png" style={enrollAccountStyle.imageLogo} />
            <div>
                <p>{!status ? 'Verificando token, aguarde....' : status}</p>
            </div>
        </h2>
    );
};
