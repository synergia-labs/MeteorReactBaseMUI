import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { userprofileApi } from '../../api/UserProfileApi';
import SimpleForm from '../../../../ui/components/SimpleForm/SimpleForm';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import TextField from '../../../../ui/components/SimpleFormFields/TextField/TextField';
import ImageCompactField from '/imports/ui/components/SimpleFormFields/ImageCompactField/ImageCompactField';
import { IUserProfile } from '/imports/modules/userprofile/api/UserProfileSch';
import { IDefaultDetailProps } from '/imports/typings/BoilerplateDefaultTypings';

const UserProfileDetail = ({ screenState, loading, user, save, navigate, hiddenTitleBar, close }) => {
	const handleSubmit = (doc: IUserProfile) => {
		save(doc);
	};

	return (
		<PageLayout
			title={
				screenState === 'view' ? 'Visualizar usuário' : screenState === 'edit' ? 'Editar Usuário' : 'Criar usuário'
			}
			onBack={() => navigate('/userprofile')}
			hiddenTitleBar={!!hiddenTitleBar}>
			<SimpleForm
				mode={screenState}
				schema={userprofileApi.schema}
				doc={user}
				onSubmit={handleSubmit}
				loading={loading}>
				<ImageCompactField label={'Foto'} name={'photo'} />
				<FormGroup>
					<TextField placeholder="Nome do Usuário" name="username" />
					<TextField placeholder="Email" name="email" />
					<TextField placeholder="Telefone" name="phone" />
				</FormGroup>
				<div key={'Buttons'} style={{ paddingTop: 20, paddingBottom: 20 }}>
					<Button
						onClick={
							screenState === 'edit'
								? () => navigate(`/userprofile/view/${user._id}`)
								: !!hiddenTitleBar
								? close
								: () => navigate(`/userprofile/list`)
						}
						color={'secondary'}
						variant="contained">
						{screenState === 'view' ? 'Voltar' : 'Cancelar'}
					</Button>

					{screenState === 'view' ? (
						<Button onClick={() => navigate(`/userprofile/edit/${user._id}`)} color={'primary'} variant="contained">
							{'Editar'}
						</Button>
					) : null}
					{screenState !== 'view' ? (
						<Button id="submit" color={'primary'} variant="contained">
							{'Salvar'}
						</Button>
					) : null}
				</div>
			</SimpleForm>
		</PageLayout>
	);
};

export const UserProfileDetailContainer = withTracker((props: IDefaultDetailProps) => {
	const { screenState, id } = props;
	const subHandle = userprofileApi.subscribe('userProfileDetail', { _id: id });
	const user = subHandle.ready() ? userprofileApi.findOne({ _id: id }) : {};

	return {
		screenState,
		user,
		save: (doc: IUserProfile) =>
			userprofileApi.update(doc, (e, r) => {
				if (!e) {
					props.navigate(`/userprofile/view/${screenState === 'create' ? r : doc._id}`);
					props.showNotification &&
						props.showNotification({
							type: 'success',
							title: 'Operação realizada!',
							description: `O usuário foi ${doc._id ? 'atualizado' : 'cadastrado'} com sucesso!`
						});
				} else {
					console.log('Error:', e);
					props.showNotification &&
						props.showNotification({
							type: 'warning',
							title: 'Operação não realizada!',
							description: `Erro ao realizar a operação: ${e.reason}`
						});
				}
			})
	};
})(UserProfileDetail);
