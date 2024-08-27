import { Op } from 'sequelize';
import Posts from '$db/models/posts';

export async function load() {
	const carouselItems = (
		await Posts.findAll({
			where: {
				createdAt: {
					[Op.gte]: new Date(new Date() - 7 * 24 * 60 * 60 * 1000)
				}
			},
			limit: 10,
			include: 'Tags',
			order: [['views', 'DESC']]
		})
	).map((post) => post.toJSON());

	return {
		carouselItems
	};
}
