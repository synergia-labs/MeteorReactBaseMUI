import React, { useContext } from "react";
import SysFormPlaygroundStyles from "./sysFormPlaygroundStyles";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { sysSizing } from "/imports/ui/materialui/styles";
import SysForm from "/imports/ui/components/sysForm/sysForm";
import { SysFormPlaygroundContext } from "./sysFormPlayground";
import SysTextField from "/imports/ui/components/sysFormFields/sysTextField/sysTextField";
import TaskOutlinedIcon from '@mui/icons-material/TaskOutlined';
import { SysSelectField } from "/imports/ui/components/sysFormFields/sysSelectField/sysSelectField";
import { SysDatePickerField } from "/imports/ui/components/sysFormFields/sysDatePickerField/sysDatePickerField";
import { SysRadioButton } from "/imports/ui/components/sysFormFields/sysRadioButton/sysRadioButton";
import { SysCheckBox } from "/imports/ui/components/sysFormFields/sysCheckBoxField/sysCheckBoxField";
import SysFormButton from "/imports/ui/components/sysFormFields/sysFormButton/sysFormButton";
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import ReplayIcon from '@mui/icons-material/Replay';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import CleaningServicesOutlinedIcon from '@mui/icons-material/CleaningServicesOutlined';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import ManageSearchOutlinedIcon from '@mui/icons-material/ManageSearchOutlined';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import { schemaFormated } from "./interface/sysFormSch";
import PublishedWithChangesOutlinedIcon from '@mui/icons-material/PublishedWithChangesOutlined';

