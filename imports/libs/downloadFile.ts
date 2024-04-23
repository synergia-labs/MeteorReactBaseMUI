export const downloadFile = (url, name) => {
	const urlPart = url.split('/');

	const fileName = name || urlPart[urlPart.length - 1];
	const downloadFileElement = document.createElement('a');
	downloadFileElement.setAttribute('href', url);
	downloadFileElement.setAttribute('download', `${fileName}`);
	downloadFileElement.setAttribute('target', '_blank');
	document.body.appendChild(downloadFileElement); // required for firefox
	downloadFileElement.click();
	downloadFileElement.remove();
};
