import { getDefaultAdminContext } from "/imports/base/server/utils/defaultContexts";
import enumUserRoles from "/imports/modules/users/common/enums/enumUserRoles";
import { roleSafeInsert } from "/imports/services/security/backend/methods/roleSafeInsert";
import { enumSecurityConfig } from "/imports/services/security/common/enums/config";

export async function initRoles() {
	try {
		const context = getDefaultAdminContext();
		await Promise.all(
			Object.values(enumUserRoles).map(async (role) => {
				return roleSafeInsert.execute(
					{
						name: role,
						referred: enumSecurityConfig.API_NAME
					},
					context
				);
			})
		);
	} catch (__) {}
}
