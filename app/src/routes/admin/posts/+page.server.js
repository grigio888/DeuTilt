import { redirect, error } from '@sveltejs/kit';

import Posts from '$db/models/posts';
import { Tags } from '$db/models/posts';

import { generateSlug } from '$db/utils/autoGenerator';

export async function load() {
	// redirect to the admin page
	return redirect(302, '/admin');
}

export const actions = {
	default: async ({ locals, request }) => {
		const formData = await request.formData();
		const entries = Object.fromEntries(formData);

		entries.categories = formData.getAll('category[]');

		let post;
		if (entries.id) {
			post = await editPost(entries);
			await post.setTags([]);
		} else {
			post = await createPost(entries, locals.user.id);
		}

		if (entries.categories) {
			let categories = await Tags.findAll({
				where: {
					slug: entries.categories
				}
			});

			await post.setTags(categories);
		}

		return redirect(302, `/posts/${post.slug}`);
	}
};

async function createPost(postData, userId) {
	if (!postData.imageHeader) {
		error(400, 'Image header is required');
	}

	const post = await Posts.create({
		slug: await generateSlug(postData.title),
		title: postData.title,
		subTitle: postData.subTitle,
		imageHeader: postData.imageHeader,
		content: postData.content,
		createdBy: userId
	});

	return post;
}

async function editPost(postData) {
	const post = await Posts.findByPk(postData.id);

	if (!post) {
		error(404, 'Post not found');
	}

	let data = {
		slug: await generateSlug(postData.title),
		title: postData.title,
		subTitle: postData.subTitle,
		content: postData.content
	};

	if (postData.imageHeader && postData.imageHeader !== post.imageHeader) {
		data.imageHeader = postData.imageHeader;
	}

	await post.update(data);

	return post;
}
