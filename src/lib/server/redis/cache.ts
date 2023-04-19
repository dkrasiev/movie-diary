import type { RequireAtLeastOne } from '$lib/misc/require-at-lease-one';
import { getJson, setJson } from './client';

type RedisCacheOptions<Args extends unknown[]> = RequireAtLeastOne<
	{
		prefix: string;
		delimiter?: string;
		keyFn: (...args: Args) => string;
	},
	'prefix' | 'keyFn'
>;

export function RedisCache<This, Args extends unknown[], Return>({
	keyFn,
	prefix,
	delimiter
}: RedisCacheOptions<Args>) {
	return function (
		target: (this: This, ...args: Args) => Promise<Return>,
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		context: ClassMethodDecoratorContext<This, (this: This, ...args: Args) => Promise<Return>>
	) {
		return async function (this: This, ...args: Args): Promise<Return> {
			const key = keyFn ? keyFn(...args) : [prefix, ...args].join(delimiter || ':');

			const cache = await getJson<Return>(key);
			if (cache) {
				return cache;
			}

			const result = target.call(this, ...args);
			if (result) {
				await setJson(key, result);
			}

			return result;
		};
	};
}
