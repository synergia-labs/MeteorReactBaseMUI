import React, { createContext, useContext, ReactNode, useState, useMemo, useEffect } from "react";
import securityApi from "../security.api";
import { getRole } from "../backend/methods/getRole";

getRole.getName();

interface ISecurityContext {
	permissions: Record<string, boolean>;
	module: string;
}

const SecurityContext = createContext<ISecurityContext>({} as ISecurityContext);

interface ISecurityProvider {
	functionality: string[];
	module: string;
	children: ReactNode;
}

export function SecurityProvider({ functionality, module, children }: ISecurityProvider) {
	const [access, setAccess] = useState<Record<string, boolean>>({});
	const [_isLoading, setIsLoading] = useState<boolean>(false);

	useEffect(() => {
		setIsLoading(true);
		securityApi.checkMethodPermission({ names: functionality }, (error, result) => {
			setIsLoading(false);
			if (error) {
				console.error(error);
				return;
			}
			setAccess(result);
		});
	}, []);

	const value = useMemo(() => {
		return {
			permissions: access,
			module
		};
	}, [access]);

	return <SecurityContext.Provider value={value}>{children}</SecurityContext.Provider>;
}

export const useSecurity = (): ISecurityContext => {
	const context = useContext(SecurityContext);
	if (!context) {
		throw new Error("useSecurity must be used within a SecurityProvider");
	}
	return context;
};
