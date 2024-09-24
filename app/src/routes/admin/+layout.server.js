import { redirect } from '@sveltejs/kit';

export async function load({ locals }) {
	if (!locals.user) {
		redirect(302, '/auth/');
	} else if (locals.user.Role?.slug !== 'admin') {
		redirect(302, '/');
	}

	return {};
}
