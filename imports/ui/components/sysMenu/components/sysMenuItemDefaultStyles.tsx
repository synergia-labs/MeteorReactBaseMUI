import React, { ElementType } from 'react';
import Box, { BoxProps } from '@mui/material/Box';
import styled from "@mui/material/styles/styled";


interface IStyles{
    container: ElementType<BoxProps>;
}

const SysMenuItemDefaultStyles: IStyles = {
    container: styled(Box)(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        gap: theme.spacing(1),
        transition: 'all 0.3s ease',
        padding: theme.spacing(1),
        borderRadius: theme.shape.borderRadius * 4,
        cursor: 'pointer',
        '& .MuiSvgIcon-root': {
            width: '24px',
            height: '24px',
            color: theme.palette.sysAction?.primary,
        },
        "&:hover": {
            backgroundColor: theme.palette.sysAction?.primaryBgHover,    
        }
    }))
};

export default SysMenuItemDefaultStyles;