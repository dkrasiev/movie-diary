import { POCKETBASE_EMAIL, POCKETBASE_PASSWORD, POCKETBASE_URL } from '$env/static/private';
import PocketBase from 'pocketbase';

export const rootPb = new PocketBase(POCKETBASE_URL);

await rootPb.admins.authWithPassword(POCKETBASE_EMAIL, POCKETBASE_PASSWORD);
rootPb.autoCancellation(false);
