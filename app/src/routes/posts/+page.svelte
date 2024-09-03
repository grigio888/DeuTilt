<script>
	// »»»»» Imports
	import { translate as _ } from '$i18n/translate';

	// »»»»» Props
	let { data } = $props();
	let { pagination } = data;

	// »»»»» Components
	import Metadata from '$comp/structural/Metadata.svelte';
	import Icon from '$comp/commons/Icon.svelte';
	import CardPostPreview from '$comp/design/CardPostPreview.svelte';
</script>

<Metadata
	title="Todos os Artigos"
	altTitle="Hardware, Software, Games e Cultura Geek"
	description="Fique por dentro das ultimas noticias de tecnologia, games, cultura geek e muito mais."
	keywords={['palavra1', 'palavra2']}
/>

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

		min-height: 55vh;
		min-height: 55dvh;

		margin: 1em;
	}
</style>
