import { getAllMethodsPublication } from '../../publications/getAllMethods';
import { getAllRolesPublication } from '../../publications/getAllRoles';
import { PublicationType } from '/imports/base/types/publication';

export interface SecurityApiPublication {
	getAllMethodsPublication: PublicationType<typeof getAllMethodsPublication>;
	getAllRolesPublication: PublicationType<typeof getAllRolesPublication>;
}