const SysFormPlaygroundView: React.FC = () => {
    const controller = useContext(SysFormPlaygroundContext);

    return (
        <SysFormPlaygroundStyles.container>
            <Typography variant="h3">SysForm</Typography>
            <SysFormPlaygroundStyles.description>
                <p>
                    O SysForm é um componente desenvolvido para gerenciar formulários em aplicações React. Ele foi criado com o propósito de simplificar todas as etapas do ciclo de vida de um formulário, desde a sua criação até a interação do usuário e a validação dos dados inseridos. Este componente desempenha um papel crucial no desenvolvimento web, fornecendo uma solução robusta e flexível para lidar com a entrada de dados em formulários.
                </p>
                <p>
                    Uma das características fundamentais do SysForm é sua capacidade de se adaptar a diferentes contextos de uso. Ele oferece suporte para diferentes modos de exibição do formulário, como edição, visualização e criação. Isso significa que os desenvolvedores podem criar formulários que se ajustam dinamicamente às necessidades dos usuários, proporcionando uma experiência de uso mais fluida e intuitiva.
                </p>
                <p>
                    Além disso, o SysForm oferece uma ampla gama de funcionalidades para facilitar o processo de validação dos dados. Ele não apenas suporta validações padrão definidas no esquema do formulário, mas também permite a implementação de validações personalizadas que podem responder às interações do usuário em tempo real. Isso garante a integridade dos dados submetidos e proporciona uma experiência mais confiável para o usuário final.
                </p>
                <p>
                    Outro aspecto importante do SysForm é a sua capacidade de interagir de forma eficiente com os diferentes componentes do formulário. Ele fornece métodos para limpar valores de campos, definir novos valores, controlar a visibilidade de componentes, gerenciar erros de validação e atualizar as opções disponíveis para seleção. Isso permite aos desenvolvedores criar formulários altamente interativos e responsivos, melhorando significativamente a experiência do usuário.
                </p>
                <p>
                    Além disso, o SysForm cuida do estado do botão de envio, garantindo que ele esteja desabilitado quando campos obrigatórios não forem preenchidos. Essa funcionalidade ajuda a evitar envios inválidos de formulários e contribui para uma experiência mais intuitiva e sem erros para o usuário final.
                </p>
                <p>
                    Por fim, a integração do SysForm com o contexto do aplicativo oferece uma série de benefícios adicionais. Ele permite acessar funcionalidades globais, como notificações, e fornece um contexto específico para os componentes do formulário. Isso facilita o compartilhamento de informações relevantes entre os diferentes elementos do formulário, melhorando a coesão e a consistência da aplicação como um todo.
                </p>
                <p>
                    Em resumo, o SysForm é uma ferramenta essencial para simplificar o processo de criação, validação e interação com formulários em aplicações React. Sua ampla gama de funcionalidades e sua capacidade de se adaptar a diferentes contextos tornam-no uma escolha ideal para desenvolvedores que desejam criar formulários altamente funcionais e intuitivos.
                </p>
                <p>
                    <strong style={{color: "red"}}>Obervações: </strong> Para utilizar o SysForm, é necessário informar sempre o Schema e utilizar apenas os componentes da pasta SysFormComponents. A integração com outros componentes não é garantida e pode causar problemas de funcionamento. Além disso, valores default devem ser passados no schema ou no doc informado para o SysForm e nunca inline nos componentes.  
                </p>

            </SysFormPlaygroundStyles.description>

            <Typography variant="h5">Playground</Typography>
            <Box sx={{display: 'flex', flexDirection: 'column', gap: sysSizing.spacingFixedLg}}>
                <Typography variant='subtitle1'>schema</Typography>
                <SysFormPlaygroundStyles.schemaContainer>
                    <pre>
                        {schemaFormated}
                    </pre>
                </SysFormPlaygroundStyles.schemaContainer>
            </Box>

            <SysFormPlaygroundStyles.playground>
                <SysFormPlaygroundStyles.formContainer>
                    <Typography variant='subtitle1'>Formulário</Typography>
                    <SysForm
                        schema = {controller.schema}
                        ref = {controller.sysFormRef}
                        doc = {controller.doc}
                        onChange={controller.updateDocRealTime}
                        mode={controller.mode}
                        debugAlerts={controller.debugMode}
                        loading={controller.loading}
                        onSubmit={controller.onSubmit}
                        validateOnChange={controller.realTimeValidation}
                    >
                        <SysFormPlaygroundStyles.rowElement>
                            <SysTextField 
                                name = 'name'
                                placeholder= "Digite seu nome completo" 
                            />
                            {controller.mode === 'edit' && <Button
                                variant="outlined"
                                sx={{height: 'fit-content', alignSelf: 'center'}}
                                startIcon={<TaskOutlinedIcon />}
                                onClick={() => controller.validateIndividualField("name")}
                            >
                                Validar
                            </Button>}
                        </SysFormPlaygroundStyles.rowElement>
                        <SysFormPlaygroundStyles.rowElement>
                            <SysSelectField 
                                name = 'status'
                                placeholder= "Selecionar"
                            />
                            <SysDatePickerField 
                                name = 'statusDate'
                                placeholder= "Selecione uma data"
                            />
                        </SysFormPlaygroundStyles.rowElement>
                        <SysFormPlaygroundStyles.rowElement>
                            <SysTextField 
                                name='cpf'
                                placeholder= "Ex.: 123.456.789-00"
                            />
                            {controller.mode === 'edit'&& <IconButton
                                size="small"
                                onClick={() => controller.validateIndividualField("cpf")}
                                sx={{alignSelf: 'flex-end'}}
                            >
                                <TaskOutlinedIcon />
                            </IconButton>}
                        </SysFormPlaygroundStyles.rowElement>
                        <SysTextField 
                            name='phone'
                            placeholder="Ex.: (31) 91234-5678"
                        />
                        <SysFormPlaygroundStyles.rowElement>
                            <SysDatePickerField 
                                name='birthDate'
                            />
                            <SysSelectField 
                                name='midia'
                                placeholder="Selecione"
                            />
                        </SysFormPlaygroundStyles.rowElement>
                        <SysCheckBox 
                            name = 'favorites'
                            alignment="row"
                        />
                        <SysTextField 
                            name="otherFavorite"
                            placeholder="Informe seu tipo favorito de mídia e um exemplo"
                        />
                        <SysRadioButton name='rate' alignment="row" />
                        <SysFormButton
                            sx={{alignSelf: 'flex-start'}}
                            startIcon={<CheckOutlinedIcon />}
                        >
                            Enviar
                        </SysFormButton>
                    </SysForm>
                </SysFormPlaygroundStyles.formContainer>
                <SysFormPlaygroundStyles.controlerContainer>
                    <Typography variant='subtitle1'>Controles</Typography>
                    <SysFormPlaygroundStyles.buttonContainer>
                        <Button
                            startIcon={<TaskOutlinedIcon />}
                            onClick = {controller.sysFormRef.current?.validateFields}
                        >
                            Validar
                        </Button>
                        <Button
                            startIcon={ controller.mode === 'edit' ? <VisibilityOutlinedIcon /> : <ModeEditOutlineOutlinedIcon />}
                            onClick = {() => controller.setMode(controller.mode === 'edit' ? 'view' : 'edit')}
                            //@ts-ignore
                            color={controller.mode === 'edit' ? 'tertiary' : 'secondary'}
                        >
                            {controller.mode === 'edit' ? 'Alterar Modo: Visualização' : 'Alterar Modo: Edição'}
                        </Button>
                        <Button
                            startIcon={<CleaningServicesOutlinedIcon />}
                            color='error'
                            onClick = {() => {
                                controller.sysFormRef.current?.clearForm();
                                controller.updateDoc();
                            }}
                        >
                            Limpar
                        </Button>
                        <Button
                            startIcon={<SecurityOutlinedIcon />}
                            onClick = {controller.sysFormRef.current?.submit}
                            color='warning'
                        >
                            Forçar submit
                        </Button>
                        <Button
                            startIcon={<ManageSearchOutlinedIcon />}
                            onClick = {() => controller.setDebugMode(!controller.debugMode)}
                            color = {!controller.debugMode ? 'warning' : 'success'}
                        >
                            {controller.debugMode ? 'Desativar Debug' : 'Ativar Debug'}
                        </Button>
                        <Button
                            startIcon={<SecurityOutlinedIcon />}
                            onClick = {() => controller.setLoading(!controller.loading)}
                        >
                            Loading: {controller.loading ? 'Ativo' : 'Inativo'}
                        </Button>
                        <Button
                            startIcon={<PublishedWithChangesOutlinedIcon />}
                            onClick = {() => controller.setRealTimeValidation(!controller.realTimeValidation)}
                        >
                            Validação em tempo real: {controller.realTimeValidation ? 'Ativo' : 'Inativo'}
                        </Button>
                    </SysFormPlaygroundStyles.buttonContainer>


                    <Typography variant='subtitle1'>Doc</Typography>
                    <SysFormPlaygroundStyles.docContainer>
                        <pre>{JSON.stringify(controller.doc, null, 2)}</pre>
                        <Box sx={{display:'flex', flexDirection: 'column'}}>
                            <IconButton onClick={controller.updateDoc}>
                                <ReplayIcon />
                            </IconButton>
                            <IconButton onClick={() => controller.changeUpdateRealTime(!controller.updateRealTime)}>
                                {controller.updateRealTime ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
                            </IconButton>
                            <IconButton onClick={controller.showFieldWithErrors}>
                                <ErrorOutlineOutlinedIcon color='error' />
                            </IconButton>
                        </Box>
                    </SysFormPlaygroundStyles.docContainer>
                </SysFormPlaygroundStyles.controlerContainer>
            </SysFormPlaygroundStyles.playground>
        </SysFormPlaygroundStyles.container>
    );
}

export default SysFormPlaygroundView;