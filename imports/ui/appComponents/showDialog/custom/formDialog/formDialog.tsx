import React, { ReactNode } from 'react';
import { IShowDialogProps } from '../../showDialog';
import { Button, DialogActions, DialogTitle } from '@mui/material';
import { formDialogStyles } from './formDialogStyles';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

interface IFormDialogProps extends IShowDialogProps {
	showDialog: (options?: IShowDialogProps) => void; // Esse método é obrigatório para todo componente customizado de diálogo.
	closeDialog: (
		event?: {},
		reason?: 'backdropClick' | 'escapeKeyDown',
		callBack?: (event?: {}, reason?: 'backdropClick' | 'escapeKeyDown') => void
	) => void; // Esse método é obrigatório para todo componente customizado de diálogo.
	// Adicione aqui os demais métodos e propriedades que o componente de diálogo precisa.
	onSubmit?: () => void;
	form?: ReactNode;
}

function FormDialog({ showDialog, closeDialog, onSubmit, title, form, ...props }: IFormDialogProps) {
	showDialog({
		...props,
		sx: formDialogStyles.box,
		header: (
			<DialogTitle variant="subtitle1" sx={{ padding: 0 }}>
				{title}
			</DialogTitle>
		),
		body: form,
		actions: (
			<DialogActions sx={formDialogStyles.actions}>
				<Button variant="outlined" startIcon={<CloseIcon />} onClick={closeDialog}>
					Cancelar
				</Button>
				<Button
					startIcon={<CheckIcon />}
					type="submit"
					variant="contained"
					onClick={() => {
						onSubmit?.();
					}}>
					Salvar
				</Button>
			</DialogActions>
		)
	});
}

export default FormDialog;
