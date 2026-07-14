import { MongoInternals } from 'meteor/mongo';
import { WebApp } from 'meteor/webapp';

const json = (res: any, status: number, body: Record<string, string>) => {
	res.writeHead(status, {
		'Content-Type': 'application/json; charset=utf-8',
		'Cache-Control': 'no-store'
	});
	res.end(JSON.stringify(body));
};

WebApp.connectHandlers.use('/health/live', (_req, res) => json(res, 200, { status: 'ok' }));

WebApp.connectHandlers.use('/health/ready', async (_req, res) => {
	try {
		const { client } = MongoInternals.defaultRemoteCollectionDriver().mongo;
		await client.db().command({ ping: 1 });
		json(res, 200, { status: 'ready' });
	} catch {
		json(res, 503, { status: 'unavailable' });
	}
});
