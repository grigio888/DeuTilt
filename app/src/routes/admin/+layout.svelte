<script>
	// »»»»» Imports
	import { page } from '$app/stores';
	import { translate as _ } from '$i18n/translate';

	// »»»»» Props
	let { children } = $props();

	// »»»»» Components
	import Button from '$comp/commons/buttons/Button.svelte';
	import Icon from '$comp/commons/Icon.svelte';
</script>

<main>
	<!--
        For some reason, this warning does not affect anything, 
        since the documentation says that this is the correct
        way to render children.
    -->
	<div class="sidebar">
		<h2>{_('Posts')}</h2>
		<Button secondary={$page.url.pathname !== '/admin/posts/add'} animated href="/admin/posts/add">
			<Icon icon="square-rounded-plus" />
			{_('Criar Post')}
		</Button>
		<Button
			secondary={!$page.url.pathname.startsWith('/admin/posts/edit')}
			animated
			href="/admin/posts/edit"
		>
			<Icon icon="edit" />
			{_('Editar Post')}
		</Button>
		<hr />
		<h2>{_('Tags')}</h2>
		<Button secondary={$page.url.pathname !== '/admin/tags/add'} animated href="/admin/tags/add">
			<Icon icon="square-rounded-plus" />
			{_('Criar Tag')}
		</Button>
		<Button
			secondary={!$page.url.pathname.startsWith('/admin/tags/edit')}
			animated
			href="/admin/tags/edit"
		>
			<Icon icon="edit" />
			{_('Editar Tag')}
		</Button>
	</div>
	<div class="content">
		<!--
            For some reason, this warning does not affect anything, 
            since the documentation says that this is the correct
            way to render children.
        -->
		{@render children()}
	</div>
</main>

<style lang="scss">
	main {
		display: grid;
		grid-template-columns: 15em 1fr;

		.sidebar {
			display: flex;
			flex-direction: column;
			gap: 1em;

			padding: 1em;

			border-right: var(--border-width) solid var(--color-theme-1);

			hr {
				border: none;
				border-top: var(--border-width) solid var(--color-theme-1);
			}
		}
	}
</style>
