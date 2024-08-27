<script>
	// »»»»» Imports
	import { translate as _ } from '$i18n/translate';

	// »»»»» Props
	let { data } = $props();
	let { pagination } = data;

	// »»»»» Components
	import Icon from '$comp/commons/Icon.svelte';
	import CardPostPreview from '$comp/design/CardPostPreview.svelte';
</script>

<div class="header">
	<div class="left">
		<Icon icon="chevrons-right" />
	</div>
	<div class="right">
		<h1>{_('Todos os Artigos')}</h1>
	</div>
</div>

<div class="wrapper">
	{#each pagination.items as item}
		<CardPostPreview {item} />
	{/each}
</div>

<style lang="scss">
	.header {
		display: flex;
		align-items: center;
		gap: 1em;

		margin: 3em 1em;

		.left {
			:global(.ti) {
				font-size: 3em;
				color: var(--color-theme-1);
			}
		}
	}

	.wrapper {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: 1em;

		margin: 1em;
	}
</style>
