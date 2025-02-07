import React from 'react';
import { IShowDialogProps } from '../../showDialog';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import { confirmDialogStyles } from './confirmDialogStyles';
import { IAppLayoutContext } from '/imports/app/appLayoutProvider/appLayoutContext';

interface IConfirmDialogProps extends IShowDialogProps {
	showDialog: IAppLayoutContext['showDialog']; 
	closeDialog: IAppLayoutContext['closeDialog']; 
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


