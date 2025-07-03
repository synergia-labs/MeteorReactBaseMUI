import { enumSecurityConfig } from "../../common/enums/config";
import { hasValue } from "/imports/libs/hasValue";
import { IContext } from "../../../../types/context";
import enumUserRoles from "/imports/modules/users/common/enums/enumUserRoles";

export async function _checkPermission(name: string, referred: string, _context: IContext): Promise<boolean> {
	try {
		const SecurityServer = await require("../security.server").SecurityServer; // eslint-disable-line
		const server = SecurityServer.mongoMethod;
		if (!server) throw new Error("Method collection not found");

		let method = await server.findOneAsync({ name: name, referred: referred });
		if (!method) method = await server.findOneAsync({ name: name, referred: enumSecurityConfig.API_NAME });
		if (!hasValue(method)) throw new Error(`Method <${name}> not found`);

		let module = await server.findOneAsync({ name: name.split(".")[0], referred: referred });
		if (!module) module = await server.findOneAsync({ name: name.split(".")[0], referred: enumSecurityConfig.API_NAME });
		if (!hasValue(module)) throw new Error(`Module <${name.split(".")[0]}> not found`);

		if (
			(!hasValue(method.roles) || method.roles.length === 0 || method.roles.includes(enumUserRoles.PUBLIC)) &&
			(!hasValue(module.roles) || module.roles.length === 0 || module.roles.includes(enumUserRoles.PUBLIC))
		)
			return true;

		const user = _context.user ?? Meteor.user();
		if (!hasValue(user) || (!hasValue(user.profile?.roles) && !method?.roles?.includes(enumUserRoles.PUBLIC)))
			return false;

		return (
			(module.roles.some((role: string) => user.profile!.roles.includes(role)) ||
				module.roles.includes(enumUserRoles.PUBLIC)) &&
			method.roles.some((role: string) => user.profile!.roles.includes(role))
		);
	} catch (error) {
		console.error("Failed to check permission", error);
		return false;
	}
}
