import { getDefaultAdminContext } from '/imports/base/server/utils/defaultContexts';
import { enumSecurityConfig } from '/imports/base/services/security/common/enums/config.enum';
import { roleSafeInsert } from '../../base/services/security/backend/methods/roleSafeInsert';
import EnumUserRoles from '/imports/modules/userprofile/common/enums/enumUserRoles';

export async function initRoles() {
	try {
		const context = getDefaultAdminContext();
		await Promise.all(
			Object.values(EnumUserRoles).map(async (role) => {
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
