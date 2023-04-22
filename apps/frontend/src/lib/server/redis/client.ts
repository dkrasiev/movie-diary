import { REDIS_URL } from '$env/static/private';
import Redis from 'ioredis';

const client = new Redis(REDIS_URL);

export async function getJson<T>(key: string): Promise<T | undefined> {
	try {
		return client.call('JSON.GET', key) as T;
	} catch (e) {
		console.error(e);
		return undefined;
	}
}

export async function setJson<T extends object>(key: string, value: T): Promise<void> {
	await client.call('JSON.SET', key, JSON.stringify(value));
}

export default client;
