import { error } from '@sveltejs/kit';

import { translate as _ } from '$i18n/translate';

import Posts from '$db/models/posts';

export async function load({ params }) {
	let { slug } = params;

	let post = await Posts.findOne({
		where: { slug },
		include: ['Author', 'Tags']
	});

	if (!post) error(404, _('Post não encontrado'));

	post.views++;
	await post.save();

	return {
		post: post.toJSON()
	};
}
