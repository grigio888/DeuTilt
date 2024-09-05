import Posts from '$db/models/posts';
import { Tags } from '$db/models/posts';
import paginate from '$db/utils/pagination';

export async function load({ url }) {
	let page = url.searchParams.get('page');
	if (!page || isNaN(page) || page < 1) page = 1;

	const tag = url.searchParams.get('tag');

	const pagination = await paginate({
		model: Posts,
		page: page,
		pageSize: 10,
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

	return {
		pagination
	};
}
