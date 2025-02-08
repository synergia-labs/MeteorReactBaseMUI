import React, { ReactNode } from 'react';
import { ISysMenuItem } from '../sysMenuProvider';
import Styles from './sysMenuItemDefaultStyles';
import { Typography } from '@mui/material';

interface ISysMenuItemDefault extends ISysMenuItem {
    startIcon?: ReactNode;
    endIcon?: ReactNode;
    label?: ReactNode;
}

const SysMenuItemDefault: React.FC<ISysMenuItemDefault> = ({
    startIcon,
    endIcon,
    label,
    onClick
}) => {
    return (
        <Styles.container onClick={onClick}>
            {startIcon && startIcon}
            <Typography variant="body1">{label}</Typography>
            {endIcon && endIcon}
        </Styles.container>
    );
}

export default SysMenuItemDefault;