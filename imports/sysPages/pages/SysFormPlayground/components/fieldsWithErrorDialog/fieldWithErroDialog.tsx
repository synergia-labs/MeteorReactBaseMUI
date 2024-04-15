import { Box, IconButton, Typography } from "@mui/material";
import React from "react";
import FieldsWithErrorDialogStyles from "./fieldsWithErrorDialogStyles";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

interface IFieldsWithErrorsDialog{
    errors : { [key: string]: string };
    closeDialog: () => void;
}

const FieldsWithErrorsDialog : React.FC<IFieldsWithErrorsDialog> = ({errors, closeDialog}) => {
    const hasError = Object.keys(errors).length > 0;
    return (
        <FieldsWithErrorDialogStyles.container>
            <FieldsWithErrorDialogStyles.header>
                <Typography variant="h5">Campos do formulário com erro</Typography>
                <IconButton onClick={closeDialog}>
                    <CloseOutlinedIcon/>
                </IconButton>
            </FieldsWithErrorDialogStyles.header>  
            {!hasError ? (
                <Box sx={{flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <Typography variant="body1" textAlign='center'>Nenhum campo com erro</Typography>
                </Box>
            ): (
                <FieldsWithErrorDialogStyles.body>
                    <pre>{JSON.stringify(errors, null, 2)}</pre>
                </FieldsWithErrorDialogStyles.body>      
            )}
        </FieldsWithErrorDialogStyles.container>
    )
}

export default FieldsWithErrorsDialog;