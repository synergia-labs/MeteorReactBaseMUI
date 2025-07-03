import React, { ReactNode } from "react";
import { enumSysTemplateOptions } from "./enum/sysTemplateOptions";
import { SysTemplateContext } from "./templateContext";
import { enumSysTemplates } from "./enum/sysTemplates";

export interface ISysTemplateProps {
	children: ReactNode;
}

export function TemplateProvider({ children }: { children: ReactNode }) {
	const [variant, setVariant] = React.useState(enumSysTemplateOptions.NONE);
	const propsRef = React.useRef<Record<string, any> | undefined>(undefined);

	function setTemplateDef({ variant, props }: { variant: enumSysTemplateOptions; props?: Record<string, any> }) {
		propsRef.current = props;
		setVariant(variant);
	}

	function getTemplate({ children, variant }: { children: ReactNode; variant: enumSysTemplateOptions }) {
		const Template = enumSysTemplates[variant];
		if (!Template) return <>{children}</>;
		return <Template {...propsRef.current}>{children}</Template>;
	}

	return (
		<SysTemplateContext.Provider
			value={{
				setTemplate: setTemplateDef
			}}>
			{getTemplate({ children, variant })}
		</SysTemplateContext.Provider>
	);
}
