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
import DatePickerField from "/imports/ui/components/SimpleFormFields/DatePickerField/DatePickerField";
import CheckBoxField from "/imports/ui/components/SimpleFormFields/CheckBoxField/CheckBoxField";
import ToggleButtonField from "/imports/ui/components/SimpleFormFields/ToggleButtonField/ToggleButtonField";

const ExampleDetailView = () => {
    const controller = useContext(ExampleDetailControllerContext);
    const {state} = useContext(ExampleModuleContext);

    const save = () => {
        console.log(controller.document)
    }

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
                            <TextField key={'tituloKEY'} placeholder="Ex.: Item XX" name="title" />
                            <DatePickerField key={'dateKEY'} placeholder="dd/mm/aa" name="date" />
                            <SelectField key={'tipoKEY'} placeholder="Selecionar" name="type" />
                            <RadioButtonField
                                key={'radioKEY'}
                                placeholder="Opções da Tarefa"
                                name="statusRadio"
                                options={[
                                    { value: 'baixa', label: 'Baixa' },
                                    { value: 'media', label: 'Média' },
                                    { value: 'alta', label: 'Alta' },
                                ]}
                            />
                            <TextField key={'descricaoKEY'} placeholder="Descrição" name="description" />
                        </ExampleDetailStyledFormContainer>
                        <ExampleDetailStyledFormContainer>
        					<CheckBoxField key={'checkKEY'} name="check"/>
                            <ToggleButtonField  key={'toggleKEY'} name="statusToggle"/>
                            <UploadFilesCollection
                                key={'EuploadsFilesKEY'}
                                name="files"
                                label={'Arquivos'}
                                doc={{ _id: controller.document._id ?? ''  }}
                            />

                        </ExampleDetailStyledFormContainer>
                    </ExampleDetailStyledBody>
                    <ExampleDetailStyledFooter>
                        <Button 
                            key={"btnCancel"} 
                            onClick={controller.closePage}
                            variant="outlined"
                            startIcon={<CloseIcon />}
                        > 
                            Cancelar
                        </Button>
                        <Button 
                            key={"btnSave"} 
                            id="submit"
                            variant="contained"
                            startIcon={<CheckIcon />}
                        >
                            Salvar
                        </Button>
                    </ExampleDetailStyledFooter>
                </ExampleDetailStyledContainer>
            </SimpleForm>

        </ExampleDetailStyledContainer>
    );
};

export default ExampleDetailView;