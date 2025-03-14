import { getDefaultAdminContext } from '/imports/base/server/utils/defaultContexts';
import { enumSecurityConfig } from '/imports/base/services/security/common/enums/config.enum';
import { roleSafeInsert } from '/imports/base/services/security/methods/roleSafeInsert';
import { EnumUserRoles } from '/imports/modules/userprofile/config/enumUser';

export async function initRoles() {
	const defaultRoles = [EnumUserRoles.PUBLIC, EnumUserRoles.ADM, EnumUserRoles.USER];

	try {
		const context = getDefaultAdminContext();
		await Promise.all(
			defaultRoles.map(async (role) => {
				return roleSafeInsert.execute(
					{
						name: role,
						referred: enumSecurityConfig.apiName
					},
					context
				);
			})
		);
	} catch (__) {}
}
