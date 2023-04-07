import { createClient } from "redis";

const client = createClient({
  url: import.meta.env.REDIS_URL,
});

// TODO: throws error: see https://github.com/arthurfiorette/axios-cache-interceptor/issues/524
// export const redisStorage = buildStorage({
//   set: (key: string, value: NotEmptyStorageValue): MaybePromise<void> => {
//     client.set(key, value);
//   },
//   remove: (key: string): MaybePromise<void> => {
//     client.del(key);
//   },
//   find: (key: string): MaybePromise<StorageValue> => {
//     return client.get(key);
//   },
// });
