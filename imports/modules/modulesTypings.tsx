import React from 'react';

export interface IAppMenu{
  path?: string;
  name?: string;
  isProtected?: boolean;
  icon?: React.ReactFragment;  
}

export interface IRoute{
  path?: string;
  component?: React.ReactFragment;
  isProtected?: boolean;
  exact?: string | undefined;
}

export interface IModules{
  modulesRouterList: (IRoute | null)[];
  modulesAppMenuItemList: (IAppMenu | null)[];
}
