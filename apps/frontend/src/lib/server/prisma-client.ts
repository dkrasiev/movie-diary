import { PrismaClient } from 'database';

const prismaClient = new PrismaClient();
await prismaClient.$connect();

export default prismaClient;
