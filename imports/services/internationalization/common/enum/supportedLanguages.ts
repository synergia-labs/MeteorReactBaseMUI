import { z } from "zod";

enum enumSupportedLanguages {
	PT = "pt",
	EN = "en"
}

export const zodSupportedLanguages = z.enum(Object.values(enumSupportedLanguages) as [string, ...string[]]);

export default enumSupportedLanguages;
