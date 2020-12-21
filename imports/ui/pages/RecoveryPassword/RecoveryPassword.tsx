// login page overrides the form’s submit event and call Meteor’s loginWithPassword()
// Authentication errors modify the component’s state to be displayed
import React from 'react'
import PropTypes from 'prop-types'
import { Accounts } from 'meteor/accounts-base'
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SimpleForm from "/imports/ui/components/SimpleForm/SimpleForm";

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
            <Container style={{width:'100%',maxWidth:400}}>
          <h2 style={{textAlign:"center",display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
              <img src="/images/wireframe/logo.png" style={{maxWidth:100}} />
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
              <div style={{marginTop:30,display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                <Button onClick={()=>this.props.history.push('/signin')}>{"Voltar"}</Button>
                <Button variant={'outlined'} submit>{"Recuperar a senha"}</Button>
              </div>
            </SimpleForm>
      </Container>
    )
  }
}

RecoveryPassword.propTypes = { location: PropTypes.object.isRequired }
