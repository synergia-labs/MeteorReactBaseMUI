import { ElementType } from 'react';
import  Box, {BoxProps } from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { sysSizing } from '../../materialui/styles';

interface ISysMenuStyles {
	Container: ElementType<BoxProps>;
}

const SysMenuStyles: ISysMenuStyles = {
	Container: styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: `${sysSizing.spacingFixedMd}`,
    minWidth: sysSizing.menuMinWidth
	})
};

export default SysMenuStyles;
