import Posts from '$db/models/posts';
import paginate from '$db/utils/pagination';

export async function load() {
    const pagination = await paginate({
        model: Posts,
        page: 1,
        pageSize: 10,
        order: [ [ 'createdAt', 'DESC' ] ],
        returnAsJson: true
    });

    return {
        pagination
    };
}