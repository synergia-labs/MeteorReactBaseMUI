export interface IBaseOptions {
    noImagePath?: string
    disableDefaultPublications?: boolean
    resources?: any
}

export interface IProductBaseOptions extends IBaseOptions {
    enableSubscribeObserver?: boolean
    enableCallMethodObserver?: boolean
}
