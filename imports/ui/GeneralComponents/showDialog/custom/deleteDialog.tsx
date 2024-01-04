import React from "react";
import { IShowDialogProps } from "../showDialog";
import { SysButton } from "/imports/ui/components/SimpleFormFields/SysButton/SysButton";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

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
    ...props
}: IDeleteDialogProps){
    
    showDialog({
        ...props,
        prefixIcon: <HighlightOffIcon />,
        actions: (
            <>
                <SysButton styleVariant="none" onClick={closeDialog}>
                    Cancelar
                </SysButton>
                <SysButton styleVariant="primary" onClick={() => {
                    onDeleteConfirm?.();
                    closeDialog();
                }}>
                    Confirmar
                </SysButton>
            </>
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