import React, { useContext, useRef } from 'react';
import { Button, DialogTitle } from '@mui/material';
import { UserProfileDetailControllerContext } from './userProfileDetailController';
import SysForm from '/imports/ui/components/sysForm/sysForm';
import SysTextField from '/imports/ui/components/sysFormFields/sysTextField/sysTextField';
import UserProfileDetailStyles from './userProfileDetailStyles';
import { SysSelectField } from '/imports/ui/components/sysFormFields/sysSelectField/sysSelectField';
import { ISysFormRef } from '/imports/ui/components/sysForm/typings';
import SysFormButton from '/imports/ui/components/sysFormFields/sysFormButton/sysFormButton';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

const UserProfileDetailView = () => {
	const context = useContext(UserProfileDetailControllerContext);
	const { user, onSubmit, schema, mode, closeDialog, loading } = context;
	const sysFormRef = useRef<ISysFormRef>(null);
	return (
		<UserProfileDetailStyles.Container>
			<DialogTitle variant="subtitle1" sx={{ padding: 0 }}>
				{mode === 'create' ? 'Adicionar usuário' : 'Editar usuário'}
			</DialogTitle>
			<SysForm schema={schema} doc={user} mode={mode} onSubmit={onSubmit} ref={sysFormRef} loading={loading}>
				<UserProfileDetailStyles.FieldsForm>
					<SysTextField name="username" placeholder="Ex.: José da Silva" />
					<SysTextField name="email" placeholder="Ex.: jose.silva@email.com" />
					<SysSelectField name="roles" placeholder="Selecionar" />
					<UserProfileDetailStyles.Actions>
						<Button variant="outlined" startIcon={<CloseIcon />} onClick={closeDialog}>
							Cancelar
						</Button>
						<SysFormButton startIcon={<CheckIcon />}>Salvar</SysFormButton>
					</UserProfileDetailStyles.Actions>
				</UserProfileDetailStyles.FieldsForm>
			</SysForm>
		</UserProfileDetailStyles.Container>
	);
};

export default UserProfileDetailView;
