import React, { ReactNode } from 'react';
import { useSecurity } from '../security.provider';

interface RenderWithPermissionProps {
	functionalities: Array<string>;
	children: ReactNode;
	fallback?: ReactNode; // Opcional: Componente de fallback caso não tenha permissão
}

export const RenderWithPermission: React.FC<RenderWithPermissionProps> = ({
	functionalities,
	children,
	fallback = null
}) => {
	const { permissions } = useSecurity();
	const canAccess = !functionalities.some((permission) => !permissions[permission]);

	if (canAccess) {
		return <>{children}</>;
	}

	return <>{fallback}</>; // Retorna fallback se não tiver permissão
};
