import { getDefaultAdminContext } from "/imports/base/server/utils/defaultContexts";
import { enumSecurityConfig } from "../../services/security/common/enums/config";
import { roleSafeInsert } from "../../services/security/backend/methods/roleSafeInsert";
import enumUserRoles from "../../modules/userprofile/common/enums/enumUserRoles";

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
