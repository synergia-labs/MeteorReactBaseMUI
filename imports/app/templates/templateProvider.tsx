import React, { ReactNode } from "react";
import { enumSysTemplateOptions } from "./enum/sysTemplateOptions";
import { SysTemplateContext } from "./templateContext";
import { enumSysTemplates } from "./enum/sysTamplates";

export function TemplateProvider({ children }: { children: ReactNode }) {
	const [variante, setVariante] = React.useState(enumSysTemplateOptions.NONE);
	const propsRef = React.useRef<Record<string, any> | undefined>(undefined);

	function setTemplateDef({ variant, props }: { variant: enumSysTemplateOptions; props?: Record<string, any> }) {
		propsRef.current = props;
		setVariante(variant);
	}

	function getTemplate({ children, variante }: { children: ReactNode; variante: enumSysTemplateOptions }) {
		const Template = enumSysTemplates[variante];
		if (!Template) return <>{children}</>;
		return <Template {...propsRef.current}>{children}</Template>;
	}

	return (
		<SysTemplateContext.Provider
			value={{
				setTemplate: setTemplateDef
			}}>
			{getTemplate({ children, variante })}
		</SysTemplateContext.Provider>
	);
}
