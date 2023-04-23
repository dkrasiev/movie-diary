import { REDIS_URL } from '$env/static/private';
import Redis from 'ioredis';

export default new Redis(REDIS_URL);
