import React from 'react';
import { IDefaultContainerProps } from '../../typings/BoilerplateDefaultTypings';
import { useParams } from 'react-router-dom';
import ExampleListController from '../../modules/example/pages/exampleList/exampleListController';
import ExampleDetailController from '../../modules/example/pages/exampleDetail/exampleDetailContoller';

export interface IExampleModuleContext {
	state?: string;
	id?: string;
}

export const ExampleModuleContext = React.createContext<IExampleModuleContext>({});

export default (props: IDefaultContainerProps) => {
	let { screenState, exampleId } = useParams();
	const state = screenState ?? props.screenState;
	const id = exampleId ?? props.id;

	const validState = ['view', 'edit', 'create'];

	const renderPage = () => {
		if (!state || !validState.includes(state)) return <ExampleListController />;
		return <ExampleDetailController />;
	};

	const providerValue = {
		state,
		id
	};
	return <ExampleModuleContext.Provider value={providerValue}>{renderPage()}</ExampleModuleContext.Provider>;
};
