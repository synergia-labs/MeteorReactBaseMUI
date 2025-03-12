import { AuditType } from '/imports/base/types/audit';

export interface IArchive {
	_id: string;
	name: string;
	type: string; // Exemplo: "image/png"
	size: number;
	path: string;
	extension: string;
	meta?: AuditType;
	isVideo?: boolean;
	isAudio?: boolean;
	isImage?: boolean;
	isText?: boolean;
	extensionWithDot?: string;
	mime?: string;
	copies?: Record<string, any>;
	link: (version?: string) => string; // Função para obter o link da imagem
}
