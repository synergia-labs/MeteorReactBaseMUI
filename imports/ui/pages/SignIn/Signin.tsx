// login page overrides the form’s submit event and call Meteor’s loginWithPassword()
// Authentication errors modify the component’s state to be displayed
import React from 'react'
import { useLocation } from 'react-router-dom'
import { Meteor } from 'meteor/meteor'
import Container from '@mui/material/Container'
import TextField from '../../../ui/components/SimpleFormFields/TextField/TextField'
import Button from '@mui/material/Button'
import SimpleForm from '/imports/ui/components/SimpleForm/SimpleForm'

import { signinStyle } from './SigninStyle'

export const SignIn = (props: any) => {
    const [redirectToReferer, setRedirectToReferer] = React.useState(false)

    const location = useLocation()

    const { showNotification, navigate, user } = props

    const handleSubmit = (doc: { email: string; password: string }) => {
        const { email, password } = doc
        Meteor.loginWithPassword(email, password, (err: any) => {
            if (err) {
                showNotification({
                    type: 'warning',
                    title: 'Acesso negado!',
                    description:
                        err.reason === 'Incorrect password'
                            ? 'Email ou senha inválidos'
                            : err.reason === 'User not found'
                            ? 'Este email não está cadastrado em nossa base de dados.'
                            : '',
                })
            } else {
                showNotification({
                    type: 'sucess',
                    title: 'Acesso autorizado!',
                    description: 'Login de usuário realizado em nossa base de dados!',
                })
                setRedirectToReferer(true)
            }
        })
    }

    const SocialLoginButton = ({ onLogin, buttonText, iconClass, customCss, iconOnly }) => (
        <div
            onClick={onLogin}
            className="material-button-contained"
            style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                height: 50,
                color: '#FFF',
                ...customCss,
            }}
        >
            <i className={iconClass} />
            {!iconOnly && <span style={{ marginLeft: 15 }}>{buttonText}</span>}
        </div>
    )

    const callbackLogin = (err) => {
        if (err) {
            console.log('Login Error: ', err)
            if (err.errorType === 'Accounts.LoginCancelledError') {
                showNotification('Autenticação cancelada', 'error')
                //self.setState({ error: 'AUtenticação cancelada' })
            } else {
                showNotification(err.error, 'error')
            }
        } else {
            setRedirectToReferer(true)
            navigate('/')
        }
    }

    const loginFacebook = () => {
        Meteor.loginWithFacebook({ requestPermissions: ['public_profile', 'email'] }, (err) => {
            callbackLogin(err)
        })
    }

    const loginGoogle = () => {
        Meteor.loginWithGoogle({ requestPermissions: ['profile', 'email'] }, (err) => {
            callbackLogin(err)
        })
    }

    const { from } = location.state || { from: { pathname: '/' } }

    if (redirectToReferer) {
        if (from && from.pathname === '/signout') from.pathname = '/'
        // return <Redirect to={from}/>;
        navigate('/')
    }

    if (!!user && !!user._id) {
        setRedirectToReferer(true)
        navigate('/')
    }

    return (
        <>
            <Container style={{ width: '100%', maxWidth: 400 }}>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <div>
                        <h2 style={signinStyle.labelAccessSystem}>
                            <img
                                src="data:image/png;base64,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"
                                style={signinStyle.imageLogo}
                            />
                            <div>{'Acessar o sistema'}</div>
                        </h2>
                        <SimpleForm
                            schema={{
                                email: { type: 'String', label: 'Email', optional: false },
                                password: { type: 'String', label: 'Senha', optional: false },
                            }}
                            onSubmit={handleSubmit}
                        >
                            <div>
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
                                    <Button
                                        id="forgotPassword"
                                        color={'secondary'}
                                        onClick={() => navigate('/recovery-password')}
                                    >
                                        {'Esqueci a minha senha'}
                                    </Button>
                                    <Button
                                        id="btnEnter"
                                        variant={'outlined'}
                                        color={'primary'}
                                        submit={'true'}
                                    >
                                        {'Entrar'}
                                    </Button>
                                </div>
                            </div>
                        </SimpleForm>
                        <div style={signinStyle.containerRouterSignUp}>
                            <Button
                                id="newUser"
                                color={'secondary'}
                                onClick={() => navigate('/signup')}
                            >
                                {'É novo por aqui? Clique aqui para se cadastrar!'}
                            </Button>
                        </div>
                        <div
                            key="loginoptions"
                            style={{
                                paddingRight: 5,
                                width: '102%',
                                margin: 0,
                                padding: 0,
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            <div key="divBtnGoogle" style={{ width: '100%' }}>
                                <SocialLoginButton
                                    key="btnGoogle"
                                    iconClass={'google icon'}
                                    onLogin={loginGoogle}
                                    buttonText={'Login pelo Google'}
                                    customCss={{
                                        background: '#dd4b39',
                                        width: '100%',
                                        cursor: 'pointer',
                                    }}
                                />
                            </div>
                            <div key="divBtnFaceboook" style={{ width: '100%' }}>
                                <SocialLoginButton
                                    key="btnFaceboook"
                                    iconClass={'facebook icon'}
                                    onLogin={loginFacebook}
                                    buttonText={'Login pelo Facebook'}
                                    customCss={{
                                        background: '#3B5998',
                                        width: '100%',
                                        cursor: 'pointer',
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}
