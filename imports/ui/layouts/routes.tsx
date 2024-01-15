import Modules     from '../../modules';
import Pages       from '../config';
import UserProfile from '../../userprofile/config';
import { IAppMenu, IRoute } from '/imports/modules/modulesTypings';

class SysRoutes {
    private routes:(IRoute | null)[];
    private menuItens:(IAppMenu | null)[];
    public getRoutes    = () => this.routes;
    public getMenuItens = () => this.menuItens;

    constructor() {
        this.routes = [
            ...Modules.pagesRouterList,
            ...Pages.pagesRouterList,
            ...UserProfile.pagesRouterList
        ];
        this.menuItens = [
            ...Pages.pagesMenuItemList,
            ...Modules.pagesMenuItemList,
            ...UserProfile.pagesMenuItemList
        ];
    }

    public checkIfRouteExists = (path: string) => this.routes.some(route => route?.path === path);


}

export default new SysRoutes();