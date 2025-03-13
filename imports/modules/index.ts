import { IAppMenu, IModuleRoutes, IRoute } from './modulesTypings';
import Example from './example/config';
import Aniversario from './aniversario/config';

const pages: Array<IRoute | null> = [
	...Example.pagesRouterList, 
	...Aniversario.pagesRouterList, 
];

const menuItens: Array<IAppMenu | null> = [
	...Example.pagesMenuItemList, 
	...Aniversario.pagesMenuItemList,
];

const Modules: IModuleRoutes = {
	pagesMenuItemList: menuItens,
	pagesRouterList: pages
};

export default Modules;
