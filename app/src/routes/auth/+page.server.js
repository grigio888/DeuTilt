import { PUBLIC_COOKIE_SECURE } from '$env/static/public';
import { fail, redirect } from '@sveltejs/kit';

import User from '$db/models/User';
import { comparePassword } from '$db/utils/password';

export async function load({ parent }) {
	const { user } = await parent();
	if (user) {
		redirect(302, user.Role?.slug == 'admin' ? '/admin/' : '/');
	}

	return {};
}

export const actions = {
	login: async ({ request, cookies }) => {
		const formData = await request.formData();
		const entries = Object.fromEntries(formData);

		if (!entries.username || !entries.password) {
			return fail(400, {
				error: 'Username and/or password are required.'
			});
		}

		let user = await User.findOne({ username: entries.username });

		if (!user || !comparePassword(entries.password, user.password)) {
			return fail(401, {
				error: 'Invalid username and/or password.'
			});
		}

		cookies.set('user', user.password, { path: '/', secure: JSON.parse(PUBLIC_COOKIE_SECURE) });
	},
    logout: async ({ cookies }) => {
        cookies.delete('user', { path: '/', secure: JSON.parse(PUBLIC_COOKIE_SECURE)  });
    }
};
