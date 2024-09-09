<script>
	// »»»»» Imports
	import { enhance } from '$app/forms';

	import { translate as _ } from '$i18n/translate';

	// »»»»» Props
	let { tag } = $props();

	// »»»»» Components
    import Tags from '$comp/design/Tags.svelte';
	import Input from '$comp/commons/inputs/Input.svelte';
	import Icon from '$comp/commons/Icon.svelte';
	import Button from '$comp/commons/buttons/Button.svelte';

	// »»»»» Logic
    let slug = $state(tag ? tag.slug : 'example');
    let title = $state(tag ? tag.title : 'Example');
    let color = $state(tag ? tag.color : 'green');
    let icon = $state(tag ? tag.icon : 'alert-triangle');
</script>

<form action="/admin/tags/?/tagForm" method="POST" use:enhance>
    <div class="preview">
        Preview: 
        {#key [slug, title, color, icon]}
            <Tags tag={{slug, title, color, icon}} />
        {/key}
    </div>
	<input type="text" name="id" value={tag?.id} hidden />
	<div class="row">
		<label for="slug">
			{_('Slug')}
		</label>
		<Input type="text" id="slug" name="slug" value={tag?.slug} required oninput={(e) => slug = e.target.value} />
	</div>
	<div class="row">
		<label for="title">
			{_('Titulo')}
		</label>
		<Input type="text" id="title" name="title" value={tag?.title} required oninput={(e) => title = e.target.value} />
	</div>
	<div class="row">
		<label for="color">
			{_('Cor')}
		</label>
		<Input type="text" id="color" name="color" value={tag?.color} required oninput={(e) => color = e.target.value} />
	</div>
	<div class="row">
		<label for="icon">
			{_('Icone')}
		</label>
		<Input type="text" id="icon" name="icon" value={tag?.icon} oninput={(e) => icon = e.target.value} />
	</div>
	<div class="row">
        <Button type="submit">
            <Icon icon="check" />
            {_(tag?.id ? 'Editar' : 'Criar')}
        </Button>
	</div>
</form>

<style lang="scss">
	form {
		display: grid;
		gap: 1em;

		width: 40em;

		padding: 1em;

        .preview {
            display: flex;
            align-items: center;
            gap: 1em;
        }

		.row {
			display: grid;
			gap: 0.5em;
		}
	}
    
	@media (max-width: 40em) {
		form {
			width: 100%;
		}
	}
</style>
