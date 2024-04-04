import React from 'react';
import { IAppMenu } from '/imports/modules/modulesTypings';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';

export const userProfileMenuItemList: (IAppMenu | null)[] = [
    {
        path: '/userprofile',
        name: 'Usuários',
        icon: <GroupsOutlinedIcon />,
    },
];
