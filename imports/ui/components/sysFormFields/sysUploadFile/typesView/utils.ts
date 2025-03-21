type FilesType = "text" | "audio" | "image" | "video" | "application" | "default";
export function getTypeOfFile(mimeType: string): FilesType {
	const type: FilesType = mimeType?.split("/")[0] as FilesType;
	return type;
}

export function getTypeOfURL(url: string): FilesType {
	const fonts = url.split("/");

	if (fonts.includes("audio")) return "audio";
	else if (fonts.includes("image")) return "image";
	else if (fonts.includes("video")) return "video";
	else return "default";
}
