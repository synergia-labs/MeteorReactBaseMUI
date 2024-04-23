export interface IBaseOptions {
	saveImageToDisk?: boolean;
	noImagePath?: string;
	disableDefaultPublications?: boolean;
	resources?: any;
}

export interface IProductBaseOptions extends IBaseOptions {
	enableSubscribeObserver?: boolean;
	enableCallMethodObserver?: boolean;
}
