import { TemplateAppBar } from "../pages/templateAppBar/templateAppBar";
import TemplateLogin from "../pages/templateLogin/templateLogin";
import TemplateNone from "../pages/templateNone/templateNone";
import { enumSysTemplateOptions } from "./sysTemplateOptions";

export const enumSysTemplates = {
	[enumSysTemplateOptions.APPBAR]: TemplateAppBar,
	[enumSysTemplateOptions.NONE]: TemplateNone,
	[enumSysTemplateOptions.LOGIN]: TemplateLogin
};
