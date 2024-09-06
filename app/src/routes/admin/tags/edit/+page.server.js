import { Tags } from '$db/models/posts';
import paginate from '$db/utils/pagination';

export async function load({ url }) {
	let page = url.searchParams.get('page');
	if (!page || isNaN(page) || page < 1) page = 1;

	const pagination = await paginate({
		model: Tags,
		page: page,
		pageSize: 10,
		order: [['createdAt', 'DESC']],
		returnAsJson: true
	});

	return {
		pagination
	};
}
