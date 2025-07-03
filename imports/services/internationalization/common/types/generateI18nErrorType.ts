/**
 * Esquema de validação para a geração de erros de i18n.
 *
 * Define a estrutura esperada para um erro localizado, garantindo que os campos essenciais sejam fornecidos corretamente.
 */
import { z } from "zod";
import { IContext } from "/imports/types/context";

export const generateI18nErrorSchema = z.object({
	/**
	 * Chave de tradução obrigatória.
	 * @type {string}
	 */
	key: z.string().nonempty("Key is required"),

	/**
	 * Parâmetros opcionais do erro.
	 * @type {Record<string, string>}
	 * @default undefined
	 */
	params: z.record(z.string()).optional(),

	/**
	 * Namespace da chave de tradução.
	 * Define um escopo para a chave de tradução. Caso não seja informado, assume o valor padrão "common".
	 * @type {string}
	 * @default "common"
	 */
	namespace: z.string().default("common").optional(),
	/**
	 * Código do erro opcional.
	 * @type {string}
	 * @default undefined
	 */
	code: z.string().optional(),
	/**
	 * Detalhes adicionais do erro.
	 * @type {unknown}
	 * @default undefined
	 */
	error: z.unknown().optional(),
	origin: z.string().optional()
});

type GenerateI18nErrorType = z.infer<typeof generateI18nErrorSchema> & { context?: IContext };

export default GenerateI18nErrorType;
