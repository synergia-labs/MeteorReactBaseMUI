// @ts-ignore
import React from 'react';
import Home from '../pages/Home/Home';
import Signin from '../pages/SignIn/Signin';
import Signup from '../pages/SignUp/Signup';
import Signout from '../pages/SignOut/Signout';
import EnrollAccount from '../pages/EnrollAccount/EnrollAccount';
import EmailVerify from '../pages/EmailVerify/EmailVerify';
import RecoveryPassword
  from '/imports/ui/pages/RecoveryPassword/RecoveryPassword';
import ResetPassword from '/imports/ui/pages/ResetPassword/ResetPassword';
import asyncComponent from '/imports/libs/asyncComponent';

const DevUtils = asyncComponent(() => {
  return import('../pages/DevUtils/DevUtils');
});

export const pagesRouterList = [
  {
    path: '/',
    exact: true,
    component: Home,
    isProtected: false,
  },
  {
    path: '/signin',
    component: Signin,
    isProtected: false,
  },
  {
    path: '/signup',
    component: Signup,
    isProtected: false,
  },
  {
    path: '/signout',
    component: Signout,
    isProtected: true,
  },
  {
    path: '/recovery-password',
    component: RecoveryPassword,
  },
  {
    path: '/reset-password/:token',
    component: ResetPassword,
  },
  {
    path: '/enroll-account/:token',
    component: EnrollAccount,
  },
  {
    path: '/verify-email/:token',
    component: EmailVerify,
  },
  !Meteor.isProduction ?
      {
        path: '/devUtils',
        component: DevUtils,
      }
      : null,
];
