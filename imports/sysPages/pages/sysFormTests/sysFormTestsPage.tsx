import React, { useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import SysForm from '/imports/ui/components/sysForm/sysForm';
import SysFormButton from '/imports/ui/components/sysFormFields/sysFormButton/sysFormButton';
import SysFormTestsStyles from './sysFormTestsStyles';
import { sysFormTestsSch } from './sysFormTestsSch';
import { SysTextField } from '/imports/ui/components/sysFormFields/sysTextField/sysTextField';
import { ISysFormRef } from '/imports/ui/components/sysForm/typings';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import CodeViewSysForm from './components/codeViewSysForm';

const SysFormTestsPage: React.FC = () => {
	const [dados, setDados] = React.useState<{[key:string] : any}>({});
	const sysFormRef = React.useRef<ISysFormRef>(null);

	useEffect(() => {
		if(sysFormRef.current){
			setDados(sysFormRef.current.doc);
		}

	}, []);

	return(
		<SysFormTestsStyles.container>
			<SysFormTestsStyles.header>
				<Typography variant="h3">Testes do componente de SysForm</Typography>
				<Typography variant="body1">
					Essa página é dedicada aos testes e exibições de componentes e funcionalidades do nosso sistema. Esperamos
					que você aproveite e aprenda bastante com ela. Para mais dúvidas consulte nossa documentação oficial pelo
					storybook.
				</Typography>
			</SysFormTestsStyles.header>
			<Typography variant="h5">Schema e docValues</Typography>
			<Box sx={{display: 'flex', flexDirection:'column', width:'100%'}}>
				<SysFormTestsStyles.schemaAndValues>
					<CodeViewSysForm type="schema" document={sysFormTestsSch} />
					<CodeViewSysForm type="docValues" document={dados} />
				</SysFormTestsStyles.schemaAndValues>
				<Typography variant="caption" sx={{mt: '5px'}}>*obs: As funções como de visibilidade e validação não aparecem nessa visualização do schema.</Typography>
			</Box>
			<Typography variant="h5">Controladores</Typography>
			<SysFormTestsStyles.controllersContainer>
				<Button
					startIcon={<ManageSearchIcon />}
					onClick={() => {
						if(sysFormRef.current){
							sysFormRef.current.validateFields();
						}
					}}
				>
					Validar
				</Button>
			</SysFormTestsStyles.controllersContainer>

			<Typography variant="h5">SysForm</Typography>
			<SysFormTestsStyles.sysFormContainer>
				<SysForm 
					schema={sysFormTestsSch} 
					doc={dados} 
					mode="create" 
					onSubmit={() => {}} 
					ref={sysFormRef}
				>
					<SysTextField name="title" />

					<SysTextField name="type" placeholder = "Teste" label="Teste 01	" />
					<SysTextField name="typeMulti" />
					<SysTextField name="contacts.cpf" />
					<SysTextField name="contacts.phone" />
					<SysFormButton sx={{alignSelf: 'flex-end'}}>Submit</SysFormButton>
				</SysForm>
			</SysFormTestsStyles.sysFormContainer>
		</SysFormTestsStyles.container>
	)

}

export default SysFormTestsPage;
