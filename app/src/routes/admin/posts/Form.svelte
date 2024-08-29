<script>
	// »»»»» Imports
	import { enhance } from '$app/forms';

	import { translate as _ } from '$i18n/translate';

	// »»»»» Props
	let { post, tags } = $props();

	// »»»»» Components
	import Input from '$comp/commons/inputs/Input.svelte';
	import Select from '$comp/commons/selects/Select.svelte';
	import Icon from '$comp/commons/Icon.svelte';
	import Button from '$comp/commons/buttons/Button.svelte';

	// »»»»» Logic
	// image previewer
	let image = $state({
		src: post?.imageHeader,
		title: post?.imageHeader
			? post.imageHeader.split('/')[post.imageHeader.split('/').length - 1]
			: ''
	});
	let imageHeader;

	// select options
	let tagOptions = tags.map((tag) => ({
		value: tag.slug,
		text: tag.title,
		selected: post?.Tags?.find((target) => target.slug === tag.slug) ? true : false
	}));

	$effect(() => {
		imageHeader.addEventListener('change', (e) => {
			const file = e.target.files[0];
			const reader = new FileReader();

			reader.onload = (e) => {
				image.src = e.target.result;
				image.title = file.name;
			};

			reader.readAsDataURL(file);
		});
	});
</script>

<form action="/admin/posts/" method="POST" enctype="multipart/form-data" use:enhance>
	<input type="text" name="id" value={post?.id} hidden />
	<div class="row image">
		<p>Imagem Principal</p>
		<div class="frame">
			<img src={image?.src} alt="Imagem Principal" hidden={image?.src ? false : true} />
		</div>
		<div class="actions">
			<label for="image-header">
				<Icon icon="upload" />
				{_('Carregar Imagem Principal')}
			</label>
			<input
				bind:this={imageHeader}
				type="file"
				id="imageHeader"
				name="image-header"
				accept="image/*"
				hidden
			/>
			<p>{_('Arquivo')}: {image?.title}</p>
		</div>
	</div>
	<div class="row">
		<label for="title">
			{_('Titulo')}
		</label>
		<Input type="text" id="title" name="title" value={post?.title} required />
	</div>
	<div class="row">
		<label for="content">{_('Conteúdo')}</label>
		<Input element="textarea" id="content" name="content" value={post?.content} required />
	</div>
	<div class="row">
		<label for="category">{_('Categorias')}</label>
		<Select options={tagOptions} name="category" id="category" multiple />
	</div>
	<div class="row">
		<Button type="submit">{_('Publicar')}</Button>
		<Button secondary animated type="button" on:click={() => console.log('preview')}>
			{_('Prever Post')}
		</Button>
	</div>
</form>

<style lang="scss">
	form {
		display: grid;
		gap: 1em;

		width: 40em;

		padding: 1em;

		.row {
			display: grid;
			gap: 0.5em;

			&.image {
				display: flex;
				flex-wrap: wrap;

				> p {
					width: 100%;
				}

				.frame {
					width: 10em;
					height: 10em;

					border: var(--border-width) solid var(--color-theme-1);
					border-radius: var(--border-radius);

					img {
						width: 100%;
						height: 100%;
						object-fit: cover;
					}
				}

				.actions {
					flex: 1;

					label {
						display: flex;
						align-items: center;
						justify-content: center;
						gap: 0.5em;

						padding: 0.5em 0.5em;

						border: var(--border-width) solid var(--color-theme-1);
						border-radius: var(--border-radius);

						text-align: center;
						font-size: 0.9em;
					}
				}
			}

			:global(textarea) {
				min-height: 10em;
			}
		}
	}

	@media (max-width: 40em) {
		form {
			width: 100%;

			.row {
				&.image {
					flex-direction: column;

					.frame {
						width: 100%;
						height: 10em;
					}

					.actions {
						width: 100%;
					}
				}
			}
		}
	}
</style>
