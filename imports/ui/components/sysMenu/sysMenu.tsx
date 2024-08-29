import React, { ForwardRefRenderFunction, ReactNode, forwardRef, useImperativeHandle, useState } from 'react';
import { Menu, MenuProps, SxProps, Theme, Typography } from '@mui/material';
import SysMenuStyles from './sysMenuStyles';
import MenuItem from "@mui/material/MenuItem";

interface IMenuItem {
  key?: string;
  id?: string;
  icon?: ReactNode;
  text: string;
  action?: ReactNode;
  onClick?: () => void;
}

interface SysMenuProps extends Omit<MenuProps, 'open' | 'onClose' | 'anchorEl'> {
  options?: Array<IMenuItem>;
  header?: ReactNode;
  footer?: ReactNode;
  sxMap?: {
    container?: SxProps<Theme>;
    menuItem?: SxProps<Theme>;
  };
}

interface SysMenuRef {
  handleClose: () => void;
  handleOpen: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const SysMenu: ForwardRefRenderFunction<SysMenuRef, SysMenuProps> = ({
  header,
  footer,
  options,
  children,
  sxMap,
  ...otherProps
}, ref) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  useImperativeHandle(ref, () => ({
    handleClose: handleClose,
    handleOpen: handleOpen
  }), []);

  const { Container } = SysMenuStyles;

  return (
    <Menu
      {...otherProps}
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
    >
      {
        children || (
          <Container sx={sxMap?.container}>
            {header}
            {options?.map((item, index) => (
              <MenuItem
                key={item.key ?? index}
                onClick={item.onClick}
                sx={sxMap?.menuItem}
                id={item.id}
              >
                {item.icon}
                <Typography variant="body1" sx={{ flexGrow: 1 }}>{item.text}</Typography>
                {item.action}
              </MenuItem>
            ))}
            {footer}
          </Container>
        )
      }
    </Menu>
  );
};

export type { SysMenuRef, IMenuItem };
export default forwardRef(SysMenu);
