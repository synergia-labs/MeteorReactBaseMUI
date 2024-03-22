import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { exampleSch } from '/imports/modules/example/api/exampleSch';
import SysForm from '/imports/ui/components/sysForm/sysForm';
import { SysTextField } from '/imports/ui/components/sysFormFields/sysTextField/sysTextField';
import SysFormButton from '/imports/ui/components/sysFormFields/sysFormButton/sysFormButton';

const SysFormTestsPage: React.FC = () => {
	const [dados, setDados] = React.useState<any>('');

	const handleChangeData = (e: React.ChangeEvent<HTMLInputElement>) => {
		setDados(e.target.value);
	};
	return (
		<Box
			sx={{
				width: '100%',
				maxWidth: '750px',
				margin: '0 auto',
				padding: '10px 40px',
				display: 'flex',
				flexDirection: 'column',
				gap: 2
			}}>
			<SysForm schema={exampleSch} doc={{}} mode="create" onSubmit={() => {}} onChange={(doc) => {setDados(doc)}}>
				<Typography variant="h3">SysForm Tests</Typography>
				<code style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(dados, null, 2)}</code>

				<SysTextField name="type" />
				<SysTextField name="title" />
				<SysTextField name="typeMulti" />

				

				<Box
					sx={(theme) => ({
						backgroundColor: theme.palette.sysBackground?.bg2,
						padding: theme.spacing(2),
						borderRadius: '5px',
						display: 'flex',
						flexDirection: 'column',
						gap: theme.spacing(2)
					})}>
					<Typography variant="h5">SubForm</Typography>
					<SysTextField name="contacts.cpf" />
					<SysTextField name="contacts.phone" />
				</Box>

				<SysFormButton sx={{ alignSelf: 'flex-end' }}>Submit</SysFormButton>
			</SysForm>
		</Box>
	);
};

export default SysFormTestsPage;
