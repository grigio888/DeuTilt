import { error } from '@sveltejs/kit';
import { Op } from 'sequelize';

import { translate as _ } from '$i18n/translate';

import sequelize from '$db/connector.js';
import Posts from '$db/models/posts';
import { Tags } from '$db/models/posts';

import paginate from '$db/utils/pagination';

export async function getPost({ slug }) {
	let post = await Posts.findOne({
		where: { slug },
		include: ['Author', 'Tags'],
		distinct: true
	});

	if (!post) error(404, _('Post não encontrado'));

	return post;
}

export async function getPosts({ page = 1, tag = undefined }) {
	return await paginate({
		model: Posts,
		page: page,
		where: { published: true },
		order: [['publishedAt', 'DESC']],
		include: [
			{
				model: Tags,
				as: 'Tags',
				where: tag ? { slug: tag } : null
			}
		],
		returnAsJson: true
	});
}

export async function getRelatedPosts({ post }) {
	return await Posts.findAll({
		where: {
			published: true,
			id: {
				[Op.ne]: post.id
			}
		},
		include: ['Tags'],
		attributes: {
			include: [
				[
					sequelize.literal(`(
                        SELECT COUNT(*)
                        FROM "PostTags" as pt
                        WHERE
                            pt."postId" = "Posts".id
                            AND pt."tagId" IN (
                                SELECT "tagId"
                                FROM "PostTags"
                                WHERE "postId" = ${post.id}
                            )
                    )`),
					'tag_match_count'
				]
			]
		},
		order: [
			[sequelize.literal('tag_match_count'), 'DESC'],
			['publishedAt', 'DESC']
		],
		limit: 3
	});
}
