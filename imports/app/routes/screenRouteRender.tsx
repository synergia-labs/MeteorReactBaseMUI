import React, { ElementType, useContext } from "react";
import { RouteType } from "/imports/modules/modulesTypings";
import { SysTemplate } from "/imports/ui/templates/getTemplate";
import AppLayoutContext, { IAppLayoutContext } from "../appLayoutProvider/appLayoutContext";

const ScreenRouteRender: React.FC<RouteType> = ({ element, templateVariant, templateMenuOptions, templateProps }) => {
	const { defaultTemplate } = useContext<IAppLayoutContext>(AppLayoutContext);
	const Component: ElementType = element as ElementType;

	return (
		<SysTemplate
			variant={templateVariant ?? defaultTemplate.variant}
			props={templateProps ?? defaultTemplate.props}
			menuOptions={templateMenuOptions ?? defaultTemplate.menuOptions}>
			<Component />
		</SysTemplate>
	);
};

export default ScreenRouteRender;
