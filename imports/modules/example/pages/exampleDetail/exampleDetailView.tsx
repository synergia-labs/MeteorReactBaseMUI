import React, { useContext } from "react"
import Styles from './exampleDetailStyles';
import Typography from '@mui/material/Typography';
import { ExampleModuleContext, IExampleModuleContext } from "../../exampleContainer";
import SysIcon from "/imports/ui/components/sysIcon/sysIcon";
import IconButton from '@mui/material/IconButton';
import ExampleDetailContext, { IExampleDetailContext } from "./exampleDetailContext";
import Box from '@mui/material/Box';
import { SysLoading } from "/imports/ui/components/sysLoading/sysLoading";
import SysForm from "/imports/ui/components/sysForm/sysForm";
import { exampleSch } from "../../api/exampleSch";
import { SysSelectField } from "/imports/ui/components/sysFormFields/sysSelectField/sysSelectField";
import SysTextField from "/imports/ui/components/sysFormFields/sysTextField/sysTextField";
import { SysCheckBox } from "/imports/ui/components/sysFormFields/sysCheckBoxField/sysCheckBoxField";
import { SysRadioButton } from "/imports/ui/components/sysFormFields/sysRadioButton/sysRadioButton";
import Button from '@mui/material/Button';
import SysFormButton from "/imports/ui/components/sysFormFields/sysFormButton/sysFormButton";

const ExampleDetailView: React.FC = () => {
	const { state } = useContext<IExampleModuleContext>(ExampleModuleContext);
	const context = useContext<IExampleDetailContext>(ExampleDetailContext);

	if(context.loading) return <SysLoading />;

	return (
		<Styles.container>
			<Styles.header>
				{state == 'view' &&
					<IconButton onClick={context.closePage}>
						<SysIcon name='arrowBack' />
					</IconButton>
				}
				<Typography variant='h5'> 
					{state == 'view' ? `Item ${context.document?.title}` : `${state == 'edit' ? 'Editar' : 'Adicionar'} item`}
				</Typography>
				<Box sx={{ flexGrow: 1 }} />
				<IconButton onClick={state == 'view' ? context.navigateToEdit : context.closePage}>
					<SysIcon name={ state == 'view' ? 'edit' : 'close' } />
				</IconButton>
			</Styles.header>
			<SysForm
				schema={exampleSch}
				doc={context.document}
				mode={state as 'view' | 'edit' | 'create'}
				onSubmit={context.onSubmit}
			>
				<Styles.body>
					<Styles.formColumn>
						<SysTextField name='title' />
						<SysSelectField name='type' />
						<SysTextField
							name="description"
							multiline
							rows={3}
							showNumberCharactersTyped
							max={200}
						/>
					</Styles.formColumn>
					<Styles.formColumn>
						<SysRadioButton name='typeMulti' />
						<SysCheckBox name="check" childrenAlignment="row" />
					</Styles.formColumn>
				</Styles.body>
				<Styles.footer>
					{state !== 'view' && (<Button
						variant="outlined"
						startIcon={<SysIcon name='close' />}
						onClick={context.closePage}
					>
						Cancelar
					</Button>)}
					<SysFormButton startIcon={<SysIcon name='check' />}>
						Salvar
					</SysFormButton>
				</Styles.footer>
			</SysForm>
		</Styles.container>
	);
}

export default ExampleDetailView;