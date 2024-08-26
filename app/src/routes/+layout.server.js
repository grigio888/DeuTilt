export async function load({ locals }) {
	return {
		lang: locals?.lang,
        user: locals?.user.toJSON()
	};
}
