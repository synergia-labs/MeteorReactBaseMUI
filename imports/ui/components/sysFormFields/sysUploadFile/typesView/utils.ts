type fileTypes = 'text' | 'audio' | 'image' | 'video' | 'application' | 'default';
export function getTypeOfFile(mimeType: string): fileTypes {
	const type: fileTypes = mimeType?.split('/')[0] as fileTypes;
	return type;
}

export function getTypeOfURL(url: string): fileTypes {
	const fonts = url.split('/');

	if (fonts.includes('audio')) return 'audio';
	else if (fonts.includes('image')) return 'image';
	else if (fonts.includes('video')) return 'video';
	else return 'default';
}
