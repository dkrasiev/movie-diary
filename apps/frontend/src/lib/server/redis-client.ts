import { env } from '$env/dynamic/private';
import Redis from 'ioredis';

export default new Redis(env.REDIS_URL);
