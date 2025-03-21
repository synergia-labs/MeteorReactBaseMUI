import React, { ReactNode } from "react";
import { TemplateAppBar } from "./templateAppBar/templateAppBar";
import TemplateNone from "./templateNone/templateNone";
import { IAppMenu } from "../../modules/modulesTypings";
import { NavigateFunction } from "react-router-dom";
import TemplateLogin from "./templateLogin/templateLogin";

//important: A definição do template default da aplicação é feita no aquivo /imports/app/appLayout.tsx

export enum enumSysTemplateOptions {
	APPBAR = "AppBar",
	NONE = "None",
	LOGIN = "Login"
}

const templates = {
	[enumSysTemplateOptions.APPBAR]: TemplateAppBar,
	[enumSysTemplateOptions.NONE]: TemplateNone,
	[enumSysTemplateOptions.LOGIN]: TemplateLogin
};

export interface ISysTemplate {
	/**Propriedade que define qual template será renderizado.
	 *
	 * **obs:** Essa propriedade é usada como atributo `templateVariant` na definição da rota.
	 */
	variant: enumSysTemplateOptions;
	/**Propriedades que podem ser passadas por parâmetro para o menu de navegação.
	 *
	 * **obs:** Essa propriedade é usada como atributo `templateMenuOptions` na definição da rota.
	 */
	menuOptions?: (IAppMenu | null)[];
	/**Propriedades que podem ser passadas por parâmetro para o template.
	 *
	 * **obs:** Essa propriedade é usada como atributo `templateProps` na definição da rota.
	 */
	props?: any;
	navigate?: NavigateFunction;
	children?: ReactNode;
}

export interface ISysTemplateProps extends Omit<ISysTemplate, "variant" | "props"> {}

export const SysTemplate = ({
	variant = enumSysTemplateOptions.APPBAR,
	menuOptions,
	props,
	children
}: ISysTemplate) => {
	const Template = templates[variant];
	return (
		<Template menuOptions={menuOptions} {...props}>
			{children}
		</Template>
	);
};
