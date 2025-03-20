import { getUsersListPublication } from "../../backend/publications/usersList.publication";
import { PublicationType } from "/imports/base/types/publication";

interface UsersApiPublication {
    getUsersListPublication: PublicationType<typeof getUsersListPublication>;
}

export default UsersApiPublication;