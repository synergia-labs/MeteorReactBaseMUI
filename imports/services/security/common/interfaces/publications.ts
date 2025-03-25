import { getAllMethodsPublication } from "../../backend/publications/getAllMethods";
import { getAllRolesPublication } from "../../backend/publications/getAllRoles";
import { PublicationType } from "../../../../types/publication";

export interface ISecurityApiPublication {
	getAllMethodsPublication: PublicationType<typeof getAllMethodsPublication>;
	getAllRolesPublication: PublicationType<typeof getAllRolesPublication>;
}
