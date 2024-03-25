import React, {useCallback, useContext} from "react";
import { nanoid } from 'nanoid';
import { useNavigate } from "react-router-dom";
import UserProfileListView from "./userProfileListView";
import { userprofileApi } from "../../api/UserProfileApi";
import { useTracker } from "meteor/react-meteor-data";
import { ISchema } from "/imports/typings/ISchema";
import { IUserProfile } from "../../api/UserProfileSch";

interface IInitialConfig {
	sortProperties: { field: string; sortAscending: boolean };
	filter: Object;
	searchBy: string | null;
	viewComplexTable: boolean;
}

interface IUserProfileListContollerContext {
    onAddButtonClick: () => void;
    usuarios: IUserProfile[];
    schema: ISchema<any>;
}

export const UserProfileListControllerContext = React.createContext<IUserProfileListContollerContext>({} as IUserProfileListContollerContext);

const initialConfig = {
    sortProperties: { field: 'createdat', sortAscending: true },
    filter: {},
    searchBy: null,
    viewComplexTable: false
};


const ExampleListController = () => {
    const [config, setConfig] = React.useState<IInitialConfig>(initialConfig);
    const {photo, username, email, roles, ...resto} = userprofileApi.getSchema();
    const exampleSchReduzido = { photo, username, email, roles };
    const navigate = useNavigate();
    const { sortProperties, filter } = config;
	const sort = {
		[sortProperties.field]: sortProperties.sortAscending ? 1 : -1
	};

    const { loading, usuarios } = useTracker(() => {
		const subHandle = userprofileApi.subscribe('userProfileList', filter, {
			sort,
		});
		const usuarios = subHandle?.ready() ? userprofileApi.find(filter, { sort }).fetch() : [];
		return {
			usuarios,
			loading: !!subHandle && !subHandle.ready(),
			total: subHandle ? subHandle.total : usuarios.length,

		};
	}, [config]);

    const onAddButtonClick = useCallback(() => {
        const newDocumentId = nanoid();
        navigate(`/userprofile/create/${newDocumentId}`);
    }, []);


    return (
        <UserProfileListControllerContext.Provider value={{
            onAddButtonClick,
            usuarios: usuarios,
            schema: exampleSchReduzido,
        }}>
            <UserProfileListView />
        </UserProfileListControllerContext.Provider>
    );
};

export default ExampleListController;