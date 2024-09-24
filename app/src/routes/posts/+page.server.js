import { getPosts } from '$db/models/utils/posts';

export async function load({ url }) {
	let page = url.searchParams.get('page');
	if (!page || isNaN(page) || page < 1) page = 1;

	const tag = url.searchParams.get('tag');

	const pagination = await getPosts({ page, tag });

	return {
		pagination
	};
}
