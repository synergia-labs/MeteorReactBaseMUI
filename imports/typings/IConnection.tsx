export interface IConnection {
	id: string;
	close: () => any;
	onClose: () => any;
	clientAddress: string;
	httpHeaders: {
		'x-forwarded-for': string;
		'x-forwarded-port': string;
		'x-forwarded-proto': string;
		host: string;
		'user-agent': string;
		'accept-language': string;
	};
}
