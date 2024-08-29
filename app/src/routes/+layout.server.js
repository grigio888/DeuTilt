export async function load({ locals, url }) {
	return {
		lang: locals?.lang,
		url: url.pathname,
		user: locals?.user.toJSON(),
		theme: locals?.theme
	};
}
