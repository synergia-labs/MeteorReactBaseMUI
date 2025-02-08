import React, {ElementType} from 'react';
import Box, {BoxProps} from '@mui/material/Box';
import styled from '@mui/material/styles/styled';
import Avatar, {AvatarProps} from '@mui/material/Avatar';
import { sysSizing } from '../../materialui/styles';


interface IContainer extends BoxProps {
  cursorPointer?: boolean;
  size: 'small' | 'medium' | 'large';
  activateOutline: boolean;
}
interface ISysAvatarStyles {
  container: ElementType<IContainer>;
  avatar: ElementType<AvatarProps>;
}

const SysAvatarStyles: ISysAvatarStyles = {
  container: styled(Box, {
    shouldForwardProp: (prop) => prop !== 'cursorPointer' && prop !== 'size' && prop !== 'activateOutline'
  })<IContainer>(({ theme, cursorPointer, size, activateOutline }) => ({
    width: size === 'small' ? sysSizing.componentsButtonSmallMinHeight : size === 'medium' ? sysSizing.spacingRemXl : sysSizing.componentsButtonMediumMinHeight,
    height: size === 'small' ? sysSizing.componentsButtonSmallMinHeight : size === 'medium' ? sysSizing.spacingRemXl : sysSizing.componentsButtonMediumMinHeight,
    borderRadius: '50%',
    border: !activateOutline ? 'none' : `2px solid ${theme?.palette.common.white}`,
    display: 'flex',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    padding: !activateOutline ? 'none' : sysSizing.spacingFixedXs,
    cursor: cursorPointer ? 'pointer' : 'inherit',
    flexShrink: 0, 
    minWidth: activateOutline ? sysSizing.componentsButtonMediumMinHeight : 'auto',
    minHeight: activateOutline ? sysSizing.componentsButtonMediumMinHeight : 'auto',
    '& .MuiAvatar-root': {
      margin: 0
    }
  })),
  avatar: styled(Avatar)(({theme}) => ({
    width: '100%',
    height: '100%',
    backgroundColor: theme?.palette.primary.dark,
    flexShrink: 0,
    marigin: 0,
    '&:focus': {
      backgroundColor: theme?.palette.sysAction?.primaryContrastText,
      color: theme?.palette.sysAction?.primaryHover,
      outline: 'none'
    }
  }))
};

export default SysAvatarStyles;
