import React from "react";
import { IShowDialogProps } from "../../SysDialog";
import { Button, DialogActions, DialogTitle } from "@mui/material";
import { deleteDialogStyles } from "./deleteDialogStyles";

interface IDeleteDialogProps extends IShowDialogProps {
    showDialog: (options?: IShowDialogProps) => void; // Esse método é obrigatório para todo componente customizado de diálogo.
	closeDialog: (
		event?: {}, 
		reason?: "backdropClick" | "escapeKeyDown", 
		callBack?: (event?: {}, reason?: "backdropClick" | "escapeKeyDown") => void
	) => void; // Esse método é obrigatório para todo componente customizado de diálogo.
    // Adicione aqui os demais métodos e propriedades que o componente de diálogo precisa.
    onDeleteConfirm?: () => void;
}

function DeleteDialog({
    showDialog,
    closeDialog,
    onDeleteConfirm,
    title,
    ...props
}: IDeleteDialogProps){
    
    showDialog({
        ...props,
        sx: deleteDialogStyles.box,
        header:(
            <DialogTitle variant="subtitle1" sx={{padding: 0}}>
                {title}
            </DialogTitle>
        ),
        actions: (
            <DialogActions sx={deleteDialogStyles.actions}>
                <Button variant="outlined" onClick={closeDialog}>
                    Cancelar
                </Button>
                <Button variant="contained" onClick={() => {
                    onDeleteConfirm?.();
                    closeDialog();
                }}>
                    Excluir
                </Button>
            </DialogActions>
        )
    });
};

export default DeleteDialog;

/* EXEMPLO DE USO
import React from 'react';
import DeleteDialog from '/imports/ui/GeneralComponents/showDialog/custom/deleteDialog';
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


