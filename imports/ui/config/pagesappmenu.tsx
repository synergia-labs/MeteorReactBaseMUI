import React from 'react';
import {isMobile} from '/imports/libs/deviceVerify';
import Home from '@mui/icons-material/Home';

export const pagesMenuItemList = [
  isMobile ? {
    path: '/',
    name: 'Home',
    icon: <Home/>,
  } : null,
  // {
  //   path: '/signin',
  //   name: 'SingIn',
  //   icon: <i className="wheelchair icon"></i>,
  // },
  // {
  //   path: '/signup',
  //   name: 'SingUp',
  //   icon: <i className="wheelchair icon"></i>,
  // },
  // {
  //   path: '/account',
  //   name: 'Account',
  //   icon: <i className="wheelchair icon"></i>,
  // },
  // {
  //   path: '/settings',
  //   name: 'Settings',
  //   icon: <i className="wheelchair icon"></i>,
  // },
  // {
  //   path: '/signout',
  //   name: 'SingOut',
  //   icon: <i className="wheelchair icon"></i>,
  // }

].filter(x => !!x);
