import React from 'react';
import { pagesRouterList } from './pagesrouters';
import { pagesMenuItemList } from './pagesappmenu';
import { IModuleHub } from '/imports/modules/modulesTypings';

const Pages : IModuleHub  = {
    pagesRouterList,
    pagesMenuItemList
}

export default Pages;