import { getDefaultAdminContext } from "/imports/base/server/utils/defaultContexts";
import enumUserRoles from "/imports/modules/users/common/enums/enumUserRoles";
import { sysRoutesList } from "/imports/app/routes/register";
import { RouteType } from "/imports/app/routes/types/routeType";
import { methodSafeInsert } from "/imports/services/security/backend/methods/methodSafeInsert";
import { enumSecurityConfig } from "/imports/services/security/common/enums/config";
import { enumMethodTypes } from "/imports/services/security/common/enums/methodTypes";

const context = getDefaultAdminContext();

async function registerRouters(routes: Array<RouteType>) {
	try {
		await Promise.all(
			routes.map(async (route) => {
				route.children && (await registerRouters(route.children));
				return methodSafeInsert.execute(
					{
						name: route.fullPath as string,
						referred: enumSecurityConfig.API_NAME,
						description: route.name,
						roles: route.roles ?? [enumUserRoles.PUBLIC],
						isProtected: route.isProtected,
						type: enumMethodTypes.enum.SCREEN
					},
					context
				);
			})
		);
	} catch (__) {}
}

export async function initRouters() {
	return await registerRouters(sysRoutesList);
}
