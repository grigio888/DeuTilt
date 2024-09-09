import { redirect, error } from '@sveltejs/kit';
import fs from 'fs';

import { translate as _ } from '$i18n/translate';
import { generateSlug, uuidv4 } from '$db/utils/autoGenerator';

import Posts from '$db/models/posts';
import { Tags } from '$db/models/posts';
import path from 'path';

export async function load() {
	// redirect to the admin page
	return redirect(302, '/admin');
}

export const actions = {
	postForm: async ({ locals, request }) => {
		const formData = await request.formData();
		const entries = Object.fromEntries(formData);

		entries.categories = formData.getAll('category[]');

		let post;
		if (entries.id) {
			post = await editPost(entries, locals.user.id);
			await post.setTags([]);
		} else {
			post = await createPost(entries, locals.user.id);
		}

        post.published = 'draft' in entries ? false : true;
        if (post.published && !post.publishedAt) {
            post.publishedAt = new Date();
        }
        post.save();

		if (entries.categories) {
			let categories = await Tags.findAll({
				where: {
					slug: entries.categories
				}
			});

			await post.setTags(categories);
		}

		return redirect(302, `/admin/posts/edit`);
	},
    imageUpload: async ({ request }) => {
        const formData = await request.formData();
        const file = formData.get('image');
        const folder = formData.get('folder');

        let imagePath;
        let name = await uuidv4() + '.jpg';

        try {
            imagePath = await handleImageUpload({
                file,
                overwrite: false,
                name,
                folder: folder
            });
        } catch (e) {
            error(500, _('Erro ao salvar imagem') + '\n' + e.message);
        }

        console.log(imagePath);

        return [
            name,
            imagePath
        ]
    }
};

async function createPost(postData, userId) {
	if (!postData.imageHeader) {
		error(400, _('Imagem de capa é obrigatória'));
	}

    let slug = await generateSlug(postData.title);

	let imagePath;
	try {
		imagePath = await handleImageUpload({
            file: postData.imageHeader,
            folder: slug,
            overwrite: true
        });
	} catch (e) {
		error(500, _('Erro ao salvar imagem') + '\n' + e.message);
	}

	const post = await Posts.create({
		title: postData.title,
		subTitle: postData.subTitle,
		imageHeader: imagePath,
		content: postData.content,
		createdBy: userId,
        slug
	});

	return post;
}

async function editPost(postData, userId) {
	const post = await Posts.findByPk(postData.id);

	if (!post) {
		error(404, _('Post não encontrado'));
	}

	let data = {
		title: postData.title,
		subTitle: postData.subTitle,
		content: postData.content
	};

	if (postData.imageHeader.size != 0 && postData.imageHeader.name != '') {
		let imagePath = await handleImageUpload({
            file: postData.imageHeader,
            folder: post.slug,
            overwrite: true
        });
		data.imageHeader = imagePath;
	}

	data.editedBy = userId;
	data.editedAt = new Date();

	await post.update(data);

	return post;
}

async function handleImageUpload({file = undefined, overwrite = false, name = undefined, folder = ''}) {
	// this method will handle the image upload. The image should be saved under
	// `/vol/static/assets/posts/` and the return should be the path to
	// the image file.
    if (!file) {
        throw new Error('Arquivo não informado');
    }

	let filePath = `static/assets/posts/${folder ? folder + '/' : ''}${name ? name : file.name}`;

	if (!fs.existsSync(path.dirname(filePath))) {
		fs.mkdirSync(path.dirname(filePath), { recursive: true });
	}

    // verify if the file already exists
    if (!overwrite && fs.existsSync(filePath)) {
        throw new Error('Arquivo já existe');
    }

	const buffer = Buffer.from(await file.arrayBuffer());

	fs.writeFileSync(filePath, buffer);

	return '/' + filePath;
}
