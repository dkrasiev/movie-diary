export async function load({ locals, url }) {
	return {
		user: locals.user,
		pathname: url.pathname
	};
}
