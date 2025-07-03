import React from "react";
import Style from "./hello.style";
import { useTranslation } from "react-i18next";
import { enumModuleNameSettings } from "../../../common/enums/settings";

const Hello: React.FC = () => {
	const { t, i18n } = useTranslation("moduleName");

	return (
		<Style.container>
			<Style.text>{t("components.hello")}</Style.text>
			<Style.moduleNameText>{i18n.t(enumModuleNameSettings.I18N_MODULE_NAME_PATH)}</Style.moduleNameText>
		</Style.container>
	);
};

export default Hello;
