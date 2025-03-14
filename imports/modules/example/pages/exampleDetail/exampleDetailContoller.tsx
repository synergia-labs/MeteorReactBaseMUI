import React, { useContext } from "react";
import ExampleDetailView from "./exampleDetailView";
import Context, { IExampleDetailContext } from "./exampleDetailContext";
import { useNavigate } from "react-router-dom";
import { ExampleModuleContext, IExampleModuleContext } from "../../exampleContainer";
import { useTracker } from "meteor/react-meteor-data";
import { exampleApi } from "../../api/exampleApi";
import { IExample } from "../../api/exampleSch";
import { IMeteorError } from "/imports/typings/IMeteorError";
import AppLayoutContext from "/imports/app/appLayoutProvider/appLayoutContext";


const ExmapleDetailController: React.FC = () => {
	const { id, state } = useContext<IExampleModuleContext>(ExampleModuleContext);
	const { showNotification } = useContext(AppLayoutContext);

	const navigate = useNavigate();

	const closePage = () => navigate(-1);
	const navigateToEdit = () => navigate(`/example/edit/${id}`);
	const onSubmit = (doc: Partial<IExample>) => {

		exampleApi[ state == 'create' ? 'insert' : 'update'](doc, ( error: IMeteorError ) => {
			if(error) return showNotification({
				type: 'error',
				title: "Não foi possível registrar sua solicitação",
				message: error.reason,
			})
		});
		showNotification({
			type: 'success',
			title: 'Solicitação registrada',
			message: 'Sua solicitação foi registrada com sucesso'
		});
		closePage();
	}


	const { document, loading } = useTracker(() => {
		if(!!!id) closePage();

		const handleSubscribe = exampleApi.subscribe("exampleDetail", { _id: id });
		const document = exampleApi.findOne({ _id: id });

		return { 
			document,
			loading: !!handleSubscribe && !handleSubscribe?.ready()
		}
	}, [ id ]);

	
	const contextValues: IExampleDetailContext = {
		document: document,
		loading: loading,
		onSubmit: onSubmit,
		closePage: closePage,
		navigateToEdit: navigateToEdit
	};
	
	return (
		<Context.Provider value={contextValues}>
			<ExampleDetailView />
		</Context.Provider>
	)
};

export default ExmapleDetailController;