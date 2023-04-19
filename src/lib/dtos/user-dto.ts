import type { User } from '@prisma/client';

export interface UserDTO {
	id: string;
	email: string;
	activated: boolean;
}

export function getUserDto(user: User): UserDTO {
	const { id, email, activated } = user;

	return {
		id,
		email,
		activated
	};
}
