import { error } from '@sveltejs/kit';
import Posts from '$db/models/posts';

export async function load({ params }) {
	let { slug } = params;

	let post = await Posts.findOne({
		where: { slug },
		include: ['Author', 'Tags']
	});

	if (!post) error(404, 'Post not found');

	post.views++;
	await post.save();

	return {
		post: post.toJSON()
	};
}
