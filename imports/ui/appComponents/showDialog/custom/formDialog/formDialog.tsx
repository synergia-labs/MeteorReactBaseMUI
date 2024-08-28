import React, { ReactNode } from 'react';
import { IShowDialogProps } from '../../showDialog';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { formDialogStyles } from './formDialogStyles';
import SysIcon from '/imports/ui/components/sysIcon/sysIcon';

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
				<Button variant="outlined" startIcon={<SysIcon name={'close'} />} onClick={closeDialog}>
					Cancelar
				</Button>
				<Button
					startIcon={<SysIcon name={'check'} />}
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
