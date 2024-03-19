import React from 'react';
import { IAppMenu } from '/imports/modules/modulesTypings';
import Home from '@mui/icons-material/Home';
import ScienceIcon from '@mui/icons-material/Science';

export const pagesMenuItemList : (IAppMenu | null)[] = [
    {
        path: '/',
        name: 'Home',
        icon: <Home />,
    },
    {
        path: '/sysFormTests',
        name: 'SysFormTests',
        icon: <ScienceIcon />,
    }
];
