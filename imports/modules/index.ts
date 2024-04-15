import { IModuleHub } from './modulesTypings';
import Example from './example/config';

const pages = [ 
    ...Example.pagesRouterList,
];

const menuItens = [
    ...Example.pagesMenuItemList,
];

const Modules: IModuleHub = {
    pagesMenuItemList: menuItens,
    pagesRouterList: pages,
};

export default Modules;
