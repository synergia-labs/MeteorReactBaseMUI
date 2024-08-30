import React, { useContext } from 'react';
import { AniversarioDetailControllerContext } from './aniversarioDetailContoller';
import { AniversarioModuleContext } from '../../aniversarioContainer';
import AniversarioDetailStyles from './aniversarioDetailStyles';
import SysForm from '/imports/ui/components/sysForm/sysForm';
import SysTextField from '/imports/ui/components/sysFormFields/sysTextField/sysTextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { SysSelectField } from '/imports/ui/components/sysFormFields/sysSelectField/sysSelectField';
import { SysCheckBox } from '/imports/ui/components/sysFormFields/sysCheckBoxField/sysCheckBoxField';
import SysFormButton from '/imports/ui/components/sysFormFields/sysFormButton/sysFormButton';
import SysIcon from '/imports/ui/components/sysIcon/sysIcon';
import {SysDatePickerField} from "/imports/ui/components/sysFormFields/sysDatePickerField/sysDatePickerField";

const AniversarioDetailView = () => {
	const controller = useContext(AniversarioDetailControllerContext);
	const { state } = useContext(AniversarioModuleContext);
	const isView = state === 'view';
	const isEdit = state === 'edit';
	const isCreate = state === 'create';
  const {
    Container,
    Body,
    Header,
    Footer,
    FormColumn,
    Image
  } = AniversarioDetailStyles;

	return (
		<Container>
			<Header>
				{isView && (
					<IconButton onClick={controller.closePage}>
						<SysIcon name={'arrowBack'} />
					</IconButton>
				)}
				<Typography variant="h5" sx={{ flexGrow: 1 }}>
					{isCreate ? 'Adicionar aniversário' : isEdit ? 'Editar aniversário' : 'Detalhes do aniversário'}
				</Typography>
				<IconButton
					onClick={!isView ? controller.closePage : () => controller.changeToEdit(controller.document._id || '')}>
					{!isView ? <SysIcon name={'close'} /> : <SysIcon name={'edit'} />}
				</IconButton>
			</Header>
			<SysForm
				mode={state}
				schema={controller.schema}
				doc={controller.document}
				onSubmit={controller.onSubmit}
				loading={controller.loading}>
				<Body>
					<FormColumn>
						<SysTextField name={'name'} placeholder={'Ex.: Davi Esteves'} />
            <SysDatePickerField name={'birthday'} />
            <SysTextField name={'phone'} placeholder={'Ex.: (31) 99999-9999'} />
            <SysCheckBox name={'remember'} />
            <SysSelectField name={'delivery'} placeholder={'Selecionar'}/>
					</FormColumn>
          <FormColumn>
            <Image src={'/images/img-motivacional.svg'} />
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

export default AniversarioDetailView;
