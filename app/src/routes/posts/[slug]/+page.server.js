import { error } from '@sveltejs/kit';

import { translate as _ } from '$i18n/translate';

import { Comments } from '$db/models/posts';

import { getPost, getRelatedPosts } from '$db/models/utils/posts';
import { getComments } from '$db/models/utils/comments';


export async function load({ params }) {
	// fetching Post by slug
	let { slug } = params;

	let post = await getPost({ slug });

	post.views++;
	await post.save();

	// Fetching related posts that most match the current post's tags
	let relatedPosts = await getRelatedPosts({ post });

	return {
		post: post.toJSON(),
        comments: await getComments({ post }),
		relatedPosts: relatedPosts.map((post) => post.toJSON())
	};
}

export const actions = {
	default: async ({ locals, request, params }) => {
        // Fetching Post by slug
        let { slug } = params;
        let post = await getPost({ slug });

        // Comment form
        const formData = await request.formData();
		const entries = Object.fromEntries(formData);

        // Validation
        if (!entries.comment) {
            error(400, _('É necessário adicionar uma mensagem ao comentário.'));
        }

        if (!locals.user && (!entries.name || !entries.email)) {
            error(400, _('É necessário adicionar seu nome e e-mail.'));
        }

        // Creating the comment
        await Comments.create({
            postId: post.id,
            userId: locals.user ? locals.user.id : null,
            name: locals.user ? locals.user.name : entries.name,
            email: locals.user ? locals.user.email : entries.email,
            content: entries.comment,
        });

        return {
            comments: await getComments({ post })
        };
    }
};