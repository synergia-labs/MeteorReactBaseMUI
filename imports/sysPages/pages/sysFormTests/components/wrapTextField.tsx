import React from "react";
import SysTextField, { ISysTextFieldProps } from "/imports/ui/components/sysFormFields/sysTextField/sysTextField";
import { Box, Button, Typography, styled } from "@mui/material";
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';

const Container = styled(Box)({
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    gap: '1rem',
});

const ButtonContainer = styled(Button)({
    display: 'flex',
    flexDirection: 'column',
    width: '50px',
    gap: '5px',
});

interface IWrapTextField extends ISysTextFieldProps{
    isVisibled: boolean;
    onClick: () => void;
}

const WrapTextField : React.FC<IWrapTextField> = ({
    isVisibled = true,
    onClick,
    ...props
}) => {
    if(!isVisibled) return null;
    return (
        <Container>
            <SysTextField {...props} />
            <ButtonContainer color="warning" onClick={onClick}>
                <FileDownloadDoneIcon />
                <Typography
                    variant="caption"
                >Validar</Typography>
            </ButtonContainer>
        </Container>
    );
};

export default WrapTextField;
