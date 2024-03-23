import React, {ElementType} from "react";
import { styled, Box, BoxProps, Paper, PaperProps } from "@mui/material";
import { sysSizing } from "/imports/ui/materialui/styles";

interface ISysFormTestsStyles {
    container: ElementType<BoxProps>;
    header: ElementType<BoxProps>;
    schemaAndValues: ElementType<BoxProps>;
    codeContainer: ElementType<PaperProps>;
    codeContainerHeader: ElementType<BoxProps>;
    codeContainerContent: ElementType<BoxProps>;
    controllersContainer: ElementType<BoxProps>;
    sysFormContainer: ElementType<BoxProps>;
}

const SysFormTestsStyles: ISysFormTestsStyles = {
    container: styled(Box)({
        display: 'flex',
        flexDirection: 'column',
        padding: `${sysSizing.contentPt} ${sysSizing.contentPx}`,
        gap: '1rem',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',    
    }),
    header: styled(Box)({
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginBottom: '1rem',
    }),
    schemaAndValues: styled(Box)({
        display: 'flex',
        flexDirection: 'row',
        gap: '1rem',
        width: '100%',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    }),
    codeContainer: styled(Paper)(({theme}) => ({
        width: '50%',
        height: '500px',
        borderRadius: '12px',
        border: `1px solid ${theme.palette.divider}`,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
    })),
    codeContainerHeader: styled(Box)(({theme}) => ({
        display: 'flex',
        flexDirection: 'row',
        gap: '1rem',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '8px',
        borderBottom: `2px solid ${theme.palette.divider}`,
        backgroundColor: theme.palette.tertiary?.main,
        color: theme.palette.tertiary?.contrastText,
    })),
    codeContainerContent: styled(Box)(({theme}) => ({
        padding: '1rem',
        overflowY: 'auto',
        flexGrow: 1,
        backgroundColor: theme.palette.sysBackground?.bg1,
    })),
    controllersContainer: styled(Box)({
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    }),
    sysFormContainer: styled(Box)({
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        width: '100%',
    }),
};

export default SysFormTestsStyles;