import React, { useContext } from 'react';
import Styles from './exampleDetailStyles';
import Context, { IExampleDetailContext } from './exampleDetailContext';
import EnumExampleScreenState from '../../../common/enums/enumScreenState';
import SysIcon from '/imports/ui/components/sysIcon/sysIcon';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SysForm from '/imports/ui/components/sysForm/sysForm';
import SysTextField from '/imports/ui/components/sysFormFields/sysTextField/sysTextField';
import { SysSelectField } from '/imports/ui/components/sysFormFields/sysSelectField/sysSelectField';
import { SysRadioButton } from '/imports/ui/components/sysFormFields/sysRadioButton/sysRadioButton';
import SysSlider from '/imports/ui/components/sysFormFields/sysSlider/sysSliderField';
import { SysLocationField } from '/imports/ui/components/sysFormFields/sysLocationField/sysLocationField';
import { SysCheckBox } from '/imports/ui/components/sysFormFields/sysCheckBoxField/sysCheckBoxField';
import Button from '@mui/material/Button';
import SysFormButton from '/imports/ui/components/sysFormFields/sysFormButton/sysFormButton';
import ExampleModuleContext, { IExampleModuleContext } from '../../exampleContext';
import SysUploadFile from '/imports/ui/components/sysFormFields/sysUploadFile/sysUploadFile';

const ExampleDetailView: React.FC = () => {
	const context = useContext<IExampleDetailContext>(Context);
	const { state } = useContext<IExampleModuleContext>(ExampleModuleContext);

	const isView = state == EnumExampleScreenState.VIEW;
	const isEdit = state == EnumExampleScreenState.EDIT;
	const isCreate = state == EnumExampleScreenState.CREATE;

	return (
		<Styles.container>
			<Styles.header>
				{isView && (
					<IconButton onClick={context.closePage}>
						<SysIcon name={'arrowBack'} />
					</IconButton>
				)}
				<Typography variant="h5" sx={{ flexGrow: 1 }}>
					{isCreate ? 'Adicionar Item' : isEdit ? 'Editar Item' : context.document.title}
				</Typography>
				<IconButton onClick={!isView ? context.closePage : () => context.changeToEdit(context.document?._id || '')}>
					{!isView ? <SysIcon name={'close'} /> : <SysIcon name={'edit'} />}
				</IconButton>
			</Styles.header>
			<SysForm mode={state} schema={{}} doc={context.document} onSubmit={context.onSubmit} loading={context.loading}>
				<Styles.body>
					<Styles.formColumn>
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
					</Styles.formColumn>
					<Styles.formColumn>
						<SysCheckBox name="check" childrenAlignment="row" />
						<SysSlider name="slider" />
						<SysLocationField name="address" />
					</Styles.formColumn>
				</Styles.body>
				<Styles.footer>
					{!isView && (
						<Button variant="outlined" startIcon={<SysIcon name={'close'} />} onClick={context.closePage}>
							Cancelar
						</Button>
					)}
					<SysFormButton>Salvar</SysFormButton>
				</Styles.footer>
			</SysForm>
		</Styles.container>
	);
};

export default ExampleDetailView;
