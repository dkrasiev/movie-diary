// See https://kit.svelte.dev/docs/types#app

import type { UserDTO } from '@dkrasiev/movie-diary-core';

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
