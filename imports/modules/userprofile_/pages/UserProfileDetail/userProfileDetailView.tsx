import React, { useContext, useRef } from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { UserProfileDetailControllerContext } from './userProfileDetailController';
import SysForm from '../../../../ui/components/sysForm/sysForm';
import SysTextField from '../../../../ui/components/sysFormFields/sysTextField/sysTextField';
import UserProfileDetailStyles from './userProfileDetailStyles';
import { SysSelectField } from '../../../../ui/components/sysFormFields/sysSelectField/sysSelectField';
import { ISysFormRef } from '../../../../ui/components/sysForm/typings';
import SysFormButton from '../../../../ui/components/sysFormFields/sysFormButton/sysFormButton';
import SysIcon from '../../../../ui/components/sysIcon/sysIcon';

const UserProfileDetailView = () => {
	const context = useContext(UserProfileDetailControllerContext);
	const { user, onSubmit, schema, mode, closeDialog, loading } = context;
	const sysFormRef = useRef<ISysFormRef>(null);
	const { Container, FieldsForm, Actions } = UserProfileDetailStyles;

	return (
		<Container>
			<DialogTitle variant="subtitle1" sx={{ padding: 0 }}>
				{mode === 'create' ? 'Adicionar usuário' : 'Editar usuário'}
			</DialogTitle>
			<SysForm schema={schema} doc={user} mode={mode} onSubmit={onSubmit} ref={sysFormRef} loading={loading}>
				<FieldsForm>
					<SysTextField name="username" placeholder="Ex.: José da Silva" />
					<SysTextField name="email" placeholder="Ex.: jose.silva@email.com" />
					<SysSelectField name="roles" placeholder="Selecionar" />
					<Actions>
						<Button variant="outlined" startIcon={<SysIcon name={'close'} />} onClick={closeDialog}>
							Cancelar
						</Button>
						<SysFormButton startIcon={<SysIcon name={'check'} />}>Salvar</SysFormButton>
					</Actions>
				</FieldsForm>
			</SysForm>
		</Container>
	);
};

export default UserProfileDetailView;
