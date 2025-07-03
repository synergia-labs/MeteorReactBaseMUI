import React, { ReactNode, useMemo } from "react";
import InternationalizationContext, { IInternationalizationContext } from "./context";

interface IContainerProps {
	children?: ReactNode;
}

const Container: React.FC<IContainerProps> = ({ children }) => {
	const value: IInternationalizationContext = useMemo(() => ({}), []);
	return <InternationalizationContext.Provider value={value}>{children}</InternationalizationContext.Provider>;
};

export default Container;
