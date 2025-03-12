import React, { createContext, useCallback, useContext } from 'react';
import ExampleDetailView from './exampleDetailView';
import { useNavigate } from 'react-router-dom';
import { ExampleModuleContext } from '../../exampleContainer';
import { useTracker } from 'meteor/react-meteor-data';
import { exampleApi } from '../../api/exampleApi';
import { IExample } from '../../api/exampleSch';
import { ISchema } from '../../../../typings/ISchema';
import { IMeteorError } from '../../../../typings/BoilerplateDefaultTypings';
import AppLayoutContext, { IAppLayoutContext } from '/imports/app/appLayoutProvider/appLayoutContext';

interface IExampleDetailContollerContext {
	closePage: () => void;
	document: IExample;
	loading: boolean;
	schema: ISchema<IExample>;
	onSubmit: (doc: IExample) => void;
	changeToEdit: (id: string) => void;
}

export const ExampleDetailControllerContext = createContext<IExampleDetailContollerContext>(
	{} as IExampleDetailContollerContext
);

const ExampleDetailController = () => {
	const navigate = useNavigate();
	const { id, state } = useContext(ExampleModuleContext);
	const { showNotification } = useContext<IAppLayoutContext>(AppLayoutContext);

	const { document, loading } = useTracker(() => {
		const subHandle = !!id ? exampleApi.subscribe('exampleDetail', { _id: id }) : null;
		const document = id && subHandle?.ready() ? exampleApi.findOne({ _id: id }) : {};
		return {
			document: (document as IExample) ?? ({ _id: id } as IExample),
			loading: !!subHandle && !subHandle?.ready()
		};
	}, [id]);

	const closePage = useCallback(() => {
		navigate(-1);
	}, []);
	const changeToEdit = useCallback((id: string) => {
		navigate(`/example/edit/${id}`);
	}, []);

	const onSubmit = useCallback((doc: IExample) => {
		const selectedAction = state === 'create' ? 'insert' : 'update';
		exampleApi[selectedAction](doc, (e: IMeteorError) => {
			if (!e) {
				closePage();
				showNotification({
					type: 'success',
					title: 'Operação realizada!',
					message: `O exemplo foi ${selectedAction === 'update' ? 'atualizado' : 'cadastrado'} com sucesso!`
				});
			} else {
				showNotification({
					type: 'error',
					title: 'Operação não realizada!',
					message: `Erro ao realizar a operação: ${e.reason}`
				});
			}
		});
	}, []);

	return (
		<ExampleDetailControllerContext.Provider
			value={{
				closePage,
				document: { ...document, _id: id },
				loading,
				schema: exampleApi.getSchema(),
				onSubmit,
				changeToEdit
			}}>
			{<ExampleDetailView />}
		</ExampleDetailControllerContext.Provider>
	);
};

export default ExampleDetailController;
