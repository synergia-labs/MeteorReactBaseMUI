import ExampleRoutes from "./example/routes";
import { IAppMenu, IModuleRoutes, RouteType } from "./modulesTypings";
import Users from "./userprofile/routes";

const pages: Array<RouteType | null> = [...ExampleRoutes.pagesRouterList, ...Users.pagesRouterList];

const menuItens: Array<IAppMenu | null> = [...ExampleRoutes.pagesMenuItemList, ...Users.pagesMenuItemList];

const Modules: IModuleRoutes = {
	pagesMenuItemList: menuItens,
	pagesRouterList: pages
};

export default Modules;
