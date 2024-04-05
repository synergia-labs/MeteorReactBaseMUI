import React, {ElementType} from "react";
import { styled, Box, BoxProps } from "@mui/material";
import { sysSizing } from "/imports/ui/materialui/styles";

interface ISysFormTestsStyles {
    container: ElementType<BoxProps>;
    header: ElementType<BoxProps>;
    schemaAndValues: ElementType<BoxProps>;
    controllersContainer: ElementType<BoxProps>;
    sysFormContainer: ElementType<BoxProps>;
    erroContainer: ElementType<BoxProps>;
}

const SysFormTestsStyles: ISysFormTestsStyles = {
    container: styled(Box)(({theme}) => ({
        display: 'flex',
        flexDirection: 'column',
        padding: `${sysSizing.contentPt} ${sysSizing.contentPx}`,
        gap: '1rem',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        transition: 'all 0.3s ease',
        [theme.breakpoints.down('sm')]: {
            padding: `${sysSizing.contentPt} ${sysSizing.spacingFixedMd}`,
        }   
    })),
    header: styled(Box)({
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginBottom: '1rem',
    }),
    schemaAndValues: styled(Box)(({theme}) => ({
        display: 'flex',
        flexDirection: 'row',
        gap: '1rem',
        width: '100%',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        [theme.breakpoints.down('lg')]: {
            flexDirection: 'column',
            alignItems: 'center',
        }
    })),
    controllersContainer: styled(Box)(({theme}) => ({
        display: 'flex',
        flexDirection: 'row',
        gap: '1rem',
        alignItems: 'flex-start',
        justifyContent: 'justify-start',
        width: '100%',
        flexWrap: 'wrap',
        backgroundColor: theme.palette.sysBackground?.bg3,
        padding: theme.spacing(2),
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: '10px',
    })),
    sysFormContainer: styled(Box)({
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        width: '100%',
    }),
    erroContainer: styled(Box)({
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        width: '100%',
        padding: '1rem',
    }),

};

export default SysFormTestsStyles;