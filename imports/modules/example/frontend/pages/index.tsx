import React, { ReactNode, useMemo } from "react";
import ExampleModuleContext from "./context";

interface IExampleContainerProps {
	children?: ReactNode;
}

const ExampleContainer: React.FC<IExampleContainerProps> = ({ children }) => {
	const value = useMemo(() => {
		return {};
	}, []);
	return <ExampleModuleContext.Provider value={value}>{children}</ExampleModuleContext.Provider>;
};

export default ExampleContainer;
