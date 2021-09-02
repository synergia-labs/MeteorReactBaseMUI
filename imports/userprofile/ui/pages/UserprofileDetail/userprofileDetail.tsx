import React from 'react';
import {withTracker} from 'meteor/react-meteor-data';
import {userprofileApi} from '../../../api/UserProfileApi';
import SimpleForm from '../../../../ui/components/SimpleForm/SimpleForm';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import TextField
  from '../../../../ui/components/SimpleFormFields/TextField/TextField';
import ImageCompactField
  from '/imports/ui/components/SimpleFormFields/ImageCompactField/ImageCompactField';
import {PageLayout} from '/imports/ui/layouts/pageLayout';



const UserProfileDetail = ({
  screenState,
  loading,
  user,
  save,
  history,
  viewer,
  close,
}) => {

  const handleSubmit = (doc) => {
    // console.log('doc',doc)
    save(doc);
  };

  return (
      <PageLayout
          title={screenState === 'view'
              ? 'Visualizar usuário'
              : (screenState === 'edit' ? 'Editar Usuário' : 'Criar usuário')}
          onBack={() => history.push('/example')}
          viewer={viewer}
      >
        <SimpleForm
            mode={screenState}
            schema={userprofileApi.schema}
            doc={user}
            onSubmit={handleSubmit}
            loading={loading}

        >
          <ImageCompactField
              label={'Foto'}
              name={'photo'}
          />
          <FormGroup>
            <TextField
                placeholder="Nome do Usuário"
                name="username"
            />
            <TextField
                placeholder="Email"
                name="email"
            />
            <TextField
                placeholder="Telefone"
                name="phone"
            />
          </FormGroup>
          <div key={'Buttons'} style={{paddingTop: 20, paddingBottom: 20}}>
            <Button
                onClick={screenState === 'edit' ? () => history.push(
                    `/userprofile/view/${user._id}`) : (
                    !!viewer ? close : () => history.push(`/userprofile/list`)
                )}
                color={'secondary'} variant="contained">
              {screenState === 'view' ? 'Voltar' : 'Cancelar'}
            </Button>

            {screenState === 'view' ? (
                <Button onClick={() => history.push(
                    `/userprofile/edit/${user._id}`)}
                        color={'primary'} variant="contained">
                  {'Editar'}
                </Button>
            ) : null}
            {screenState !== 'view' ? (
                <Button color={'primary'} variant="contained" submit="true">
                  {'Salvar'}
                </Button>
            ) : null}
          </div>
        </SimpleForm>
      </PageLayout>
  );
};

export const UserProfileDetailContainer = withTracker((props) => {
  const {screenState, id} = props;
  const subHandle = userprofileApi.subscribe('default', {_id: id});
  const user = subHandle.ready() ? userprofileApi.findOne({_id: id}) : {};

  return ({
    screenState,
    user,
    save: (doc) => userprofileApi.update(doc, (e, r) => {
      if (!e) {
        props.history.push(
            `/userprofile/view/${screenState === 'create' ? r : doc._id}`);
        props.showNotification({
          type: 'success',
          title: 'Operação realizada!',
          description: `O usuário foi ${doc._id
              ? 'atualizado'
              : 'cadastrado'} com sucesso!`,
        });
      } else {
        console.log('Error:', e);
        props.showNotification({
          type: 'error',
          title: 'Operação não realizada!',
          description: `Erro ao realizar a operação: ${e.message}`,
        });
      }

    }),
  });
})(UserProfileDetail);
