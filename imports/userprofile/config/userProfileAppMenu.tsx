import React from 'react'
import Person from '@mui/icons-material/Person'
import { IAppMenu } from '/imports/modules/modulesTypings'

export const userProfileMenuItemList: (IAppMenu | null)[] = [
    {
        path: '/userprofile',
        name: 'Usuários',
        icon: <Person />,
    },
]
