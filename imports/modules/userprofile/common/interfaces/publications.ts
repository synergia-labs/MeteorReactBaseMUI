import { getUsersListPublication } from "../../backend/publications/usersList.publication";
import { PublicationType } from "../../../../types/publication";

interface IUsersApiPublication {
	getUsersListPublication: PublicationType<typeof getUsersListPublication>;
}

export default IUsersApiPublication;
