import { PUBLIC_COOKIE_SECURE } from '$env/static/public';
import { Op } from 'sequelize';

import { getPosts } from '$db/models/utils/posts';
import Posts from '$db/models/posts';

export async function load() {
	const carouselItems = (
		await Posts.findAll({
			where: {
				published: true,
				createdAt: {
					[Op.gte]: new Date(new Date() - 7 * 24 * 60 * 60 * 1000)
				}
			},
			limit: 10,
			include: 'Tags',
			order: [['views', 'DESC']]
		})
	).map((post) => post.toJSON());

	const posts = await getPosts({ page: 1 });

	return {
		carouselItems,
		posts
	};
}

export const actions = {
	setTheme: async ({ request, cookies }) => {
		let formData = await request.formData();
		let entries = Object.fromEntries(formData);
		let { theme } = entries;

		cookies.set('theme', theme, { path: '/', secure: JSON.parse(PUBLIC_COOKIE_SECURE) });
	}
};
