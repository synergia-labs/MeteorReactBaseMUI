import React from 'react';
import UserProfileContainer from '../ui/pages/userprofileContainer';

export const userprofileRouterList = [
  {
    path: '/userprofile/:screenState/:userprofileId',
    component: UserProfileContainer,
    isProtected:true,
  },
  {
    path: '/userprofile/:screenState',
    component: UserProfileContainer,
    isProtected:true,
  },
  {
    path: '/userprofile',
    component: UserProfileContainer,
    isProtected:true,
  },
];
