import { error } from '@sveltejs/kit';

import { translate as _ } from '$i18n/translate';

import Posts from '$db/models/posts';

export async function load({ params }) {
	const { postId } = params;

	let post = await Posts.findOne({
		where: { id: postId },
		include: ['Tags']
	});

	if (!post) {
		error(404, _('Post não encontrado'));
	}

	return {
		post: post.toJSON()
	};
}
