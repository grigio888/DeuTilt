import { Comments } from '$db/models/posts';
import paginate from '$db/utils/pagination';

export async function getComments({ post, page = 1 }) {
	return await paginate({
		model: Comments,
		page: page,
		pageSize: 10,
		where: { postId: post.id },
		order: [['createdAt', 'DESC']],
		include: ['User'],
		returnAsJson: true
	});
}
