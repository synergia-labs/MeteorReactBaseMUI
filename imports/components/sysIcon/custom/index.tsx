import React, { ReactNode } from "react";
import BrazilianFlag from "./brazilianFlag";
import UsaFlag from "./usaFlag";
import enumSupportedLanguages from "/imports/services/internationalization/common/enum/supportedLanguages";

const SysCustomIcon = {
	[enumSupportedLanguages.PT]: <BrazilianFlag />,
	[enumSupportedLanguages.EN]: <UsaFlag />
};

export default SysCustomIcon;
export type ICustomIconPropsType = keyof typeof SysCustomIcon;
