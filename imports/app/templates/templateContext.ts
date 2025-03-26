import { createContext } from "react";
import { enumSysTemplateOptions } from "./enum/sysTemplateOptions";

interface ISysTemplateContext {
	setTemplate: ({ variant, props }: { variant: enumSysTemplateOptions; props?: Record<string, any> }) => void;
}

export const SysTemplateContext = createContext<ISysTemplateContext>({} as ISysTemplateContext);
