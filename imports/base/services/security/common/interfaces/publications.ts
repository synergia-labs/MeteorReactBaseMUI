import { getAllMethodsPublication } from '../../publications/getAllMethods';
import { PublicationType } from '/imports/base/types/publication';

export interface SecurityApiPublication {
	getAllMethodsPublication: PublicationType<typeof getAllMethodsPublication>;
}
