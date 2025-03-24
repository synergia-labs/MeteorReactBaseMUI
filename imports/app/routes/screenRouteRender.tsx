import React, { ElementType, useContext } from "react";
import { SysTemplate } from "/imports/ui/templates/getTemplate";
import AppLayoutContext, { IAppLayoutContext } from "../appLayoutProvider/appLayoutContext";
import { RouteType } from "./routeType";

const ScreenRouteRender: React.FC<RouteType> = ({ element, templateVariant, templateProps }) => {
	const { defaultTemplate } = useContext<IAppLayoutContext>(AppLayoutContext);
	const Component: ElementType = element as ElementType;

	return (
		<SysTemplate variant={templateVariant ?? defaultTemplate.variant} props={templateProps ?? defaultTemplate.props}>
			<Component />
		</SysTemplate>
	);
};

export default ScreenRouteRender;
