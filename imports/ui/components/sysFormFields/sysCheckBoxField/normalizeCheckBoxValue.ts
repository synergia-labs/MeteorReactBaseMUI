/**
 * Normaliza valores vindos de documentos antigos ou de schemas malformados.
 * O checkbox múltiplo trabalha exclusivamente com listas.
 */
export const normalizeCheckBoxValue = (value: unknown): unknown[] => (Array.isArray(value) ? [...value] : []);
