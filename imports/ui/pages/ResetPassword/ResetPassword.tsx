// login page overrides the form’s submit event and call Meteor’s loginWithPassword()
// Authentication errors modify the component’s state to be displayed
import React from 'react'
import PropTypes from 'prop-types'
import { Accounts } from 'meteor/accounts-base'
import Container from '@material-ui/core/Container';
import TextField from '../../../ui/components/SimpleFormFields/TextField/TextField';
import Button from '@material-ui/core/Button';
import SimpleForm from "/imports/ui/components/SimpleForm/SimpleForm";

export default class ResetPassword extends React.Component {
  onSubmit = doc => {
    const {password, repassword} = doc;
    if(password!==repassword) {
      this.props.showSnackBar({
        type:'error',
        title:'Error!',
        description: 'As senhas não conferem!!Digite novamente!',
      });
      return;
    }
    Accounts.resetPassword(
        this.props.match.params.token,
        password,
        (err, res) => {
          if (err) {
            this.props.showSnackBar({
              type:'error',
              title:'Problema na definição da senha!',
              description: 'Não foi possível atualizar a sua senha, faça contato com o administrador!',
            });
          } else {
            this.props.showSnackBar({
              type:'success',
              title:'Senha atualizada!',
              description: 'Sua senha foi atualizada com sucesso!!',
            });
            this.props.history.push('/');
          }
        }
    );
  };



  render() {
    const self = this;
    const { location } = this.props
    const { from } = location.state || { from: { pathname: '/' } }
        return (
            <Container style={{width:'100%',maxWidth:400}}>
          <h2 style={{textAlign:"center",display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
              <img src="/images/wireframe/logo.png" style={{maxWidth:100}} />
              {'Acessar o sistema'}
            </h2>
            <SimpleForm
                schema={{
                  password:{type:'String',label:'Email',optional:false},
                  repassword:{type:'String',label:'Email',optional:false},
                }}

                onSubmit={this.onSubmit}>
                <TextField
                  label="Digite uma nova senha"
                  icon="lock"
                  iconPosition="left"
                  name="password"
                  type="password"
                  placeholder="Digite uma nova senha"
                />
                <TextField
                    label="Repita a senha"
                    icon="lock"
                    iconPosition="left"
                    name="repassword"
                    type="password"
                    placeholder="Repita a nova senha"
                />
                <div style={{marginTop:30,display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                    <Button onClick={()=>this.props.history.push('//signin')}>{"Voltar"}</Button>
                    <Button variant={'outlined'} submit>{"Atualizar a senha"}</Button>
                </div>

            </SimpleForm>
      </Container>
    )
  }
}

ResetPassword.propTypes = { location: PropTypes.object.isRequired }
