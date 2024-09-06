import { error } from '@sveltejs/kit';

import { translate as _ } from '$i18n/translate';

import { Tags } from '$db/models/posts';

export async function load({ params }) {
	const { tagId } = params;

	let tag = await Tags.findOne({
		where: { id: tagId },
	});

	if (!tag) {
		error(404, _('Post não encontrado'));
	}

	return {
		tag: tag.toJSON()
	};
}
