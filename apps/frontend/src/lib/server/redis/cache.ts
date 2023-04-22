import type { RequireAtLeastOne } from '$lib/misc/require-at-lease-one';
import type Redis from 'ioredis';
import client from './client';

type RedisCacheOptions<Args extends unknown[]> = RequireAtLeastOne<
	{
		prefix: string;
		delimiter?: string;
		keyFn: (...args: Args) => string;
	},
	'prefix' | 'keyFn'
>;

/**
 * Returns RedisCache decorator
 * @param redis Redis client
 * @param debug Enable log to console
 * @returns
 */
export function RedisCacheFactory(redis: Redis, debug = false) {
	return function RedisCache<Args extends unknown[], Return>(options: RedisCacheOptions<Args>) {
		const { prefix, keyFn, delimiter } = options;

		return function (
			target: unknown,
			key: string,
			descriptor: TypedPropertyDescriptor<(...args: Args) => Promise<Return>>
		) {
			function log(...args: unknown[]) {
				if (debug) {
					console.log('REDIS CACHE:', ...args);
				}
			}
			const originalMethod = descriptor.value;

			if (typeof originalMethod === 'function') {
				descriptor.value = async function (...args: Args) {
					const key = keyFn ? keyFn(...args) : [prefix, ...args].join(delimiter || ':');
					log('args:', args);
					log('key:', key);

					const redisData = await redis.call('JSON.GET', key, '$');
					if (typeof redisData === 'string') {
						const cache = JSON.parse(redisData)[0] as Return;
						if (cache) {
							log('cache hit');
							return cache;
						}
					}

					log('cache miss');
					const result = await originalMethod.call(this, ...args);
					if (result) {
						log('caching');
						await redis.call('JSON.SET', key, '$', JSON.stringify(result));
					}

					return result;
				};
			}
		};
	};
}

export default RedisCacheFactory(client);
