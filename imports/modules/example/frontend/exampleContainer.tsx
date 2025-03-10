import React, { useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { hasValue } from '/imports/libs/hasValue';
import EnumExampleScreenState, { exampleScreenStateValidState } from '../common/enums/enumScreenState';
import ExampleListProvider from './pages/exampleList/exampleListProvider';
import ExampleDetailProvider from './pages/exampleDetail/exampleDetailProvider';
import ExampleModuleContext, { IExampleModuleContext } from './exampleContext';

export default () => {
	const { screenState, exampleId } = useParams();

	const id = hasValue(exampleId) ? exampleId : undefined;
	const state: EnumExampleScreenState | undefined = 
		(hasValue(screenState) && exampleScreenStateValidState.includes(screenState!)) 
		? screenState as EnumExampleScreenState
		: undefined;

	const renderPage = useCallback(() => {	
		if (!hasValue(state)) return <ExampleListProvider />;
		return <ExampleDetailProvider />;
	},[state]); 

	const contextValues: IExampleModuleContext = {
		state: state,
		id: id
	};


	return (
		<ExampleModuleContext.Provider value={contextValues}>
			{renderPage()}
		</ExampleModuleContext.Provider>);
};
