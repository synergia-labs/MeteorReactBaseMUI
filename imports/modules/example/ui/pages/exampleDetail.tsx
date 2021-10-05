import React from 'react';
import {withTracker} from 'meteor/react-meteor-data';
import {exampleApi} from '../../api/exampleApi';
import SimpleForm from '../../../../ui/components/SimpleForm/SimpleForm';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import TextField
    from '/imports/ui/components/SimpleFormFields/TextField/TextField';
import TextMaskField
    from '../../../../ui/components/SimpleFormFields/TextMaskField/TextMaskField';
import ToggleSwitchField
    from '../../../../ui/components/SimpleFormFields/ToggleField/ToggleField';
import RadioButtonField
    from '../../../../ui/components/SimpleFormFields/RadioButtonField/RadioButtonField';

import SelectField
    from '../../../../ui/components/SimpleFormFields/SelectField/SelectField';
import UploadFilesCollection
    from '../../../../ui/components/SimpleFormFields/UploadFiles/uploadFilesCollection';

import ChipInput
    from '../../../../ui/components/SimpleFormFields/ChipInput/ChipInput';
import SliderField
    from '/imports/ui/components/SimpleFormFields/SliderField/SliderField';
import AudioRecorder
    from '/imports/ui/components/SimpleFormFields/AudioRecorderField/AudioRecorder';
import ImageCompactField
    from '/imports/ui/components/SimpleFormFields/ImageCompactField/ImageCompactField';
import * as appStyle from '/imports/materialui/styles';
import Print from '@mui/icons-material/Print';
import Close from '@mui/icons-material/Close';
import {PageLayout} from '/imports/ui/layouts/pageLayout';

interface IExampleDetail {
  screenState: string;
  loading: boolean;
  isPrintView: boolean;
  exampleDoc: object;
  save: { (doc: object, callback?: {}): void };
  history: { push(url: string): void };
}

const ExampleDetail = ({
  isPrintView,
  screenState,
  loading,
  exampleDoc,
  save,
  history,
}: IExampleDetail) => {

  const handleSubmit = (doc: object) => {
    save(doc);
  };
  return (
      <PageLayout
          title={screenState === 'view'
              ? 'Visualizar exemplo'
              : (screenState === 'edit' ? 'Editar Exemplo' : 'Criar exemplo')}
          onBack={() => history.push('/example')}
          actions={[
            !isPrintView ? (
                <span style={{
                  cursor: 'pointer',
                  marginRight: 10,
                  color: appStyle.primaryColor,
                }} onClick={() => {
                  history.push(`/example/printview/${exampleDoc._id}`);
                }}><Print/></span>
            ) : (
                <span style={{
                  cursor: 'pointer',
                  marginRight: 10,
                  color: appStyle.primaryColor,
                }} onClick={() => {
                  history.push(`/example/view/${exampleDoc._id}`);
                }}><Close/></span>
            ),
          ]}
      >
        <SimpleForm
            mode={screenState}
            schema={exampleApi.getSchema()}
            doc={exampleDoc}
            onSubmit={handleSubmit}
            loading={loading}
        >

          <ImageCompactField
              label={'Imagem Zoom+Slider'}
              name={'image'}
          />

          <FormGroup key={'fieldsOne'}>
            <TextField
                placeholder="Titulo"
                name="title"
            />
            <TextField
                placeholder="Descrição"
                name="description"
            />
          </FormGroup>
          {/*<GoogleApiWrapper*/}
          {/*    name={'address'}*/}
          {/*/>*/}
          <FormGroup key={'fieldsTwo'}>
            <SelectField
                placeholder="Tipo"
                options={[
                  {value: 'normal', label: 'Normal'},
                  {value: 'extra', label: 'Extra'},
                ]}
                name="type"
            />
            <SelectField
                placeholder="Tipo2"
                id="Tipo2"
                name="type2"
            />
          </FormGroup>
          <FormGroup key={'fieldsThree'} formType={'subform'} name={'contacts'}>
            <TextMaskField
                placeholder="Telefone"
                name="phone"
            />
            <TextMaskField
                placeholder="CPF"
                name="cpf"
            />
          </FormGroup>
          <FormGroup key={'fieldsFour'} formType={'subformArray'}
                     name={'tasks'}>
            <TextField
                placeholder="Nome da Tarefa"
                name="name"
            />
            <TextField
                placeholder="Descrição da Tarefa"
                name="description"
            />
          </FormGroup>

          <SliderField
              placeholder="Slider"
              name="slider"
          />

          <ToggleSwitchField
              placeholder="Status da Tarefa"
              name="statusToggle"
          />

          <RadioButtonField
              placeholder="Opções da Tarefa"
              name="statusRadio"
              options={[
                {value: 'valA', label: 'Valor A'},
                {value: 'valB', label: 'Valor B'},
                {value: 'valC', label: 'Valor C'},

              ]}
          />

          <FormGroup key={'fields'}>
            <AudioRecorder
                placeholder="Áudio"
                name="audio"
            />
          </FormGroup>

          <UploadFilesCollection
              name="files"
              label={'Arquivos'}
              doc={exampleDoc}/>
          <FormGroup key={'fieldsFive'} name={'chips'}>
            <ChipInput
                name="chip"
                placeholder="Chip"
            />
          </FormGroup>
          <div key={'Buttons'} style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'left',
            paddingTop: 20,
            paddingBottom: 20,
          }}>
            {!isPrintView ? (
                <Button
                    key={'b1'}
                    style={{marginRight: 10}}
                    onClick={screenState === 'edit' ? () => history.push(
                        `/example/view/${exampleDoc._id}`) : () => history.push(
                        `/example/list`)}
                    color={'secondary'} variant="contained">
                  {screenState === 'view' ? 'Voltar' : 'Cancelar'}
                </Button>
            ) : null}


            {!isPrintView && screenState === 'view' ? (
                <Button key={'b2'} onClick={() => history.push(
                    `/example/edit/${exampleDoc._id}`)}
                        color={'primary'} variant="contained">
                  {'Editar'}
                </Button>
            ) : null}
            {!isPrintView && screenState !== 'view' ? (
                <Button key={'b3'} color={'primary'} variant="contained"
                        submit="true">
                  {'Salvar'}
                </Button>
            ) : null}
          </div>
        </SimpleForm>

      </PageLayout>
  );
};

interface IExampleDetailContainer {
  screenState: string;
  id: string;
  history: { push(url: string): void };
  showNotification: (data: { type: string, title: string, description: string }) => void;
}

export const ExampleDetailContainer = withTracker(
    (props: IExampleDetailContainer) => {
      const {screenState, id} = props;
      const subHandle = !!id
          ? exampleApi.subscribe('exampleDetail', {_id: id})
          : null;
      let exampleDoc = id && subHandle.ready()
          ? exampleApi.findOne({_id: id})
          : {};

      return ({
        screenState,
        exampleDoc,
        save: (doc, callback) => exampleApi[screenState === 'create'
            ? 'insert'
            : 'update'](doc, (e, r) => {
          if (!e) {
            props.history.push(
                `/example/view/${screenState === 'create' ? r : doc._id}`);
            props.showNotification({
              type: 'success',
              title: 'Operação realizada!',
              description: `O exemplo foi ${doc._id
                  ? 'atualizado'
                  : 'cadastrado'} com sucesso!`,
            });
          } else {
            console.log('Error:', e);
            props.showNotification({
              type: 'warning',
              title: 'Operação não realizada!',
              description: `Erro ao realizar a operação: ${e.message}`,
            });
          }

        }),
      });
    })(ExampleDetail);
