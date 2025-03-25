import React, { ReactNode, useMemo } from "react";
import ModuleContext from "./context";

interface IContainerProps {
	children?: ReactNode;
}

const Container: React.FC<IContainerProps> = ({ children }) => {
	const value = useMemo(() => {
		return {};
	}, []);
	return <ModuleContext.Provider value={value}>{children}</ModuleContext.Provider>;
};

export default Container;
