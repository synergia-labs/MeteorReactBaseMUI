// login page overrides the form’s submit event and call Meteor’s loginWithPassword()
// Authentication errors modify the component’s state to be displayed
import React from 'react'
import PropTypes from 'prop-types'
import { Link, Redirect } from 'react-router-dom'
import { Meteor } from 'meteor/meteor'
import Container from '@material-ui/core/Container';
import TextField from '../../../ui/components/SimpleFormFields/TextField/TextField';;
import Button from '@material-ui/core/Button';
import SimpleForm from "/imports/ui/components/SimpleForm/SimpleForm";

import {signinStyle} from "./SigninStyle";

export default class Signin extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      error: '',
      redirectToReferer: false,
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  // Using a ref is accessing the DOM directly and not preferred
  // The React way to get the value from an input is using onChange
  handleChange(e, { name, value }) {
    this.setState({ [name]: value })
  }

  handleSubmit(doc) {
    const { email, password } = doc;
    Meteor.loginWithPassword(email, password, (err) => {
      if (err) {
        this.props.showSnackBar({
          type:'error',
          title:'Acesso negado!',
          description: err.reason==='Incorrect password'?'Email ou senha inválidos':err.reason,
        });
      } else {
        this.setState({
          redirectToReferer: true,
        })
      }
    })
  }

  render() {
    const self = this;
    const { user,location } = this.props
    const { redirectToReferer, error } = this.state
    const { from } = location.state || { from: { pathname: '/' } }
    // if correct authentication, redirect to page instead of login screen
    if (redirectToReferer) {
      if(from&&from.pathname==='/signout') {
        from.pathname = '/';
      }
      return <Redirect to={from} />


    }

    if(!!user&&!!user._id) {
      this.setState({ redirectToReferer: true})
      this.props.history.push('/');
    }

    const SocialLoginButton = ({onLogin, buttonText, iconClass, customCss, iconOnly}) => (
        <div
            onClick={onLogin}
            className="material-button-contained"
            style={{...signinStyle.containerSocialLoginButton, ...customCss}}
        >
          <i className={iconClass}/>
          {!iconOnly && <span style={signinStyle.socialLoginButtonText}>{buttonText}</span>}
        </div>
    );

    const callbackLogin = (err) => {
      if (err) {
        console.log('Login Error: ', err);
        if (err.errorType === 'Accounts.LoginCancelledError') {
          this.props.showSnackBar('Autenticação cancelada','error');
          //self.setState({ error: 'AUtenticação cancelada' })
        } else {
          this.props.showSnackBar(err.error,'error');

        }
      } else {
        this.setState({ redirectToReferer: true})
        this.props.history.push('/');
      }
    };

    const loginFacebook = () => {
      Meteor.loginWithFacebook({requestPermissions: ['public_profile', 'email']}, (err) => {
        callbackLogin(err);
      });
    };

    const loginGoogle = () => {
      Meteor.loginWithGoogle({requestPermissions: ['profile', 'email']}, (err) => {
        callbackLogin(err);
      });
    };

    return (
      <Container style={signinStyle.containerSignIn}>
        <div style={signinStyle.subContainerSignIn}>
          <div>
            <h2 style={signinStyle.labelAccessSystem}>
              <img src="/images/wireframe/logo.png" style=signinStyle.imageLogo />
              <div>{'Acessar o sistema'}</div>
            </h2>
            <SimpleForm
                schema={{
                  email:{type:'String',label:'Email',optional:false},
                  password:{type:'String',label:'Senha',optional:false},
                }}

                onSubmit={this.handleSubmit}>
              <div stacked>
                <TextField
                  label="Email"
                  fullWidth={true}
                  name="email"
                  type="email"
                  placeholder="Digite seu email"

                />
                <TextField
                  label="Senha"
                  fullWidth={true}
                  name="password"
                  placeholder="Digite sua senha"
                  type="password"
                />
                <div style={signinStyle.containerButtonOptions}>
                  <Button color={'secondary'} onClick={()=>this.props.history.push('/recovery-password')}>{"Esqueci a minha senha"}</Button>
                  <Button variant={'outlined'} color={'primary'} submit>{"Entrar"}</Button>
                </div>

              </div>
            </SimpleForm>
            <div style={signinStyle.containerRouterSignUp}>
              <Button color={'secondary'} onClick={()=>this.props.history.push('/signup')}>{'É novo por aqui? Clique aqui para se cadastrar!'}</Button>
            </div>
            <div key="loginoptions" style={signinStyle.containerLoginOptions}>
              <div key="divBtnGoogle" style={signinStyle.containerButtonGoogle}>
                <SocialLoginButton
                    key="btnGoogle"
                    iconClass={'google icon'}
                    onLogin={loginGoogle}
                    buttonText={'Login pelo Google'}
                    customCss={signinStyle.buttonLoginGoogle}
                /></div>
              <div key="divBtnFaceboook" style={signinStyle.containerButtonFacebook}>
                <SocialLoginButton
                    key="btnFaceboook"
                    iconClass={'facebook icon'}
                    onLogin={loginFacebook}
                    buttonText={'Login pelo Facebook'}
                    customCss={signinStyle.buttonLoginFacebook}
                /></div>
            </div>
          </div>
        </div>
      </Container>
    )
  }
}

Signin.propTypes = { location: PropTypes.object.isRequired }
