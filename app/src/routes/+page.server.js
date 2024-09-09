import { PUBLIC_COOKIE_SECURE } from '$env/static/public';
import { Op } from 'sequelize';

import Posts from '$db/models/posts';
import paginate from '$db/utils/pagination';

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

	const posts = await paginate({
		model: Posts,
		page: 1,
		pageSize: 10,
		where: { published: true },
		order: [['publishedAt', 'DESC']],
		include: ['Tags'],
		returnAsJson: true
	});

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
