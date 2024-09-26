import React, { useCallback } from 'react';
import { IDefaultContainerProps } from '/imports/typings/BoilerplateDefaultTypings';
import { useParams } from 'react-router-dom';
import AniversarioListController from '/imports/modules/aniversario/pages/aniversarioList/aniversarioListController';
import AniversarioDetailController from '/imports/modules/aniversario/pages/aniversarioDetail/aniversarioDetailContoller';
import { hasValue } from '/imports/libs/hasValue';

export interface IAniversarioModuleContext {
	state?: 'create' | 'view' | 'edit';
	id?: string;
}

export const AniversarioModuleContext = React.createContext<IAniversarioModuleContext>({});

export default (props: IDefaultContainerProps) => {
	let { screenState, aniversarioId } = useParams();
	const state = screenState ?? props.screenState;
	const id = aniversarioId ?? props.id;

	const validState = ['view', 'edit', 'create'];
  const isValideState = hasValue(state) && validState.includes(state!);

	const renderPage = useCallback(() => {
    if (!isValideState) return <AniversarioListController />;
		return <AniversarioDetailController />;
	}, [isValideState]);

	const providerValue = {
		state: !isValideState ? undefined : state as 'create' | 'view' | 'edit' | undefined,
		id
	};
	return <AniversarioModuleContext.Provider value={providerValue}>{renderPage()}</AniversarioModuleContext.Provider>;
};
