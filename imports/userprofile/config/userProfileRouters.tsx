import React from 'react';
import UserProfileContainer from '../ui/pages/userProfileContainer';
import { IRoute } from '/imports/modules/modulesTypings';

export const userProfileRouterList: (IRoute | null)[] = [
    {
        path: '/userprofile/:screenState/:userprofileId',
        component: UserProfileContainer,
        isProtected: true,
    },
    {
        path: '/userprofile/:screenState',
        component: UserProfileContainer,
        isProtected: true,
    },
    {
        path: '/userprofile',
        component: UserProfileContainer,
        isProtected: true,
    },
];
