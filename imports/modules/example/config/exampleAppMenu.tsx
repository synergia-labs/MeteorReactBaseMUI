import React from 'react';
import Class from '@mui/icons-material/Class';
import { IAppMenu } from '/imports/modules/modulesTypings';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
export const exampleMenuItemList: (IAppMenu | null)[] = [
    {
        path: '/example',
        name: 'Exemplo',
        icon: <DashboardOutlinedIcon />,
    },
];
