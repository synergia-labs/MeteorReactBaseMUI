import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Tooltip from "@mui/material/Tooltip";
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { schemaFormated } from './interface/sysFormSch';
import { sysSizing } from '/imports/ui/materialui/styles';
import SysIcon from '/imports/ui/components/sysIcon/sysIcon';
import SysForm from '/imports/ui/components/sysForm/sysForm';
import { SysFormPlaygroundContext } from './sysFormPlayground';
import SysFormPlaygroundStyles from './sysFormPlaygroundStyles';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import SysSlider from '/imports/ui/components/sysFormFields/sysSlider/sysSliderField';
import SysTextField from '/imports/ui/components/sysFormFields/sysTextField/sysTextField';
import SysFormButton from '/imports/ui/components/sysFormFields/sysFormButton/sysFormButton';
import { SysSelectField } from '/imports/ui/components/sysFormFields/sysSelectField/sysSelectField';
import { SysRadioButton } from '/imports/ui/components/sysFormFields/sysRadioButton/sysRadioButton';
import { SysCheckBox } from '/imports/ui/components/sysFormFields/sysCheckBoxField/sysCheckBoxField';
import { SysDatePickerField } from '/imports/ui/components/sysFormFields/sysDatePickerField/sysDatePickerField';
import { SysLocationField } from '/imports/ui/components/sysFormFields/sysLocationField/sysLocationField';

