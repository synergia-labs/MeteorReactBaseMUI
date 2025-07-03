/**
 * Módulo de definição do esquema de erro internacionalizado (i18nErrorSchema)
 * utilizando a biblioteca Zod para validação de dados.
 *
 * @module i18nErrorSchema
 */

import { z } from "zod";

/**
 * Esquema de validação para erros internacionalizados.
 *
 * - `_id`: Identificador opcional do erro.
 * - `title`: Título do erro (obrigatório, não pode estar vazio).
 * - `message`: Mensagem opcional descritiva do erro.
 * - `code`: Código opcional do erro. (ex: "404", "500", etc.) - Erros HTTP
 */
export const i18nErrorSchema = z.object({
	_id: z.string().optional(),
	title: z.string().nonempty("Title is required"),
	message: z.string().optional(),
	code: z.string().optional()
});

type I18nErrorType = z.infer<typeof i18nErrorSchema>;

export default I18nErrorType;
