import React from 'react';
import userprofile from '../userprofile/config';
import example from './example/config';
import pages from '../ui/config/index';


class Modules {
  constructor() {
    // Create modules router list
    this.modulesRouterList = [
      ...pages.pagesRouterList,
      ...userprofile.userprofileRouterList,
      ...example.exampleRouterList,
    ];

    // Create modules App Menu Item list
    this.modulesAppMenuItemList = [
      ...pages.pagesMenuItemList,
      ...userprofile.userprofileMenuItemList,
      ...example.exampleMenuItemList,

    ];
  }

  /**
   * Retonar a rota de todos os módulos
   * registrados na pasta modules
   * @returns {Array}
   */
  getListOfRouterModules = () => {
    return this.modulesRouterList;
  };

  /**
   * Retorna todos os items de menu lateral para os módulos
   * retistrados na pasta modules
   * @returns {Array}
   */
  getAppMenuItemList = () => {
    return this.modulesAppMenuItemList;
  };
}

export default new Modules();

