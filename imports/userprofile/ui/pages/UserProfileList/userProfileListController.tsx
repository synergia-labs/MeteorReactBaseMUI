import React, {useCallback, useContext} from "react";
import { nanoid } from 'nanoid';
import { useNavigate } from "react-router-dom";
import UserProfileListView from "./userProfileListView";

interface IUserProfileListContollerContext {
    onAddButtonClick: () => void;
}

export const UserProfileListControllerContext = React.createContext<IUserProfileListContollerContext>({} as IUserProfileListContollerContext);

const ExampleListController = () => {
    const navigate = useNavigate();

    const onAddButtonClick = useCallback(() => {
        const newDocumentId = nanoid();
        navigate(`/userprofile/create/${newDocumentId}`);
    }, []);


    return (
        <UserProfileListControllerContext.Provider value={{
            onAddButtonClick
        }}>
            <UserProfileListView />
        </UserProfileListControllerContext.Provider>
    );
};

export default ExampleListController;