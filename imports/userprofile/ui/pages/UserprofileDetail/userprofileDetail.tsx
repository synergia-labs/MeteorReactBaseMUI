import React from 'react';
import {withTracker} from "meteor/react-meteor-data";
import {userprofileApi} from "../../../api/UserProfileApi";
import SimpleForm from "../../../../ui/components/SimpleForm/SimpleForm";
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import FormGroup from '@material-ui/core/FormGroup';
import TextField from '../../../../ui/components/SimpleFormFields/TextField/TextField';;

import SimpleImageUploadBase64 from "../../../../ui/components/SimpleFormFields/ImageUpload/SimpleImageUploadBase64";

import * as appStyles from "/imports/materialui/styles";

const UserProfileDetail = ({screenState,loading,user,save,history,viewer,close}) => {

    const handleSubmit = (doc) => {
        // console.log('doc',doc)
        save(doc);
    }

    return (
        <Container>
            <Typography style={appStyles.title}>{screenState==='view'?'Visualizar usuário':(screenState==='edit'?'Editar Usuário':'Criar usuário')}</Typography>
            <SimpleForm
                mode={screenState}
                schema={userprofileApi.schema}
                doc={user}
                onSubmit={handleSubmit}
                loading={loading}

            >
                <SimpleImageUploadBase64
                    label={'Foto'}
                    name={'photo'}
                />
                <FormGroup>
                    <TextField
                        placeholder='Nome do Usuário'
                        name='username'
                    />
                    <TextField
                        placeholder='Email'
                        name='email'
                    />
                </FormGroup>
                <div key={'Buttons'}>
                    <Button
                        onClick={screenState==='edit'?()=>history.push(`/userprofile/view/${user._id}`):(
                            !!viewer?close:()=>history.push(`/userprofile/list`)
                            )}
                        color={'secondary'} variant="contained">
                        {screenState==='view'?'Voltar':'Cancelar'}
                    </Button>

                    {screenState==='view'?(
                        <Button onClick={()=>history.push(`/userprofile/edit/${user._id}`)}
                                color={'primary'} variant="contained">
                            {'Editar'}
                        </Button>
                    ):null}
                    {screenState!=='view'?(
                        <Button color={'primary'} variant="contained" submit="true">
                            {'Salvar'}
                        </Button>
                    ):null}
                </div>
            </SimpleForm>
        </Container>
)
}

export const UserProfileDetailContainer = withTracker((props) => {
    const {screenState,id} = props;
    const subHandle = userprofileApi.subscribe('default',{_id:id});
    const user = subHandle.ready()?userprofileApi.findOne({_id:id}):{}

    return ({
        screenState,
        user,
        save:(doc)=>userprofileApi.update(doc,(e,r)=>{
            if(!e) {
                props.history.push(`/userprofile/view/${screenState==='create'?r:doc._id}`)
                props.showSnackBar({
                    type:'success',
                    title:'Operação realizada!',
                    message: `O usuário foi ${doc._id?'atualizado':'cadastrado'} com sucesso!`,
                })
            } else {
                console.log('Error:',e);
                props.showSnackBar({
                    type:'error',
                    title:'Operação não realizada!',
                    message: `Erro ao realizar a operação: ${e.message}`,
                })
            }

        }),
    })
})(UserProfileDetail)
