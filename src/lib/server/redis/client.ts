import { REDIS_URL } from '$env/static/private';
import { Client } from 'redis-om';

const client = await new Client().open(REDIS_URL);

export async function getJson<T>(key: string): Promise<T | undefined> {
	try {
		return client.jsonget(key) as T;
	} catch (e) {
		console.error(e);
		return undefined;
	}
}

export async function setJson<T extends object>(key: string, value: T): Promise<void> {
	await client.jsonset(key, value);
}

export default client;
