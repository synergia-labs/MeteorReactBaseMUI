import React from 'react';
import { IShowDialogProps } from '../../showDialog';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { deleteDialogStyles } from './deleteDialogStyles';
import { IAppLayoutContext } from '/imports/app/appLayoutProvider/appLayoutContext';

interface IDeleteDialogProps extends IShowDialogProps {
	showDialog: IAppLayoutContext['showDialog']
	closeDialog: IAppLayoutContext['closeDialog']
	onDeleteConfirm?: () => void;
}

function DeleteDialog({ showDialog, closeDialog, onDeleteConfirm, title, ...props }: IDeleteDialogProps) {
	showDialog({
		...props,
		sx: deleteDialogStyles.box,
		header: (
			<DialogTitle variant="subtitle1" sx={{ padding: 0 }}>
				{title}
			</DialogTitle>
		),
		actions: (
			<DialogActions sx={deleteDialogStyles.actions}>
				<Button variant="outlined" onClick={closeDialog}>
					Cancelar
				</Button>
				<Button
					variant="contained"
					onClick={() => {
						onDeleteConfirm?.();
						closeDialog();
					}}>
					Excluir
				</Button>
			</DialogActions>
		)
	});
}

export default DeleteDialog;

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
                DeleteDialog({
                    showDialog,
                    closeDialog,
                    title: 'Tem certeza que deseja excluir?',
                    message: 'Esta ação não poderá ser desfeita.',
                    onDeleteConfirm: () => {
                        showNotification({
                            message: 'Excluído com sucesso!',
                        });
                    }
                })
            }}
        >
            Exbir diálogo de exclusão
        </Button>
    );
}


*/


