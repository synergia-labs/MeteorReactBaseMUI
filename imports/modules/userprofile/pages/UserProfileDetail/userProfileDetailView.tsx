import React, { useContext, useRef } from 'react';
import _ from 'lodash';
import { Box, Button, DialogTitle } from '@mui/material';
import { UserProfileDetailControllerContext } from './userProfileDetailController';
import SysForm from '/imports/ui/components/sysForm/sysForm';
import SysTextField from '/imports/ui/components/sysFormFields/sysTextField/sysTextField';
import UserProfileDetailStyles from './userProfileDetailStyles';
import { SysSelectField } from '/imports/ui/components/sysFormFields/sysSelectField/sysSelectField';
import { ISysFormRef } from '/imports/ui/components/sysForm/typings';
import SysFormButton from '/imports/ui/components/sysFormFields/sysFormButton/sysFormButton';
import { DialogTitleStyled } from '/imports/ui/appComponents/SysDialog/SysDialogStyles';

const UserProfileDetailView = () => {
    const context = useContext(UserProfileDetailControllerContext);
    const { user, onSubmit, schema, mode, closeDialog, loading } = context;
    const sysFormRef = useRef<ISysFormRef>(null);
    return (
        <Box>
            <DialogTitleStyled>
                {mode === 'create' ? 'Adicionar usuário' : 'Editar usuário'}
                <Box flexGrow={1} />
            </DialogTitleStyled>
            <SysForm
                schema={schema}
                doc={user}
                mode={mode}
                onSubmit={onSubmit}
                ref={sysFormRef}
                loading={loading}
            >
                <UserProfileDetailStyles.FieldsForm>
                    <SysTextField
                        name="username"
                        placeholder="Ex.: José da Silva"
                    />
                    <SysTextField
                        name="email"
                        placeholder="Ex.: jose.silva@email.com"
                    />
                    <SysSelectField
                        name="roles"
                        placeholder="Selecionar"
                    />
                </UserProfileDetailStyles.FieldsForm>
                <UserProfileDetailStyles.Actions>
                    <Button onClick={closeDialog}>
                        Cancelar
                    </Button>
                    <SysFormButton>
                        Salvar
                    </SysFormButton>
                </UserProfileDetailStyles.Actions>
            </SysForm>
        </Box>
    );
};

export default UserProfileDetailView;