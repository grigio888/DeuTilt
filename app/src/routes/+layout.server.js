export async function load({ locals, url }) {
	return {
		lang: locals?.lang,
		url: url.href,
		user: locals?.user?.toJSON(),
		theme: locals?.theme
	};
}
