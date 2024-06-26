import React from 'react';
import { IShowDialogProps } from '../../SysDialog';
import { Button, DialogActions, DialogTitle } from '@mui/material';
import { confirmDialogStyles } from './confirmDialogStyles';

interface IConfirmDialogProps extends IShowDialogProps {
	showDialog: (options?: IShowDialogProps) => void; // Esse método é obrigatório para todo componente customizado de diálogo.
	closeDialog: (
		event?: {},
		reason?: 'backdropClick' | 'escapeKeyDown',
		callBack?: (event?: {}, reason?: 'backdropClick' | 'escapeKeyDown') => void
	) => void; // Esse método é obrigatório para todo componente customizado de diálogo.
	// Adicione aqui os demais métodos e propriedades que o componente de diálogo precisa.
	onConfirm?: () => void;
}

function ConfirmDialog({ showDialog, closeDialog, onConfirm, title, ...props }: IConfirmDialogProps) {
	showDialog({
		...props,
		sx: confirmDialogStyles.box,
		header: (
			<DialogTitle variant="subtitle1" sx={{ padding: 0 }}>
				{title}
			</DialogTitle>
		),
		actions: (
			<DialogActions sx={confirmDialogStyles.actions}>
				<Button variant="outlined" onClick={closeDialog}>
					Cancelar
				</Button>
				<Button
					variant="contained"
					onClick={() => {
						onConfirm?.();
						closeDialog();
					}}>
					Confirmar
				</Button>
			</DialogActions>
		)
	});
}

export default ConfirmDialog;

/* EXEMPLO DE USO
import React from 'react';
import DeleteDialog from '/imports/ui/appComponents/showDialog/custom/deleteDialog';
import { SysAppLayoutContext } from '/imports/ui/layouts/AppLayout';
import { Button } from '@mui/material';


const seuComponente = () => {
    const {showNotification, showDialog, closeDialog} = React.useContext(SysAppLayoutContext);
    return (
        <Button
            onClick={() => {
                ConfirmDialog({
                    showDialog,
                    closeDialog,
                    title: 'Confirmar cadastro',
                    message: 'Tem certeza que deseja confirmar o cadastro dos dados preenchidos?',
                    onConfirm: () => {
                        showNotification({
                            message: 'Dados salvos!',
                        });
                    }
                });
            }}
        >
            Exbir diálogo de confirmação
        </Button>
    );
}


*/


