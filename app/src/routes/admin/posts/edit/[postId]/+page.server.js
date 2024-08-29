import { error } from '@sveltejs/kit';

import Posts from '$db/models/posts';

export async function load({ params }) {
	const { postId } = params;

	let post = await Posts.findOne({
		where: { id: postId },
		include: ['Tags']
	});

	if (!post) {
		error(404, 'Post not found');
	}

	return {
		post: post.toJSON()
	};
}
