import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import UserProfileListController from '../../modules/userprofile/pages/UserProfileList/userProfileListController';
import AuthContext, { IAuthContext } from '/imports/app/authProvider/authContext';

export interface IUserProfileModuleContext {
	state?: string;
	id?: string;
}

export const UserProfileModuleContext = React.createContext<IUserProfileModuleContext>({});

export default () => {
	const { user } = useContext<IAuthContext>(AuthContext);
	let { screenState, userprofileId } = useParams();

	const state = screenState;
	const id = userprofileId ?? user?._id;

	const validState = ['view', 'edit', 'create'];

	const renderPage = () => {
		if (!!!state || !validState.includes(state)) return <UserProfileListController />;
	};

	const providerValue = {
		state,
		id
	};
	return <UserProfileModuleContext.Provider value={providerValue}>{renderPage()}</UserProfileModuleContext.Provider>;
};
