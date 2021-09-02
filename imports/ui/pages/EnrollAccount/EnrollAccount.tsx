import React from 'react'
import { Accounts } from 'meteor/accounts-base'
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import {enrollAccountStyle} from "./EnrollAccountStyle";

let emailVerified = false;
const EnrollAccount = (props) => {

    const [status,setStatus] = React.useState(null)
    console.log('props',props);
    if(!status) {
        Accounts.verifyEmail(props.match.params.token, (err, res) => {

            console.log(err,'<>',res)
            if (err) {
                if(err.reason==='Verify email link expired') {
                    setStatus('Problema na verificação do Email: Token expirado, solicite uma nova senha!');
                } else {
                    setStatus('Problema na verificação do Email: Token Inválido, tente novamente');
                }

            } else {
                setTimeout(()=>{
                    props.history.push('/');
                },2000)
                setStatus('Email verificado com sucesso! Redirecionando, aguarde....');
            }
        })
    }

    return (
        <h2 style={enrollAccountStyle.labelStatus}>
            <img src="/images/wireframe/logo.png" style={enrollAccountStyle.imageLogo} />

            <div>
                <p>{!status?'Verificando token, aguarde....':status}</p>
            </div>

        </h2>
    )
}

export default EnrollAccount
