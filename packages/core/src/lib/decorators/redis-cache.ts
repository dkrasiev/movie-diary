import { Redis } from "ioredis";

type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<
  T,
  Exclude<keyof T, Keys>
> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>;
  }[Keys];

type RedisCacheOptions<Args extends unknown[] = unknown[]> = RequireAtLeastOne<
  {
    prefix: string;
    delimiter?: string;
    keyFn: (...args: Args) => string;
  },
  "prefix" | "keyFn"
>;

interface RedisCacheFactoryOptions {
  debug?: boolean;
  globalPrefix?: string;
  ttl?: number;
}

/**
 * Returns RedisCache decorator
 * @param redis Redis client
 * @param debug Enable log to console
 * @returns
 */
export function RedisCacheFactory(
  redis: Redis,
  { globalPrefix, debug, ttl }: RedisCacheFactoryOptions = { debug: false }
) {
  const defaultOptions: Partial<RedisCacheOptions> = {
    delimiter: ":",
  };

  return function RedisCache<Args extends unknown[], Return>(
    options?: RedisCacheOptions<Args>
  ) {
    const { prefix, delimiter, keyFn } = {
      ...defaultOptions,
      ...options,
    };

    function getKey(...args: Args) {
      if (keyFn) {
        return [globalPrefix, keyFn(...args)].filter(Boolean).join(delimiter);
      }

      return [globalPrefix, prefix, ...args].filter(Boolean).join(delimiter);
    }

    return function (
      target: unknown,
      key: string,
      descriptor: TypedPropertyDescriptor<(...args: Args) => Promise<Return>>
    ) {
      function log(...args: unknown[]) {
        if (debug) {
          console.log("REDIS CACHE", ...args);
        }
      }
      const originalMethod = descriptor.value;

      if (typeof originalMethod === "function") {
        descriptor.value = async function (...args: Args) {
          const key = getKey(...args);

          const redisData = await redis.call("JSON.GET", key, "$");
          if (typeof redisData === "string") {
            const cache = JSON.parse(redisData)[0] as Return;
            if (cache) {
              log("hit", key);
              return cache;
            }
          }

          log("miss", key);
          const result = await originalMethod.call(this, ...args);
          if (result) {
            log("caching", key);
            await redis.call("JSON.SET", key, "$", JSON.stringify(result));
            if (ttl) {
              await redis.expire(key, ttl);
            }
          }

          return result;
        };
      }
    };
  };
}
