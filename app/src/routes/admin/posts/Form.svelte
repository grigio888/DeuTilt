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

    // handling textarea events
    let textarea;
    async function handleImagePasted(e) {
        e.preventDefault();

        let clipboardItems = e.clipboardData.items;
        for (let i = 0; i < clipboardItems.length; i++) {
            let item = clipboardItems[i];
            if (item.type.indexOf("image") !== -1) {
                let blob = item.getAsFile();

                if (!post) {
                    textarea.insertAtCursor(`![${_('Imagem não carregada, primeiro salve o post como rascunho.')}]()`);
                    return;
                }

                let formData = new FormData();
                formData.append('image', blob);
                formData.append('folder', post.slug);

                let response = await fetch('/admin/posts/?/imageUpload', {
                    method: 'POST',
                    body: formData
                });
                let json = await response.json();
                let data = JSON.parse(json.data);

                if (json.type == 'success') {
                    textarea.insertAtCursor(`![${data[1]}](${data[2]})`);
                } else {
                    console.error(json.message);
                    textarea.insertAtCursor(`![${_('Imagem não carregada')}]()`);
                }

                return;
            }

            // in here we assume that the clipboard item is not an image,
            // so we just paste it as it is
            let text = await e.clipboardData.getData('text');
            textarea.insertAtCursor(text);
        }
    }

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

<form action="/admin/posts/?/postForm" method="POST" enctype="multipart/form-data" use:enhance>
	<input type="text" name="id" value={post?.id} hidden />
	<div class="row image">
		<p>Imagem Principal</p>
		<div class="frame">
			<img src={image?.src} alt="Imagem Principal" hidden={image?.src ? false : true} />
		</div>
		<div class="actions">
			<label for="imageHeader">
				<Icon icon="photo-plus" />
				{_('Carregar Imagem Principal')}
			</label>
			<input
				bind:this={imageHeader}
				type="file"
				id="imageHeader"
				name="imageHeader"
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
		<label for="subTitle">
			{_('Sub-titulo')}
		</label>
		<Input type="text" id="subTitle" name="subTitle" value={post?.subTitle} required />
	</div>
	<div class="row">
		<label for="content">{_('Conteúdo')}</label>
		<Input bind:this={textarea} element="textarea" id="content" name="content" value={post?.content} required onpaste={handleImagePasted} />
	</div>
	<div class="row">
		<label for="category">{_('Categorias')}</label>
		<Select options={tagOptions} name="category" id="category" multiple />
	</div>
	<div class="row">
        <div class="sub-row" id="action">
            <Button type="submit">
                <Icon icon="check" />
                {_('Publicar')}
            </Button>
            <Button type="submit" name="draft">
                <Icon icon="device-floppy" />
                {_('Rascunho')}
            </Button>
        </div>
		<Button secondary animated type="button" onclick={() => console.log('preview')}>
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

						cursor: pointer;
					}
				}
			}

			:global(textarea) {
				min-height: 10em;
			}

            .sub-row {
                display: flex;
                gap: 0.5em;

                :global(> *) {
                    flex: 1;
                }
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

                .sub-row {
                    flex-direction: column;
                }
			}
		}
	}
</style>
