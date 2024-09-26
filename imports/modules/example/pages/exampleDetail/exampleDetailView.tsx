import React, { useContext } from 'react';
import { ExampleDetailControllerContext } from './exampleDetailContoller';
import { ExampleModuleContext } from '../../exampleContainer';
import ExampleDetailStyles from './exampleDetailStyles';
import SysForm from '../../../../ui/components/sysForm/sysForm';
import SysTextField from '../../../../ui/components/sysFormFields/sysTextField/sysTextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { SysSelectField } from '../../../../ui/components/sysFormFields/sysSelectField/sysSelectField';
import { SysRadioButton } from '../../../../ui/components/sysFormFields/sysRadioButton/sysRadioButton';
import { SysCheckBox } from '../../../../ui/components/sysFormFields/sysCheckBoxField/sysCheckBoxField';
import SysFormButton from '../../../../ui/components/sysFormFields/sysFormButton/sysFormButton';
import { SysUploadFile } from '../../../../ui/components/sysFormFields/sysUploadFile/sysUploadFile';
import SysSlider from '../../../../ui/components/sysFormFields/sysSlider/sysSliderField';
import { SysLocationField } from '../../../../ui/components/sysFormFields/sysLocationField/sysLocationField';
import SysIcon from '../../../../ui/components/sysIcon/sysIcon';

const ExampleDetailView = () => {
	const controller = useContext(ExampleDetailControllerContext);
	const { state } = useContext(ExampleModuleContext);
	const isView = state === 'view';
	const isEdit = state === 'edit';
	const isCreate = state === 'create';
	const { Container, Body, Header, Footer, FormColumn } = ExampleDetailStyles;

	return (
		<Container>
			<Header>
				{isView && (
					<IconButton onClick={controller.closePage}>
						<SysIcon name={'arrowBack'} />
					</IconButton>
				)}
				<Typography variant="h5" sx={{ flexGrow: 1 }}>
					{isCreate ? 'Adicionar Item' : isEdit ? 'Editar Item' : controller.document.title}
				</Typography>
				<IconButton
					onClick={!isView ? controller.closePage : () => controller.changeToEdit(controller.document._id || '')}>
					{!isView ? <SysIcon name={'close'} /> : <SysIcon name={'edit'} />}
				</IconButton>
			</Header>
			<SysForm
				mode={state as 'create' | 'view' | 'edit'}
				schema={controller.schema}
				doc={controller.document}
				onSubmit={controller.onSubmit}
				loading={controller.loading}>
				<Body>
					<FormColumn>
						<SysTextField name="title" placeholder="Ex.: Item XX" />
						<SysSelectField name="type" placeholder="Selecionar" />
						<SysRadioButton name="typeMulti" childrenAlignment="row" size="small" />
						<SysTextField
							name="description"
							placeholder="Acrescente informações sobre o item (3 linhas)"
							multiline
							rows={3}
							showNumberCharactersTyped
							max={200}
						/>
						<SysUploadFile name="files" />
						<SysSlider name="slider" />
						<SysLocationField name="address" />
					</FormColumn>
					<FormColumn>
						<SysCheckBox name="check" childrenAlignment="row" />
					</FormColumn>
				</Body>
				<Footer>
					{!isView && (
						<Button variant="outlined" startIcon={<SysIcon name={'close'} />} onClick={controller.closePage}>
							Cancelar
						</Button>
					)}
					<SysFormButton>Salvar</SysFormButton>
				</Footer>
			</SysForm>
		</Container>
	);
};

export default ExampleDetailView;
