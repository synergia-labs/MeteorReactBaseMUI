import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import React from 'react';
import FieldsWithErrorDialogStyles from './fieldsWithErrorDialogStyles';
import SysIcon from '/imports/ui/components/sysIcon/sysIcon';

interface IFieldsWithErrorsDialog {
	errors: { [key: string]: string };
	closeDialog: () => void;
}

const FieldsWithErrorsDialog: React.FC<IFieldsWithErrorsDialog> = ({ errors, closeDialog }) => {
	const hasError = Object.keys(errors).length > 0;
  const { Container, Body, Header, } = FieldsWithErrorDialogStyles;

	return (
		<Container>
			<Header>
				<Typography variant="h5">Campos do formulário com erro</Typography>
				<IconButton onClick={closeDialog}>
					<SysIcon name={'close'} />
				</IconButton>
			</Header>
			{!hasError ? (
				<Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
					<Typography variant="body1" textAlign="center">
						Nenhum campo com erro
					</Typography>
				</Box>
			) : (
				<Body>
					<pre>{JSON.stringify(errors, null, 2)}</pre>
				</Body>
			)}
		</Container>
	);
};

export default FieldsWithErrorsDialog;
