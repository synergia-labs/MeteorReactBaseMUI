import React, {ElementType} from "react";
import {styled, Box, BoxProps, Paper, PaperProps} from '@mui/material';

interface ICodeViewSysFormStyles {
    container: ElementType<PaperProps & IContainer>;
    header: ElementType<BoxProps & IHeader>;
    body: ElementType<BoxProps>;
}

interface IHeader{
    type: 'schema' | 'docValues';
}

interface IContainer{
    expanded: boolean;
}

const CodeViewSysFormStyles: ICodeViewSysFormStyles = {
    container: styled(Paper)<IContainer>(({theme, expanded}) => ({
        width: expanded ? '80vw' : '50%', 
        height: expanded ? '80vh' : '500px', 
        borderRadius: '12px',
        border: `1px solid ${theme.palette.divider}`,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        position: expanded ? 'absolute' : 'relative',
        zIndex: expanded ? 100 : 'auto',
        top: expanded ? '50%' : 'auto',
        left: expanded ? '50%' : 'auto',
        transform: expanded ? 'translate(-50%, -50%)' : 'none',
        transition: 'width 0.3s, height 0.3s top 0.3s left 0.3s',
    })),
    header: styled(Box)<IHeader>(({theme, type}) => ({
        display: 'flex',
        flexDirection: 'row',
        gap: '1rem',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '8px',
        borderBottom: `2px solid ${theme.palette.divider}`,
        backgroundColor: type === 'schema' ? theme.palette.tertiary?.main : theme.palette.secondary.main,
        color: theme.palette.tertiary?.contrastText,
        transition: 'background-color 0.3s',
    })),
    body: styled(Box)(({theme}) => ({
        padding: '1rem',
        overflowY: 'auto',
        flexGrow: 1,
        backgroundColor: theme.palette.sysBackground?.bg1,
        transition: 'background-color 0.3s',
    })),
}

export default CodeViewSysFormStyles;