const SysFormPlaygroundView: React.FC = () => {
	const controller = useContext(SysFormPlaygroundContext);
  const {
    Container,
    ControlerContainer,
    ButtonContainer,
    Description,
    DocContainer,
    FormContainer,
    Playground,
    RowElement,
    SchemaContainer,
  } = SysFormPlaygroundStyles;

  const transparentTheme = {
    ...solarizedlight,
    'code[class*="language-"]': { ...solarizedlight['code[class*="language-"]'], background: 'transparent' },
    'pre[class*="language-"]': { ...solarizedlight['pre[class*="language-"]'], background: 'transparent' },
  };

	return (
		<Container>
			<Typography variant="h3">SysForm</Typography>
			<Description>
				<p>
					O SysForm é um componente desenvolvido para gerenciar formulários em aplicações React. Ele foi criado com o
					propósito de simplificar todas as etapas do ciclo de vida de um formulário, desde a sua criação até a
					interação do usuário e a validação dos dados inseridos. Este componente desempenha um papel crucial no
					desenvolvimento web, fornecendo uma solução robusta e flexível para lidar com a entrada de dados em
					formulários.
				</p>
				<p>
					Uma das características fundamentais do SysForm é sua capacidade de se adaptar a diferentes contextos de uso.
					Ele oferece suporte para diferentes modos de exibição do formulário, como edição, visualização e criação. Isso
					significa que os desenvolvedores podem criar formulários que se ajustam dinamicamente às necessidades dos
					usuários, proporcionando uma experiência de uso mais fluida e intuitiva.
				</p>
				<p>
					Além disso, o SysForm oferece uma ampla gama de funcionalidades para facilitar o processo de validação dos
					dados. Ele não apenas suporta validações padrão definidas no esquema do formulário, mas também permite a
					implementação de validações personalizadas que podem responder às interações do usuário em tempo real. Isso
					garante a integridade dos dados submetidos e proporciona uma experiência mais confiável para o usuário final.
				</p>
				<p>
					Outro aspecto importante do SysForm é a sua capacidade de interagir de forma eficiente com os diferentes
					componentes do formulário. Ele fornece métodos para limpar valores de campos, definir novos valores, controlar
					a visibilidade de componentes, gerenciar erros de validação e atualizar as opções disponíveis para seleção.
					Isso permite aos desenvolvedores criar formulários altamente interativos e responsivos, melhorando
					significativamente a experiência do usuário.
				</p>
				<p>
					Além disso, o SysForm cuida do estado do botão de envio, garantindo que ele esteja desabilitado quando campos
					obrigatórios não forem preenchidos. Essa funcionalidade ajuda a evitar envios inválidos de formulários e
					contribui para uma experiência mais intuitiva e sem erros para o usuário final.
				</p>
				<p>
					Por fim, a integração do SysForm com o contexto do aplicativo oferece uma série de benefícios adicionais. Ele
					permite acessar funcionalidades globais, como notificações, e fornece um contexto específico para os
					componentes do formulário. Isso facilita o compartilhamento de informações relevantes entre os diferentes
					elementos do formulário, melhorando a coesão e a consistência da aplicação como um todo.
				</p>
				<p>
					Em resumo, o SysForm é uma ferramenta essencial para simplificar o processo de criação, validação e interação
					com formulários em aplicações React. Sua ampla gama de funcionalidades e sua capacidade de se adaptar a
					diferentes contextos tornam-no uma escolha ideal para desenvolvedores que desejam criar formulários altamente
					funcionais e intuitivos.
				</p>
				<p>
					<strong style={{ color: 'red' }}>Obervações: </strong> Para utilizar o SysForm, é necessário informar sempre o
					Schema e utilizar apenas os componentes da pasta SysFormComponents. A integração com outros componentes não é
					garantida e pode causar problemas de funcionamento. Além disso, valores default devem ser passados no schema
					ou no doc informado para o SysForm e nunca inline nos componentes.
				</p>
			</Description>

			<Typography variant="h5">Playground</Typography>
			<Box sx={{ display: 'flex', flexDirection: 'column', gap: sysSizing.spacingFixedLg }}>
				<Typography variant="subtitle1">schema</Typography>
				<SchemaContainer>
          <SyntaxHighlighter language="typescript" style={transparentTheme}>
              {schemaFormated}
            </SyntaxHighlighter>
				</SchemaContainer>
			</Box>

			<Playground>
				<FormContainer>
					<Typography variant="subtitle1">Formulário</Typography>
					<SysForm
						schema={controller.schema}
						ref={controller.sysFormRef}
						doc={controller.doc}
						onChange={controller.updateDocRealTime}
						mode={controller.mode}
						debugAlerts={controller.debugMode}
						loading={controller.loading}
						onSubmit={controller.onSubmit}
						validateOnChange={controller.realTimeValidation}>
						<RowElement>
							<SysTextField name="name" placeholder="Digite seu nome completo" />
							{controller.mode === 'edit' && (
								<Button
									variant="outlined"
									startIcon={<SysIcon name={'task'} />}
									onClick={() => controller.validateIndividualField('name')}
                  sx={{ mt: '1.5rem' }}>
									Validar
								</Button>
							)}
						</RowElement>
						<RowElement>
							<SysSelectField name="status" placeholder="Selecionar" />
							<SysDatePickerField name="statusDate" placeholder="Selecione uma data" />
						</RowElement>
						<RowElement>
							<SysTextField name="cpf" placeholder="Ex.: 123.456.789-00" />
							{controller.mode === 'edit' && (
                <Tooltip title={'Validar'}>
                  <IconButton
                    size="small"
                    onClick={() => controller.validateIndividualField('cpf')}
                    sx={{ mt: '2rem' }}>
                    <SysIcon name={'task'} />
                  </IconButton>
                </Tooltip>
							)}
						</RowElement>
						<SysTextField name="phone" placeholder="Ex.: (31) 91234-5678" />
						<RowElement>
							<SysDatePickerField name="birthDate" />
							<SysSelectField name="midia" placeholder="Selecione" />
						</RowElement>
						<SysCheckBox name="favorites" childrenAlignment="row" />
						<SysTextField name="otherFavorite" placeholder="Informe seu tipo favorito de mídia e um exemplo" />
						<SysRadioButton name="rate" childrenAlignment="row" />
						<SysLocationField name="address" />
						<SysSlider name="temperature" />
						<SysFormButton sx={{ alignSelf: 'flex-start' }} startIcon={<SysIcon name={'check'} />}>
							Enviar
						</SysFormButton>
					</SysForm>
				</FormContainer>
				<ControlerContainer>
					<Typography variant="subtitle1">Controles</Typography>
					<ButtonContainer>
						<Button startIcon={<SysIcon name={'task'} />} onClick={controller.sysFormRef.current?.validateFields}>
							Validar
						</Button>
						<Button
							startIcon={controller.mode === 'edit' ? <SysIcon name={'visibility'}/> : <SysIcon name={'edit'} />}
							onClick={() => controller.setMode(controller.mode === 'edit' ? 'view' : 'edit')}
							//@ts-ignore
							color={controller.mode === 'edit' ? 'tertiary' : 'secondary'}>
							{controller.mode === 'edit' ? 'Alterar Modo: Visualização' : 'Alterar Modo: Edição'}
						</Button>
						<Button
							startIcon={<SysIcon name={'cleaning'} />}
							color="error"
							onClick={() => {
								controller.sysFormRef.current?.clearForm();
								controller.updateDoc();
							}}>
							Limpar
						</Button>
						<Button
							startIcon={<SysIcon name={'security'} />}
							onClick={controller.sysFormRef.current?.submit}
							color="warning">
							Forçar submit
						</Button>
						<Button
							startIcon={<SysIcon name={'manageSearch'} />}
							onClick={() => controller.setDebugMode(!controller.debugMode)}
							color={!controller.debugMode ? 'warning' : 'success'}>
							{controller.debugMode ? 'Desativar Debug' : 'Ativar Debug'}
						</Button>
						<Button startIcon={<SysIcon name={'security'} />} onClick={() => controller.setLoading(!controller.loading)}>
							Loading: {controller.loading ? 'Ativo' : 'Inativo'}
						</Button>
						<Button
							startIcon={<SysIcon name={'published'} />}
							onClick={() => controller.setRealTimeValidation(!controller.realTimeValidation)}>
							Validação em tempo real: {controller.realTimeValidation ? 'Ativo' : 'Inativo'}
						</Button>
					</ButtonContainer>

					<Typography variant="subtitle1">Doc</Typography>
					<DocContainer>
            <SyntaxHighlighter language="typescript" style={transparentTheme}>
						  {JSON.stringify(controller.doc, null, 2)}
            </SyntaxHighlighter>
						<Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Tooltip title={'Atualizar doc'}>
                <IconButton onClick={controller.updateDoc}>
                  <SysIcon name={'replay'} />
                </IconButton>
              </Tooltip>
              <Tooltip title={controller.updateRealTime ? 'Atualização em tempo real' : 'Atualização manual'}>
                <IconButton onClick={() => controller.changeUpdateRealTime(!controller.updateRealTime)}>
                  {controller.updateRealTime ? <SysIcon name={'visibility'} /> : <SysIcon name={'visibilityOff'}/>}
                </IconButton>
              </Tooltip>
              <Tooltip title={'Campos com erro'}>
                <IconButton onClick={controller.showFieldWithErrors}>
                  <SysIcon name={'errorCircle'} color="error" />
                </IconButton>
              </Tooltip>
						</Box>
					</DocContainer>
				</ControlerContainer>
			</Playground>
		</Container>
	);
};

export default SysFormPlaygroundView;
