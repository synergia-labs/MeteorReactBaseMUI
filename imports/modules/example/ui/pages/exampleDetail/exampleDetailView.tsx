import React, { useContext } from "react";
import { Box, Button, FormGroup, IconButton, Typography } from "@mui/material";
import { ExampleDetailStyledBody, ExampleDetailStyledContainer, ExampleDetailStyledFooter, ExampleDetailStyledFormContainer, ExampleDetailStyledHeader } from "./exampleDetailStyles";
import CloseIcon from '@mui/icons-material/Close';
import { ExampleDetailControllerContext } from "./exampleDetailContoller";
import SimpleForm from "/imports/ui/components/SimpleForm/SimpleForm";
import TextField from "/imports/ui/components/SimpleFormFields/TextField/TextField";
import SelectField from "/imports/ui/components/SimpleFormFields/SelectField/SelectField";
import UploadFilesCollection from "/imports/ui/components/SimpleFormFields/UploadFiles/uploadFilesCollection";
import RadioButtonField from "/imports/ui/components/SimpleFormFields/RadioButtonField/RadioButtonField";
import SliderField from "/imports/ui/components/SimpleFormFields/SliderField/SliderField";
import { SysButton } from "/imports/ui/components/SimpleFormFields/SysButton/SysButton";
import CheckIcon from '@mui/icons-material/Check';
import { ExampleModuleContext } from "../../exampleContainer";

const ExampleDetailView = () => {
    const controller = useContext(ExampleDetailControllerContext);
    const {state} = useContext(ExampleModuleContext);
    return(
        <ExampleDetailStyledContainer>
            <ExampleDetailStyledHeader>
                <Typography variant='h5'>Adicionar item</Typography>
                <IconButton onClick={controller.closePage}>
                    <CloseIcon />
                </IconButton>
            </ExampleDetailStyledHeader>
            <SimpleForm
				key={'ExempleDetail-SimpleFormKEY'}
				doc={controller.document}
                mode={state}
				schema={controller.schema}
				onSubmit={controller.onSubmit}
				loading={controller.loading}
            >
                <ExampleDetailStyledContainer sx={{padding: 0}}>
                    <ExampleDetailStyledBody>
                        <ExampleDetailStyledFormContainer>
                            <TextField key={'f1-tituloKEY'} placeholder="Titulo" name="title" />
                            <TextField key={'f1-descricaoKEY'} placeholder="Descrição" name="description" />
                            <SelectField key={'f2-tipoKEY'} placeholder="Selecione um tipo" name="type" />
        					<SelectField key={'f2-multiTipoKEY'} placeholder="Selecione alguns tipos" name="typeMulti" />
                            <SliderField key={'ExempleDetail-SliderFieldKEY'} placeholder="Slider" name="slider" />
                        </ExampleDetailStyledFormContainer>
                        <ExampleDetailStyledFormContainer>
                            <RadioButtonField
                                key={'ExempleDetail-RadioKEY'}
                                placeholder="Opções da Tarefa"
                                name="statusRadio"
                                options={[
                                    { value: 'valA', label: 'Valor A' },
                                    { value: 'valB', label: 'Valor B' },
                                    { value: 'valC', label: 'Valor C' }
                                ]}
                            />
                            <UploadFilesCollection
                                key={'ExempleDetail-UploadsFilesKEY'}
                                name="files"
                                label={'Arquivos'}
                                doc={{ _id: controller.document._id ?? ''  }}
                            />

                        </ExampleDetailStyledFormContainer>
                    </ExampleDetailStyledBody>
                    <ExampleDetailStyledFooter>
                        <SysButton 
                            key={"btnCancel"} 
                            onClick={controller.closePage}
                            styleVariant="secondary"
                            startIcon={<CloseIcon />}
                        > 
                            {'Cancelar'}
                        </SysButton>
                        <SysButton 
                            key={"btnSave"} 
                            id="submit"
                            startIcon={<CheckIcon />}
                        >
                            {'Salvar'}
                        </SysButton>
                    </ExampleDetailStyledFooter>
                </ExampleDetailStyledContainer>
            </SimpleForm>

        </ExampleDetailStyledContainer>
    );
};

export default ExampleDetailView;