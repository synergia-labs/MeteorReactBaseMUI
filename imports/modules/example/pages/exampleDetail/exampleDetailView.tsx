import React, { useContext } from "react";
import { ExampleDetailControllerContext } from "./exampleDetailContoller";
import { ExampleModuleContext } from "../../exampleContainer";
import ExampleDetailStyles from "./exampleDetailStyles";
import SysForm from "/imports/ui/components/sysForm/sysForm";
import SysTextField from "/imports/ui/components/sysFormFields/sysTextField/sysTextField";
import CloseIcon from '@mui/icons-material/Close';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import { Button, Icon, IconButton, Typography } from "@mui/material";
import { SysSelectField } from "/imports/ui/components/sysFormFields/sysSelectField/sysSelectField";
import { SysRadioButton } from "/imports/ui/components/sysFormFields/sysRadioButton/sysRadioButton";
import { SysCheckBox } from "/imports/ui/components/sysFormFields/sysCheckBoxField/sysCheckBoxField";
import SysFormButton from "/imports/ui/components/sysFormFields/sysFormButton/sysFormButton";


const ExampleDetailView = () => {
    const controller = useContext(ExampleDetailControllerContext);
    const { state } = useContext(ExampleModuleContext);
    const isView   = state === 'view';
    const isEdit   = state === 'edit';
    const isCreate = state === 'create';

    return(
        <ExampleDetailStyles.container>
            <ExampleDetailStyles.header>
                {isView && <IconButton onClick = {controller.closePage}><ArrowBackOutlinedIcon /></IconButton>}
                <Typography variant='h5' sx={{flexGrow: 1}}>
                    {isCreate ? 'Adicionar Item' : isEdit ? 'Editar Item' : controller.document.title}
                </Typography>
                <IconButton onClick = {!isView ? controller.closePage : () => controller.changeToEdit(controller.document._id || '')}>
                    {!isView ? <CloseIcon /> : <ModeEditOutlinedIcon />}
                </IconButton>

            </ExampleDetailStyles.header>
            <SysForm
                mode = {state as 'create' | 'view' | 'edit'}
                schema = {controller.schema}
                doc = {controller.document}
                onSubmit={controller.onSubmit}
                debugAlerts={false}
            >
                <ExampleDetailStyles.body>

                    <ExampleDetailStyles.formColumn >
                        <SysTextField 
                            name = 'title'
                            placeholder="Ex.: Item XX" 
                        />
                        <SysSelectField
                            name='type'
                        />
                        <SysRadioButton
                            name='typeMulti' 
                            alignment="row"
                            size='small'
                        />
                        <SysTextField 
                            name='description'
                            placeholder="Acrescente informações sobre o item (3 linhas)"
                            multiline
                            rows={3}
                            maxRows={3}
                            showNumberCharactersTyped
                            max={200}
                        />
                    </ExampleDetailStyles.formColumn>
                    <ExampleDetailStyles.formColumn>
                        <SysCheckBox 
                            name='check'
                            alignment="row"
                        />
                    </ExampleDetailStyles.formColumn>

                </ExampleDetailStyles.body>
                <ExampleDetailStyles.footer>
                    {!isView && <Button
                        variant="outlined"
                        startIcon={<CloseIcon />}
                        onClick={controller.closePage}
                    >
                        Cancelar
                    </Button>}
                    <SysFormButton>
                        Salvar
                    </SysFormButton>
                </ExampleDetailStyles.footer>
            </SysForm>

        </ExampleDetailStyles.container>
    );
};

export default ExampleDetailView;