export interface IBaseOptions {
  noImagePath?: string;
  disableDefaultPublications?: boolean;
}

export interface IProductBaseOptions extends IBaseOptions {
  enableSubscribeObserver?: boolean;
  enableCallMethodObserver?: boolean;
}
