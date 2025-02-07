import React, { useContext, useEffect, useRef, useState } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SysForm from '../../../ui/components/sysForm/sysForm';
import SysFormButton from '../../../ui/components/sysFormFields/sysFormButton/sysFormButton';
import { sysFormTestsSch } from './sysFormTestsSch';
import { ISysFormRef } from '/imports/ui/components/sysForm/typings';
import CodeViewSysForm from './components/codeViewSysForm';
import SysTextField from '/imports/ui/components/sysFormFields/sysTextField/sysTextField';
import WrapTextField from './components/wrapTextField';
import { hasValue } from '/imports/libs/hasValue';
import { SysRadioButton } from '/imports/ui/components/sysFormFields/sysRadioButton/sysRadioButton';
import { SysSelectField } from '/imports/ui/components/sysFormFields/sysSelectField/sysSelectField';
import { SysDatePickerField } from '/imports/ui/components/sysFormFields/sysDatePickerField/sysDatePickerField';
import { SysCheckBox } from '/imports/ui/components/sysFormFields/sysCheckBoxField/sysCheckBoxField';
import { SysUploadFile } from '/imports/ui/components/sysFormFields/sysUploadFile/sysUploadFile';
import { SysLocationField } from '/imports/ui/components/sysFormFields/sysLocationField/sysLocationField';
import SysIcon from '/imports/ui/components/sysIcon/sysIcon';
import AppLayoutContext from '/imports/app/appLayoutProvider/appLayoutContext';

const SysFormTestsPage: React.FC = () => {
	const [dados, setDados] = useState<{ [key: string]: any }>({});
	const [loading, setLoading] = useState<boolean>(false);
	const [disabled, setDisabled] = useState<boolean>(false);
	const [mode, setMode] = useState<'view' | 'edit' | 'create'>('create');
	const [onChangeRealTime, setOnChangeRealTime] = useState<boolean>(false);
	const sysFormRef = useRef<ISysFormRef>(null);

	const { showNotification, showDialog } = useContext(AppLayoutContext);

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
			setDados(sysFormRef.current.getDocValues() ?? {});
		}
	}, []);

	const validateForm = () => sysFormRef.current?.validateFields();
	const updateDoc = () => setDados(sysFormRef.current?.getDocValues() || {});
	const forceSubmit = () => sysFormRef.current?.submit();
	const clear = () => sysFormRef.current?.clearForm();

	const updateRealTime = (doc: { [key: string]: any }) => {
		if (onChangeRealTime) setDados(doc);
	};

	const showErrorFields = () => {
		const errors = sysFormRef.current?.getFieldWithErrors();
		showDialog({
			title: 'Campos com erro',
			body: (
				<SysFormTestsStyles.erroContainer>
					{hasValue(errors) ? (
						<pre>{JSON.stringify(errors, null, 2)}</pre>
					) : (
						<Typography variant="body1">Nenhum campo com erro</Typography>
					)}
				</SysFormTestsStyles.erroContainer>
			)
		});
	};

	return (
		<SysFormTestsStyles.container>
			<SysFormTestsStyles.header>
				<Typography variant="h3">Testes do componente de SysForm</Typography>
				<Typography variant="body1" textAlign={'justify'}>
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
				<Button startIcon={<SysIcon name={'manageSearch'} />} onClick={() => validateForm()}>
					Validar
				</Button>
				<Button startIcon={<SysIcon name={'cleaning'} />} onClick={() => clear()}>
					Limpar
				</Button>
				<Button startIcon={<SysIcon name={'syncOutlined'} />} onClick={() => updateDoc()}>
					Atualizar DocValues
				</Button>
				<Button startIcon={<SysIcon name={'hourglassEmpty'} />} onClick={() => setLoading(!loading)}>
					{loading ? 'Desativar Loading' : 'Ativar Loading'}
				</Button>
				<Button onClick={() => forceSubmit()} startIcon={<SysIcon name={'security'} />}>
					Forçar Submit
				</Button>
				<Button onClick={() => setDisabled(!disabled)} startIcon={<SysIcon name={'notInterested'} />}>
					{!disabled ? 'Desativar Formulário' : 'Ativar Formulário'}
				</Button>
				<Button onClick={() => changeMode()} startIcon={<SysIcon name={'manageSearch'} />}>
					{mode === 'view' ? 'Mudar para modo: Create' : 'Mudar para modo: View'}
				</Button>
				<Button onClick={() => setOnChangeRealTime(!onChangeRealTime)} startIcon={<SysIcon name={'schedule'} />}>
					{!onChangeRealTime ? 'Ativar atualização em tempo real' : 'Desativar atualização em tempo real'}
				</Button>
				<Button onClick={showErrorFields} startIcon={<SysIcon name={'errorCircleFilled'} />}>
					Ver campos com erro
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
					disabled={disabled}
					onChange={updateRealTime}>
					<WrapTextField
						name="title"
						isVisibled={sysFormRef.current?.checkVisibilityField('title') ?? true}
						onClick={() => sysFormRef.current?.validateIndividualField('title')}
					/>
					<WrapTextField
						name="type"
						isVisibled={sysFormRef.current?.checkVisibilityField('type') ?? true}
						onClick={() => sysFormRef.current?.validateIndividualField('type')}
					/>
					<SysTextField name="typeMulti" />
					<WrapTextField
						name="contacts.cpf"
						isVisibled={sysFormRef.current?.checkVisibilityField('contacts.cpf') ?? true}
						onClick={() => sysFormRef.current?.validateIndividualField('contacts.cpf')}
					/>
					<WrapTextField
						name="contacts.phone"
						isVisibled={sysFormRef.current?.checkVisibilityField('contacts.phone') ?? true}
						onClick={() => sysFormRef.current?.validateIndividualField('contacts.phone')}
					/>
					<SysDatePickerField name="date" />
					<SysSelectField name="entertainment" fullWidth />
					<SysRadioButton name="entertainmentSpecific" childrenAlignment="row" />
					<SysCheckBox name="rating" childrenAlignment="row" />
					<WrapTextField
						name="contacts.cnpj"
						isVisibled={sysFormRef.current?.checkVisibilityField('contacts.cnpj') ?? true}
						onClick={() => sysFormRef.current?.validateIndividualField('contacts.cnpj')}
					/>
					<SysTextField name="contacts.novoSubSchema.email" endAdornment={<SysIcon name={'emailOutlined'} />} />
					<SysUploadFile name="arquivos" disabled />
					<SysLocationField name="address" />
					<SysFormButton sx={{ alignSelf: 'flex-end' }}>Submit</SysFormButton>
				</SysForm>
			</SysFormTestsStyles.sysFormContainer>
		</SysFormTestsStyles.container>
	);
};

export default SysFormTestsPage;
