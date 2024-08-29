import { Tags } from '$db/models/posts';

export async function load() {
	return {
		tags: (await Tags.findAll()).map((tag) => tag.toJSON())
	};
}
