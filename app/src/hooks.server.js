import { PUBLIC_COOKIE_SECURE } from '$env/static/public';

import User from '$db/models/user';
import { locale } from '$i18n/store.js';

export async function handle({ event, resolve }) {
	// »»»»» Locals
	// create a locals object if it doesn't exist
	event.locals = event.locals ?? {};

	// »»»»» Language
	// configuring the language
	const requestLanguage = event.request.headers.get('accept-language')?.split(',')[0].split('-')[0];

	event.locals.lang = requestLanguage ?? 'en';

	locale.set(event.locals.lang);

	// »»»»» Theme
	// configuring the theme
	event.locals.theme = 'dark';

	let theme = event.cookies.get('theme');
	if (theme) {
		event.locals.theme = theme;
	}

	// »»»»» User
	// configuring the user
	event.locals.user = undefined;

	let user = event.cookies.get('user');
	if (user) {
		event.locals.user = await User.findOne({ where: { password: user }, include: 'Role' });

		if (!event.locals.user) {
			event.cookies.delete('user', { path: '/', secure: JSON.parse(PUBLIC_COOKIE_SECURE) });
		}
	}

	// »»»»» Rendering
	// transforming the page chunk
	return resolve(event, {
		transformPageChunk: ({ html }) =>
			html.replace('%lang%', event.locals.lang).replace('%theme%', event.locals.theme)
	});
}
