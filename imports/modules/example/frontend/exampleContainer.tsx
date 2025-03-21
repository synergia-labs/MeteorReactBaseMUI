import React, { ReactNode } from "react";
import { useParams } from "react-router-dom";
import { hasValue } from "/imports/libs/hasValue";
import enumExampleScreenState, { exampleScreenStateValidState } from "../common/enums/enumScreenState";
import ExampleModuleContext, { IExampleModuleContext } from "./exampleContext";

interface IExampleContainerProps {
	children?: ReactNode;
}

const ExampleContainer: React.FC<IExampleContainerProps> = ({ children }) => {
	const { screenState, exampleId } = useParams();

	const id = hasValue(exampleId) ? exampleId : undefined;
	const state: enumExampleScreenState | undefined =
		hasValue(screenState) && exampleScreenStateValidState.includes(screenState!)
			? (screenState as enumExampleScreenState)
			: undefined;

	const contextValues: IExampleModuleContext = {
		state: state,
		id: id
	};

	return <ExampleModuleContext.Provider value={contextValues}>{children}</ExampleModuleContext.Provider>;
};

export default ExampleContainer;
