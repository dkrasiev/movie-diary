// See https://kit.svelte.dev/docs/types#app

import type PocketBase, { Admin, Record } from 'pocketbase';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			pb: PocketBase;
			user: Record | Admin | null;
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
