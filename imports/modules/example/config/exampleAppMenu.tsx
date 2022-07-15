import React from 'react'
import Class from '@mui/icons-material/Class'
import { IAppMenu } from '/imports/modules/modulesTypings'

export const exampleMenuItemList: (IAppMenu | null)[] = [
    {
        path: '/example',
        name: 'Exemplos',
        icon: <Class />,
    },
]
