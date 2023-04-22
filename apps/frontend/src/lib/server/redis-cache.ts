import { RedisCacheFactory } from '@dkrasiev/movie-diary';
import redisClient from './redis-client';

export const RedisCache = RedisCacheFactory(redisClient);
