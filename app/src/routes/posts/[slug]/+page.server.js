import { error } from '@sveltejs/kit';
import { Op } from 'sequelize';

import { translate as _ } from '$i18n/translate';

import Posts from '$db/models/posts';

export async function load({ params }) {
    // fetching Post by slug
    let { slug } = params;

	let post = await Posts.findOne({
		where: { slug },
		include: ['Author', 'Tags']
	});

	if (!post) error(404, _('Post não encontrado'));

	post.views++;
	await post.save();

    // Fetching related posts that most match the current post's tags
    let relatedPosts = await Posts.findAll({
        where: {
            id: {
                [Op.ne]: post.id
            }
        },
        include: [ 'Tags' ],
        order: [['views', 'DESC']],
        limit: 3
    });

	return {
		post: post.toJSON(),
        relatedPosts: relatedPosts.map((post) => post.toJSON())
	};
}
