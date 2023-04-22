import { RedisCacheFactory } from '@movie-diary/core';
import redisClient from './redis-client';

export const RedisCache = RedisCacheFactory(redisClient);
