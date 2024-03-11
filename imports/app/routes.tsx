import Modules     from '../modules';
import Pages       from '../sysPages/config';
import UserProfile from '../modules/userprofile/config';
import { IAppMenu, IRoute } from '/imports/modules/modulesTypings';
import { useLocation } from 'react-router-dom';

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

    public checkIfRouteExists = (path: string) => this.routes.some(route => {
        if (!route?.path) return false;
        const routeRegex = new RegExp("^" + route.path.replace(/:[^\s/]+/g, '([^\/]+)') + "$");
        return routeRegex.test(path);
    });

    public static checkIsActiveRoute = (routePath?: string) => {
        const location = useLocation().pathname;
        if (!routePath) return false;
        if (routePath === '/') return location === '/';
        
        const normalizedRoutePath = routePath.replace(/\/$/, '');
        
        return location.startsWith(normalizedRoutePath);
    }
    
    


}

export default SysRoutes;