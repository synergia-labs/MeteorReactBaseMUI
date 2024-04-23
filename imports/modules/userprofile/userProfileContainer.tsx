import React from 'react';
import { IDefaultContainerProps } from '/imports/typings/BoilerplateDefaultTypings';
import { useParams } from 'react-router-dom';
import UserProfileListController from '/imports/modules/userprofile/pages/UserProfileList/userProfileListController';
import { SysAppContext } from '/imports/app/AppContainer';
import ExampleDetailController from '../example/pages/exampleDetail/exampleDetailContoller';

export interface IUserProfileModuleContext {
	state?: string;
	id?: string;
}

export const UserProfileModuleContext = React.createContext<IUserProfileModuleContext>({});

export default (props: IDefaultContainerProps) => {
	const { user } = React.useContext(SysAppContext);
	let { screenState, userprofileId } = useParams();

	const state = screenState ? screenState : props.screenState;
	const id = userprofileId ?? user?._id;

	const validState = ['view', 'edit', 'create'];

	const renderPage = () => {
		if (!!!state || !validState.includes(state)) return <UserProfileListController />;
		return <ExampleDetailController />;
	};

	const providerValue = {
		state,
		id
	};
	return <UserProfileModuleContext.Provider value={providerValue}>{renderPage()}</UserProfileModuleContext.Provider>;
};
