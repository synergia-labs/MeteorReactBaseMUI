import React, { useContext, useEffect, useRef, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import SysForm from '/imports/ui/components/sysForm/sysForm';
import SysFormButton from '/imports/ui/components/sysFormFields/sysFormButton/sysFormButton';
import SysFormTestsStyles from './sysFormTestsStyles';
import { sysFormTestsSch } from './sysFormTestsSch';
import { SysTextField } from '/imports/ui/components/sysFormFields/sysTextField/sysTextField';
import { ISysFormRef } from '/imports/ui/components/sysForm/typings';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import CodeViewSysForm from './components/codeViewSysForm';
import SyncOutlinedIcon from '@mui/icons-material/SyncOutlined';
import HourglassEmptyOutlinedIcon from '@mui/icons-material/HourglassEmptyOutlined';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import { SysAppLayoutContext } from '/imports/app/AppLayout';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import NotInterestedOutlinedIcon from '@mui/icons-material/NotInterestedOutlined';
import SysLabelView from '/imports/ui/components/sysLabelView/sysLabelView';

const SysFormTestsPage: React.FC = () => {
	const [dados, setDados] = useState<{ [key: string]: any }>({});
	const [loading, setLoading] = useState<boolean>(false);
	const [disabled, setDisabled] = useState<boolean>(false);
	const [mode, setMode] = useState<'view' | 'edit' | 'create'>('create');
	const sysFormRef = useRef<ISysFormRef>(null);

	const { showNotification } = useContext(SysAppLayoutContext);

	const changeMode = () => {
		setMode(mode === 'view' ? 'create' : 'view');
	};

	const onSubmit = (doc: { [key: string]: any }) => {
		setDados(doc);
		showNotification({
			title: 'Formulário submetido',
			message: 'O formulário foi submetido com sucesso.',
			type: 'success'
		});
	};

	useEffect(() => {
		if (sysFormRef.current) {
			setDados(sysFormRef.current.doc.current || {});
		}
	}, []);

	const validateForm = () => sysFormRef.current?.validateFields();
	const updateDoc = () => setDados(sysFormRef.current?.doc?.current || {});
	const forceSubmit = () => sysFormRef.current?.submit();

	return (
		<SysFormTestsStyles.container>
			<SysFormTestsStyles.header>
				<Typography variant="h3">Testes do componente de SysForm</Typography>
				<Typography variant="body1">
					Essa página é dedicada aos testes e exibições de componentes e funcionalidades do nosso sistema. Esperamos que
					você aproveite e aprenda bastante com ela. Para mais dúvidas consulte nossa documentação oficial pelo
					storybook.
				</Typography>
			</SysFormTestsStyles.header>
			<Typography variant="h5">Schema e docValues</Typography>
			<Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
				<SysFormTestsStyles.schemaAndValues>
					<CodeViewSysForm type="schema" document={sysFormTestsSch} />
					<CodeViewSysForm type="docValues" document={dados} />
				</SysFormTestsStyles.schemaAndValues>
				<Typography variant="caption" sx={{ mt: '5px' }}>
					*obs: As funções como de visibilidade e validação não aparecem nessa visualização do schema.
				</Typography>
			</Box>
			<Typography variant="h5">Controladores</Typography>
			<SysFormTestsStyles.controllersContainer>
				<Button startIcon={<ManageSearchIcon />} onClick={() => validateForm()}>
					Validar
				</Button>
				<Button startIcon={<SyncOutlinedIcon />} onClick={() => updateDoc()}>
					Atualizar DocValues
				</Button>
				<Button startIcon={<HourglassEmptyOutlinedIcon />} onClick={() => setLoading(!loading)}>
					{loading ? 'Desativar Loading' : 'Ativar Loading'}
				</Button>
				<Button onClick={() => forceSubmit()} startIcon={<SecurityOutlinedIcon />}>
					Forçar Submit
				</Button>
				<Button onClick={() => setDisabled(!disabled)} startIcon={<NotInterestedOutlinedIcon />}>
					{!disabled ? 'Desativar Formulário' : 'Ativar Formulário'}
				</Button>
				<Button onClick={() => changeMode()} startIcon={<ManageSearchIcon />}>
					{mode === 'view' ? 'Mudar para Criar' : 'Mudar para Visualizar'}
				</Button>
			</SysFormTestsStyles.controllersContainer>

			<Typography variant="h5">SysForm</Typography>
			<SysFormTestsStyles.sysFormContainer>
				<SysForm
					schema={sysFormTestsSch}
					doc={dados}
					mode={mode}
					onSubmit={onSubmit}
					ref={sysFormRef}
					loading={loading}
					disabled={disabled}>
					<SysTextField name="title" showNumberCharactersTyped />
					<SysTextField name="type" />
					<SysTextField name="typeMulti" />
					<SysTextField name="contacts.cpf" />
					<SysTextField name="contacts.phone" helpIcon tooltipMessage="Digite o telefone" />
					<SysTextField
						name="contacts.cnpj"
						helpIcon
						tooltipMessage="Digite o CNPJ da sua empresa"
						positionTooltip="left-end"
					/>
					<SysTextField name="contacts.email" endAdornment={<EmailOutlinedIcon />} />
					<SysFormButton sx={{ alignSelf: 'flex-end' }}>Submit</SysFormButton>
				</SysForm>
			</SysFormTestsStyles.sysFormContainer>
		</SysFormTestsStyles.container>
	);
};

export default SysFormTestsPage;
