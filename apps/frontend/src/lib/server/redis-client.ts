import { REDIS_URL } from '$env/static/private';
import Redis from 'ioredis';

const redisClient = new Redis(REDIS_URL);

export async function getJson<T>(key: string): Promise<T | undefined> {
	try {
		return redisClient.call('JSON.GET', key) as T;
	} catch (e) {
		console.error(e);
		return undefined;
	}
}

export async function setJson<T extends object>(key: string, value: T): Promise<void> {
	await redisClient.call('JSON.SET', key, JSON.stringify(value));
}

export default redisClient;
