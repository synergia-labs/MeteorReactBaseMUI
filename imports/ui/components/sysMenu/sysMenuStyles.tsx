import {ElementType} from 'react';
import Menu, { MenuProps } from '@mui/material/Menu';
import Box, {BoxProps} from '@mui/material/Box';
import {styled} from '@mui/material/styles';

interface ISysMenuStyles {
  container: ElementType<MenuProps>;
  menuSlotProps: MenuProps['slotProps'];
  conteudoContainer: ElementType<BoxProps>;
}

const SysMenuStyles: ISysMenuStyles = {
  container: styled(Menu)({
    '& .MuiList-root': { padding: 0 },    
  }),
  menuSlotProps: {
    paper: {
      elevation: 0,
      sx: {
        padding: 0,
        overflow: 'visible',
        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
        mt: 1.5,
        '& .MuiAvatar-root': {
          width: 32,
          height: 32,
          ml: -0.5,
          mr: 1,
        },
        '&::before': {
          content: '""',
          display: 'block',
          position: 'absolute',
          top: 0,
          right: 14,
          width: 10,
          height: 10,
          bgcolor: 'background.paper',
          transform: 'translateY(-50%) rotate(45deg)',
          zIndex: 0,
        },
      },
    },
  },
  conteudoContainer: styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    gap: theme.spacing(1),
    padding: theme.spacing(1),
    minWidth: '250px',
  })),
};

export default SysMenuStyles;
