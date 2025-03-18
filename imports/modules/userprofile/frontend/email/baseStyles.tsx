import React, { ElementType } from 'react';
import Box, { BoxProps } from '@mui/material/Box';
import styled from '@mui/material/styles/styled';

interface IStyles {
    container: ElementType<BoxProps>;
}

const baseStyles: IStyles = {
    container: styled(Box)(({ theme }) => ({
        backgroundColor: 'blue',
        color: 'red',
    }))
};

export default baseStyles;