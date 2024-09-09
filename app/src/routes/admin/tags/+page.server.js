import { redirect, error } from '@sveltejs/kit';

import { translate as _ } from '$i18n/translate';

import { Tags } from '$db/models/posts';

export async function load() {
	// redirect to the admin page
	return redirect(302, '/admin');
}

export const actions = {
	tagForm: async ({ request }) => {
		const formData = await request.formData();
		const entries = Object.fromEntries(formData);

		if (entries.id) {
			await editTag(entries);
		} else {
			await createTag(entries);
		}

		return redirect(302, `/admin/tags/edit`);
	}
};

async function createTag(tagData) {
	// validation of the data
	if (!tagData.slug) error(400, _('Slug é obrigatório'));
	else if (!tagData.title) error(400, _('Titulo é obrigatório'));
	else if (!tagData.color) error(400, _('Cor é obrigatório'));

	delete tagData.id;
	let target = {
		slug: tagData?.slug,
		title: tagData?.title,
		color: tagData?.color,
		icon: tagData?.icon
	};
	return await Tags.create(target);
}

async function editTag(tagData) {
	const tag = await Tags.findByPk(tagData.id);

	if (!tag) {
		error(404, _('Post não encontrado'));
	}

	delete tagData.id;
	let target = {
		slug: tagData?.slug,
		title: tagData?.title,
		color: tagData?.color,
		icon: tagData?.icon
	};
	return await tag.update(target);
}
