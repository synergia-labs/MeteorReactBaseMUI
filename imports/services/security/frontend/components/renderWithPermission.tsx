import React, { JSX, ReactNode } from "react";
import { useSecurity } from "../security.provider";
import { hasValue } from "/imports/libs/hasValue";

interface IRenderWithPermissionProps {
	functionalities: Array<string>;
	children: ReactNode;
	fallback?: JSX.Element | ReactNode | React.ElementType; // Opcional: Componente de fallback caso não tenha permissão
}

export const RenderWithPermission: React.FC<IRenderWithPermissionProps> = ({
	functionalities,
	children,
	fallback = null
}) => {
	const { permissions, module, loading } = useSecurity();
	if (!hasValue(permissions) && !loading && functionalities.length > 0)
		console.error(
			`	
				Permissions not found in security context (${module})! 
				Define a Security provider on the index of your module. 
				Trying to access: ${functionalities})
			`
		);
	const canAccess =
		functionalities.length == 0 ||
		!functionalities.some((permission) => !hasValue(permissions) || !permissions[permission]);

	if (canAccess) {
		return <>{children}</>;
	}

	return <>{fallback}</>; // Retorna fallback se não tiver permissão
};
