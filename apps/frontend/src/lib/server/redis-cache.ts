import { RedisCacheFactory } from '@movie-diary/core';
import client from './redis-client';

export const RedisCache = RedisCacheFactory(client);
