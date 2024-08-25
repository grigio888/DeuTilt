<script>
	// »»»»» Imports
	import { translate as _ } from '$i18n/translate';

	// »»»»» Props
	let { data } = $props();
	let { pagination } = data;

	// »»»»» Components
	import CardPostPreview from '$comp/design/CardPostPreview.svelte';
</script>

<h1>{_('Arquivos')}</h1>

<div class="wrapper">
	{#each pagination.items as item}
		<CardPostPreview {item} />
	{/each}
</div>

<style lang="scss">
	h1 {
		margin: 1em;
		text-align: center;
	}

	.wrapper {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: 1em;

		margin: 1em;
	}
</style>
