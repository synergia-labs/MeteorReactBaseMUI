import { ArchiveType, ArchiveSch } from "/imports/types/archive";

/**
 * Busca os metadados de uma imagem a partir de uma URL fornecida e os retorna como um objeto
 * que segue o esquema `ArchiveType`.
 *
 * @param url - A URL da imagem para buscar os metadados.
 * @returns Uma promise que resolve para um objeto `ArchiveType` contendo os metadados da imagem.
 * @throws Lança um erro se a requisição falhar ou se a resposta não for OK.
 *
 * A função garante que apenas imagens seguras sejam processadas, validando:
 * - `Content-Type`: Deve começar com `image/`, evitando downloads de HTML ou executáveis.
 * - Extensão do arquivo: Se não estiver explícita na URL, será inferida pelo `Content-Type`.
 * - Tamanho máximo: Evita downloads excessivamente grandes.
 */

async function fetchImageMetadata(url: string): Promise<ArchiveType> {
	const response = await fetch(url);
	validateResponse(response);

	const { contentType, size } = extractHeaders(response);
	const { name, extension } = extractFileNameAndExtension(url, contentType);

	const buffer = await convertToBuffer(response);

	const imageData: ArchiveType = {
		alt: name,
		name: name + extension,
		type: contentType,
		size,
		content: buffer
	};

	return ArchiveSch.parse(imageData);
}

function validateResponse(response: Response): void {
	if (!response.ok) {
		throw new Meteor.Error(`Erro ao baixar a imagem: ${response.statusText}`);
	}
}

function extractHeaders(response: Response): { contentType: string; size: number } {
	const contentType = response.headers.get("content-type") || "unknown";
	if (!contentType.startsWith("image/")) {
		throw new Meteor.Error(`Tipo de arquivo inválido: ${contentType}`);
	}

	const contentLength = response.headers.get("content-length");
	const size = contentLength ? parseInt(contentLength, 10) : 0;
	const maxSize = 25 * 1024 * 1024;

	if (size > maxSize) {
		throw new Meteor.Error("A imagem excede o tamanho máximo permitido (25MB).");
	}

	return { contentType, size };
}

function extractFileNameAndExtension(url: string, contentType: string): { name: string; extension: string } {
	const allowedExtensions = [".jpg", ".jpeg", ".png", ".gif", ".bmp", ".webp"];
	const urlParts = url.split("/");
	const name = urlParts[urlParts.length - 1] || "unknown";

	let extension = name.includes(".") ? name.slice(name.lastIndexOf(".")).toLowerCase() : "";

	if (!extension || !allowedExtensions.includes(extension)) {
		const contentTypeMapping: Record<string, string> = {
			"image/jpeg": ".jpg",
			"image/png": ".png",
			"image/gif": ".gif",
			"image/bmp": ".bmp",
			"image/webp": ".webp"
		};

		extension = contentTypeMapping[contentType] || "";
	}

	if (!allowedExtensions.includes(extension)) {
		throw new Meteor.Error(`Extensão de arquivo não permitida: ${extension}`);
	}

	return { name, extension };
}

async function convertToBuffer(response: Response): Promise<Buffer> {
	const arrayBuffer = await response.arrayBuffer();
	return Buffer.from(arrayBuffer);
}

export default fetchImageMetadata;
