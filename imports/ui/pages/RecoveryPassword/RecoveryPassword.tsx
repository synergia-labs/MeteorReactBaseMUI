// login page overrides the form’s submit event and call Meteor’s loginWithPassword()
// Authentication errors modify the component’s state to be displayed
import React from 'react'
import PropTypes from 'prop-types'
import { Accounts } from 'meteor/accounts-base'
import Container from '@material-ui/core/Container';
import TextField from '../../../ui/components/SimpleFormFields/TextField/TextField';
import Button from '@material-ui/core/Button';
import SimpleForm from "/imports/ui/components/SimpleForm/SimpleForm";

import {recoveryPasswordStyle} from "./RecoveryPasswordStyle";

export default class RecoveryPassword extends React.Component {
  onSubmit = doc => {
    const {email} = doc;
    const props = this.props;

    Accounts.forgotPassword({email}, (err, res) => {

      if (err) {
        if (err.message === 'User not found [403]') {
          this.props.showSnackBar({
            type:'error',
            title:'Problema na recuperação da senha!',
            description: 'Este email não está cadastrado em nossa base de dados!',
          });
        } else {
          this.props.showSnackBar({
            type:'error',
            title:'Problema na recuperação da senha!',
            description: 'Erro ao recriar a senha, faça contato com o administrador!!',
          });
        }
      } else {
        this.props.showSnackBar({
          type:'sucess',
          title:'Senha enviada!',
          description: 'Acesse seu email e clique no link para criar uma nova senha.',
        });
        props.history.push('/');
      }
    });
  };


  render() {
    const self = this;
    const { location } = this.props
    const { from } = location.state || { from: { pathname: '/' } }
        return (
            <Container style={recoveryPasswordStyle.containerRecoveryPassword}>
          <h2 style={recoveryPasswordStyle.labelAccessSystem}>
              <img src="/images/wireframe/logo.png" style={recoveryPasswordStyle.imageLogo} />
              {'Acessar o sistema'}
            </h2>
            <SimpleForm
                schema={{
                  email:{type:'String',label:'Email',optional:false},
                }}

                onSubmit={this.onSubmit}>
                <TextField
                  label="Email"
                  icon="user"
                  iconPosition="left"
                  name="email"
                  type="email"
                  placeholder="Digite seu email"

                />
              <div style={recoveryPasswordStyle.containerButtonOptions}>
                <Button color={'secondary'} onClick={()=>this.props.history.push('/signin')}>{"Voltar"}</Button>
                <Button id='forgotPassword' color={'primary'} variant={'outlined'} submit="true">{"Recuperar a senha"}</Button>
              </div>
            </SimpleForm>
      </Container>
    )
  }
}

RecoveryPassword.propTypes = { location: PropTypes.object.isRequired }
