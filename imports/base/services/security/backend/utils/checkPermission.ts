import { enumSecurityConfig } from '../../common/enums/config.enum';
// import { SecurityServer } from '../security.server';
import { hasValue } from '/imports/libs/hasValue';
import EnumUserRoles from '/imports/modules/userprofile/common/enums/enumUserRoles';
import { IContext } from '/imports/typings/IContext';

export async function _checkPermission(name: string, referred: string, _context: IContext): Promise<boolean> {
	try {
		const SecurityServer = await require('../security.server').SecurityServer;
		const server = SecurityServer.mongoMethod;
		if (!server) throw new Error('Method collection not found');

		let method = await server.findOneAsync({ name: name, referred: referred });
		if (!method) method = await server.findOneAsync({ name: name, referred: enumSecurityConfig.apiName });
		if (!hasValue(method)) throw new Error(`Method <${name}> not found`);

		let module = await server.findOneAsync({ name: name.split('.')[0], referred: referred });
		if (!module) module = await server.findOneAsync({ name: name.split('.')[0], referred: enumSecurityConfig.apiName });
		if (!hasValue(module)) throw new Error(`Module <${name.split('.')[0]}> not found`);

		if (
			(!hasValue(method.roles) || method.roles.length === 0 || method.roles.includes(EnumUserRoles.PUBLIC)) &&
			(!hasValue(module.roles) || module.roles.length === 0 || module.roles.includes(EnumUserRoles.PUBLIC))
		)
			return true;

		const user = _context.user ?? Meteor.user();
		if (!hasValue(user) || !hasValue(user.profile?.roles)) return false;

		return (
			(module.roles.some((role: string) => user.profile!.roles.includes(role)) ||
				module.roles.includes(EnumUserRoles.PUBLIC)) &&
			method.roles.some((role: string) => user.profile!.roles.includes(role))
		);
	} catch (error) {
		console.log('Failed to check permission', error);
		return false;
	}
}
