import React, { createContext, useCallback, useContext } from 'react';
import AniversarioDetailView from './aniversarioDetailView';
import { useNavigate } from 'react-router-dom';
import { AniversarioModuleContext } from '../../aniversarioContainer';
import { useTracker } from 'meteor/react-meteor-data';
import { aniversarioApi } from '../../api/aniversarioApi';
import { IAniversario } from '../../api/aniversarioSch';
import { ISchema } from '/imports/typings/ISchema';
import { IMeteorError } from '/imports/typings/BoilerplateDefaultTypings';
import AppLayoutContext, { IAppLayoutContext } from '/imports/app/appLayoutProvider/appLayoutContext';

interface IAniversarioDetailContollerContext {
	closePage: () => void;
	document: IAniversario;
	loading: boolean;
	schema: ISchema<IAniversario>;
	onSubmit: (doc: IAniversario) => void;
	changeToEdit: (id: string) => void;
}

export const AniversarioDetailControllerContext = createContext<IAniversarioDetailContollerContext>(
	{} as IAniversarioDetailContollerContext
);

const AniversarioDetailController = () => {
	const navigate = useNavigate();
	const { id, state } = useContext(AniversarioModuleContext);
	const { showNotification } = useContext<IAppLayoutContext>(AppLayoutContext);

	const { document, loading } = useTracker(() => {
		const subHandle = !!id ? aniversarioApi.subscribe('aniversarioDetail', { _id: id }) : null;
		const document = id && subHandle?.ready() ? aniversarioApi.findOne({ _id: id }) : {};
		return {
			document: (document as IAniversario) ?? ({ _id: id } as IAniversario),
			loading: !!subHandle && !subHandle?.ready()
		};
	}, [id]);

	const closePage = useCallback(() => navigate(-1), []);
	const changeToEdit = useCallback((id: string) => navigate(`/aniversario/edit/${id}`),[]);

	const onSubmit = useCallback((doc: IAniversario) => {
		const selectedAction = state === 'create' ? 'insert' : 'update';
		aniversarioApi[selectedAction](doc, (e: IMeteorError) => {
      if(e) return showNotification({
        type: 'error',
        title: 'Operação não realizada!',
        message: `Erro ao realizar a operação: ${e.reason}`
      });
      closePage();
      showNotification({
        type: 'success',
        title: 'Operação realizada!',
        message: `O exemplo foi ${selectedAction === 'update' ? 'atualizado' : 'cadastrado'} com sucesso!`
      });
		});
	}, []);

	return (
		<AniversarioDetailControllerContext.Provider
			value={{
				closePage,
				document: { ...document, _id: id },
				loading,
				schema: aniversarioApi.getSchema(),
				onSubmit,
				changeToEdit
			}}>
			{<AniversarioDetailView />}
		</AniversarioDetailControllerContext.Provider>
	);
};

export default AniversarioDetailController;
