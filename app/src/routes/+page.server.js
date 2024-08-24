import Posts from '$db/models/posts';

export async function load() {
	const carouselItems = (await Posts.findAll({ limit: 10, include: 'Tags' })).map((post) =>
		post.toJSON()
	);

	return {
		carouselItems
	};
}
