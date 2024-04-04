import React, { ForwardRefRenderFunction, ReactNode, forwardRef, useImperativeHandle, useState } from 'react';
import { ListItemText, Menu, MenuItem, MenuProps, SxProps, Theme, Typography } from '@mui/material';
import SysMenuStyles from './sysMenuStyles';

interface IList {
    key?: string;
    id?: string;
    icon?: ReactNode;
    text: string;
    action?: ReactNode;
    onClick?: () => void; 
}

interface SysMenuProps extends Omit<MenuProps, 'open' | 'onClose' | 'anchorEl'>{
    accountMenu?: boolean;
    options?: Array<IList>;
    title?: string;
    header?: ReactNode;
    footer?: ReactNode;
    sxMap?:{
        container?: SxProps<Theme>;
        menuItem?: SxProps<Theme>;
    }
}

interface SysMenuRef {
    handleClose: () => void;
    handleOpen: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const SysMenu: ForwardRefRenderFunction<SysMenuRef, SysMenuProps> = ({
    anchorOrigin = {
        vertical: 'bottom',
        horizontal: 'right'
    },
    transformOrigin = {
        vertical: 'top',
        horizontal: 'right'
    },
    accountMenu = false,
    title, 
    header,
    footer,
    options,
    children,
    sxMap,
    ...otherProps
}, ref) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    
    const handleOpen  = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);
  
    useImperativeHandle(ref, () => ({
        handleClose: handleClose,
        handleOpen : handleOpen
    }), []);


	return (
        <Menu
            {...otherProps}            
            id='menu-boilerplate'
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
                'aria-labelledby': 'basic-button',
            }}
            anchorOrigin={anchorOrigin}
            transformOrigin={transformOrigin}
            PaperProps={otherProps.PaperProps ?? ( accountMenu ? {...SysMenuStyles.menuAccountStyles} : {})}
        >
            {
                children || (
                    <SysMenuStyles.container sx={sxMap?.container}>
                        {header || (title && <Typography variant='subtitle1'>{title}</Typography>)}
                        {options?.map((item, index) => (
                            <SysMenuStyles.menuItem
                                key={index}
                                onClick={item.onClick}
                                sx={sxMap?.menuItem}
                            >
                                {item.icon}
                                <Typography variant='body1' sx={{flexGrow: 1}}>{item.text}</Typography>
                                {item.action}
                            </SysMenuStyles.menuItem>
                        ))}
                    </SysMenuStyles.container>
                )
            }
        </Menu>
    )
};

export type { SysMenuRef };
export default forwardRef(SysMenu);