import React, { useContext } from 'react';
import Styles from './createAdminUser.styles';
import { Box, Typography } from '@mui/material';
import SysForm from '/imports/ui/components/sysForm/sysForm';
import SysTextField from '/imports/ui/components/sysFormFields/sysTextField/sysTextField';
import SysFormButton from '/imports/ui/components/sysFormFields/sysFormButton/sysFormButton';
import SysIcon from '/imports/ui/components/sysIcon/sysIcon';
import createUserSchema from '../../schemas/createUser.sch';
import Context, { IUserProfileContext } from '../userProfileContext';
import EnumUserRoles from '../../../common/enums/enumUserRoles';

const CreateAdminUserPage: React.FC = () => {
    const context = useContext<IUserProfileContext>(Context);

    return (
        <Styles.container>
            <Styles.content>
                <Typography variant="h1" display={'inline-flex'} gap={1}>
                    <Typography variant="inherit" color={(theme) => theme.palette.sysText?.tertiary}>
                        {'{'}
                    </Typography>
                    Boilerplate
                    <Typography variant="inherit" color="sysText.tertiary">
                        {'}'}
                    </Typography>
                </Typography>

                <Styles.formContainer>
                    <Typography variant="h5" textAlign={'center'}>Registro de usuário administrador</Typography>
                    <Typography variant="caption" color={ theme => theme.palette.sysAction?.auxiliary } >
                        Não foi encontrado nenhum usuário administrador cadastrado no sistema. 
                        Por favor, registre um novo usuário administrador.
                    </Typography>
                    <SysForm 
                        schema={createUserSchema}
                        onSubmit={context.createUser} 
                        doc={{ role: EnumUserRoles.ADMIN }}
                    >
                        <Styles.formWrapper>
                            <SysTextField name="name" label="Nome" fullWidth placeholder="Digite seu email" />
                            <SysTextField name="email" label="Email" fullWidth placeholder="Digite seu email" />
                            <SysTextField name="password" label="Senha" fullWidth  placeholder="Digite sua senha"  />

                            <SysFormButton variant="contained" color="primary" endIcon={<SysIcon name={'arrowForward'} />}>
                                Entrar
                            </SysFormButton>
                        </Styles.formWrapper>
                    </SysForm>
                </Styles.formContainer>
                <Box component="img" src="/images/wireframe/synergia-logo.svg" sx={{ width: '100%', maxWidth: '400px' }} />
            </Styles.content>
        </Styles.container>
    );
}

export default CreateAdminUserPage;