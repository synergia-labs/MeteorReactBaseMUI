import React, { createContext, useContext, ReactNode, useState, useMemo, useEffect } from "react";
import securityApi from "../security.api";
import { hasValue } from "/imports/libs/hasValue";

interface ISecurityContext {
	permissions: Record<string, boolean>;
	module: string;
	loading: boolean;
}

const SecurityContext = createContext<ISecurityContext>({} as ISecurityContext);

interface ISecurityProvider {
	functionality: string[];
	module: string;
	children: ReactNode;
}

export function SecurityProvider({ functionality, module, children }: ISecurityProvider) {
	const [access, setAccess] = useState<Record<string, boolean>>({});
	const [_isLoading, setIsLoading] = useState<boolean>(true);
	functionality = functionality.filter((el) => hasValue(el));

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
			loading: _isLoading,
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
