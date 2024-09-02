<script>
	// »»»»» Imports
	import { translate as _ } from '$i18n/translate';

	// »»»»» Props
	let { data } = $props();
	let { carouselItems, posts } = data;

	// »»»»» Components
	import Metadata from '$comp/structural/Metadata.svelte';
	import Carousel from './Carousel.svelte';
	import Icon from '$comp/commons/Icon.svelte';
	import CardPostPreview from '$comp/design/CardPostPreview.svelte';
	import Button from '$comp/commons/buttons/Button.svelte';
</script>

<Metadata
	title="Pagina Inicial"
	altTitle="Hardware, Software, Games e Cultura Geek"
	description="Fique por dentro das ultimas noticias de tecnologia, games, cultura geek e muito mais."
	keywords={['palavra1', 'palavra2']}
/>

<Carousel items={carouselItems} />

<div class="header">
	<Icon icon="chevron-right" />
	<h1>{_('Noticias Recentes')}</h1>
	<Icon icon="chevron-left" />
</div>

<section>
	{#each posts.items as item}
		<CardPostPreview {item} />
	{/each}
</section>

{#if posts.totalItems > 10}
	<Button secondary animated id="seeMorePosts" href="/posts">
		{_('Ver Mais')}
		<Icon icon="chevron-right" />
	</Button>
{/if}

<style lang="scss">
	.header {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1em;

		width: 90%;

		margin-top: 2em;
		margin-inline: auto;

		h1 {
			text-align: center;
		}

		:global(.ti) {
			color: var(--color-theme-1);
			font-size: 2em;
		}
	}

	section {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: 1em;

		padding: 2em;
		margin-inline: auto;
	}

	:global(#seeMorePosts) {
		max-width: 40em;

		margin: 0em auto 2em;
	}

	@media (max-width: 768px) {
		.header {
			:global(.ti) {
				font-size: 3em;
			}
		}

		section {
			padding: 2em 1em;
		}

		:global(#seeMorePosts) {
			max-width: auto;

			margin: 0em 1em 2em;
		}
	}
</style>
