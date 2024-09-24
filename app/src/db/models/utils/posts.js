import { error } from '@sveltejs/kit';
import { Op } from 'sequelize';

import { translate as _ } from '$i18n/translate';

import Posts from '$db/models/posts';

export async function getPost({ slug }) {
	let post = await Posts.findOne({
		where: { slug },
		include: ['Author', 'Tags']
	});

	if (!post) error(404, _('Post não encontrado'));

	return post;
}

export async function getRelatedPosts({ post }) {
	return await Posts.findAll({
		where: {
			id: {
				[Op.ne]: post.id
			}
		},
		include: ['Tags'],
		order: [['views', 'DESC']],
		limit: 3
	});
}
