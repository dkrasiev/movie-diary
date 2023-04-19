// See https://kit.svelte.dev/docs/types#app

import type { UserDTO } from '$lib/dtos/user-dto';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user?: UserDTO;
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
