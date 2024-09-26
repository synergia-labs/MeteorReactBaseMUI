import { IModuleHub } from './modulesTypings';
import Example from './example/config';
import Aniversario from './aniversario/config';

const pages = [...Example.pagesRouterList, ...Aniversario.pagesRouterList];

const menuItens = [...Example.pagesMenuItemList, ...Aniversario.pagesMenuItemList];

const Modules: IModuleHub = {
	pagesMenuItemList: menuItens,
	pagesRouterList: pages
};

export default Modules;
