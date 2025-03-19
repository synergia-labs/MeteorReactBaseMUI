import React, { ElementType } from 'react';
import Box, { BoxProps } from '@mui/material/Box';
import styled from '@mui/material/styles/styled';

interface IStyles {
    container: ElementType<BoxProps>;
}

const usersListStyles: IStyles = {
    container: styled(Box)(({ theme }) => ({
        padding: theme.spacing(20),
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
    }))
}

export default usersListStyles;