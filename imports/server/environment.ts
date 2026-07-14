const positiveIntegerVariables = [
	'MAX_PUBLICATION_LIMIT',
	'MAX_COUNTER_LIMIT',
	'MAX_EXPORT_LIMIT',
	'MAX_THUMBNAIL_DIMENSION',
	'MAX_UPLOAD_BYTES',
	'DDP_METHODS_PER_MINUTE',
	'DDP_SUBSCRIPTIONS_PER_MINUTE'
];

const assertUrl = (name: string, value: string | undefined, protocols: string[]) => {
	if (!value) return;
	let parsed: URL;
	try {
		parsed = new URL(value);
	} catch {
		throw new Error(`${name} deve ser uma URL válida.`);
	}
	if (!protocols.includes(parsed.protocol)) throw new Error(`${name} usa um protocolo não permitido.`);
};

export const validateEnvironment = () => {
	for (const name of positiveIntegerVariables) {
		const value = process.env[name];
		if (value !== undefined && (!Number.isInteger(Number(value)) || Number(value) <= 0)) {
			throw new Error(`${name} deve ser um inteiro positivo.`);
		}
	}

	assertUrl('ROOT_URL', process.env.ROOT_URL, ['http:', 'https:']);
	assertUrl('MONGO_URL', process.env.MONGO_URL, ['mongodb:', 'mongodb+srv:']);
	for (const origin of (process.env.CORS_ORIGINS || '')
		.split(',')
		.map((item) => item.trim())
		.filter(Boolean)) {
		if (origin !== '*') assertUrl('CORS_ORIGINS', origin, ['http:', 'https:']);
	}
	const requireTogether = (names: string[]) => {
		const supplied = names.filter((name) => Boolean(process.env[name])).length;
		if (supplied > 0 && supplied < names.length) throw new Error(`Defina ${names.join(', ')} em conjunto.`);
	};
	requireTogether(['GOOGLE_CLIENT_ID', 'GOOGLE_CLIENT_SECRET']);
	requireTogether(['FACEBOOK_APP_ID', 'FACEBOOK_SECRET']);
	requireTogether(['MAIL_URL_SMTP', 'MAIL_NO_REPLY', 'MAIL_SYSTEM']);

	if (process.env.NODE_ENV === 'production') {
		if (!process.env.ROOT_URL || !process.env.MONGO_URL)
			throw new Error('ROOT_URL e MONGO_URL são obrigatórias em produção.');
		if (process.env.CORS_ORIGINS?.split(',').includes('*'))
			throw new Error('CORS_ORIGINS não pode usar * em produção.');
		if (!process.env.MEDIA_ACCESS_TOKEN || process.env.MEDIA_ACCESS_TOKEN.length < 32) {
			throw new Error('MEDIA_ACCESS_TOKEN compartilhado, com ao menos 32 caracteres, é obrigatório em produção.');
		}
	}
};

validateEnvironment();
