import React, { useCallback } from 'react';
import { useParams } from 'react-router-dom';
import ExampleDetailController from '../../modules/example/pages/exampleDetail/exampleDetailContoller';
import { hasValue } from '/imports/libs/hasValue';
import ModuleContext, { IExampleModuleContext } from './exampleContext';
import EnumExampleScreenState, { exampleScreenStateValidState } from './config/enumExampleScreenState';
import ExampleListProvider from './pages/exampleList/exampleListProvider';

export default () => {
	const { screenState, exampleId } = useParams();

	const id = hasValue(exampleId) ? exampleId : undefined;
	const state: EnumExampleScreenState | undefined = 
		(hasValue(screenState) && exampleScreenStateValidState.includes(screenState!)) 
		? screenState as EnumExampleScreenState
		: undefined;

	const renderPage = useCallback(() => {	
		if (!hasValue(state)) return <ExampleListProvider />;
		return <ExampleDetailController />;
	},[state]); 

	const contextValues: IExampleModuleContext = {
		state: state,
		id: id
	};


	return (
		<ModuleContext.Provider value={contextValues}>
			{renderPage()}
		</ModuleContext.Provider>);
};
