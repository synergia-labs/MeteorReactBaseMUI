import React from 'react';
import Home from '@mui/icons-material/Home';
import { IAppMenu } from '/imports/modules/modulesTypings';

export const pagesMenuItemList : (IAppMenu | null)[] = [
    {
        path: '/',
        name: 'Home',
        icon: <Home />,
    },
];
