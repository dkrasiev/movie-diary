import { RedisCacheFactory } from '@dkrasiev/movie-diary-core';
import redisClient from './redis-client';

export const RedisCache = RedisCacheFactory(redisClient, {
	debug: true
});
