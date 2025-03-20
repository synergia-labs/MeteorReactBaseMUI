import React, { useCallback, useContext, useState } from "react";
import Context, { IExampleDetailContext } from "./exampleDetailContext";
import ExampleDetailView from "./exampleDetailView";
import { useNavigate } from "react-router-dom";
import AppLayoutContext, { IAppLayoutContext } from "/imports/app/appLayoutProvider/appLayoutContext";
import { useTracker } from "meteor/react-meteor-data";
import EnumExampleScreenState from "../../../common/enums/enumScreenState";
import ExampleModuleContext, { IExampleModuleContext } from "../../exampleContext";

const ExampleDetailProvider: React.FC = () => {
	const navigate = useNavigate();
	const { id, state } = useContext<IExampleModuleContext>(ExampleModuleContext);
	const { showNotification } = useContext<IAppLayoutContext>(AppLayoutContext);

	const [document, setDocument] = useState<Partial<any>>();
	const [loading, setLoading] = useState<boolean>(false);

	useTracker(() => {
		if (!id) return;
		setLoading(true);

		// const subHandle = exampleApi.subscribe('exampleDetail', { _id: id });
		// const exampleDocument = exampleApi.findOne({ _id: id });

		// if(!subHandle?.ready()) return;

		setDocument({});
		setLoading(false);
	}, [id]);

	const closePage = useCallback(() => navigate(-1), [navigate]);

	const changeToEdit = useCallback(
		(id: string) => navigate(`/example/${EnumExampleScreenState.EDIT}/${id}`),
		[navigate]
	);

	const onSubmit = useCallback(
		(__doc: any) => {
			// exampleApi[action](doc, (error: IMeteorError) => {
			//     if(error) return showNotification({
			//         type: 'error',
			//         title: 'Erro ao realizar operação',
			//         message: error.reason
			//     });
			//     closePage();
			//     showNotification({
			//         type: 'success',
			//         title: 'Operação realizada!',
			//         message: `O exemplo foi ${action === 'update' ? 'atualizado' : 'cadastrado'} com sucesso!`
			//     });
			// });
		},
		[showNotification, closePage, state]
	);

	const contextValues: IExampleDetailContext = {
		document: document ?? {},
		loading: loading,
		schema: {},
		closePage: closePage,
		onSubmit: onSubmit,
		changeToEdit: changeToEdit
	};

	return (
		<Context.Provider value={contextValues}>
			<ExampleDetailView />
		</Context.Provider>
	);
};

export default ExampleDetailProvider;
