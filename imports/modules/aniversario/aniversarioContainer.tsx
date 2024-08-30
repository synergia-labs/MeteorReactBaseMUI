import React from 'react';
import { IDefaultContainerProps } from '/imports/typings/BoilerplateDefaultTypings';
import { useParams } from 'react-router-dom';
import AniversarioListController from '/imports/modules/aniversario/pages/aniversarioList/aniversarioListController';
import AniversarioDetailController from '/imports/modules/aniversario/pages/aniversarioDetail/aniversarioDetailContoller';

export interface IAniversarioModuleContext {
	state?: string;
	id?: string;
}

export const AniversarioModuleContext = React.createContext<IAniversarioModuleContext>({});

export default (props: IDefaultContainerProps) => {
	let { screenState, aniversarioId } = useParams();
	const state = screenState ?? props.screenState;
	const id = aniversarioId ?? props.id;

	const validState = ['view', 'edit', 'create'];

	const renderPage = () => {
		if (!state || !validState.includes(state)) return <AniversarioListController />;
		return <AniversarioDetailController />;
	};

	const providerValue = {
		state,
		id
	};
	return <AniversarioModuleContext.Provider value={providerValue}>{renderPage()}</AniversarioModuleContext.Provider>;
};
