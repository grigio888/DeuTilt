import { getPost } from '$db/models/utils/posts';
import { getComments } from '$db/models/utils/comments';

export async function GET({ params, url }) {
	var { slug } = params;
	var page = Number(url.searchParams.get('page')) || 1;

	// Get the post by slug
	var post = await getPost({ slug });
	if (!post) {
		return new Response(JSON.stringify({ error: 'Post não encontrado' }), { status: 404 });
	}

	// Fetch comments
	var comments = await getComments({ post, page });

	return new Response(JSON.stringify(comments), {
		headers: { 'Content-Type': 'application/json' }
	});
}
