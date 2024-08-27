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
</script>

<Metadata
	title="Pagina Inicial"
	description="Descrição da página inicial"
	keywords={['palavra1', 'palavra2']}
/>

<Carousel items={carouselItems} />

<h1>
    <Icon icon="chevron-right" />
    {_('Noticias Recentes')}
    <Icon icon="chevron-left" />
</h1>

<section>
	{#each posts.items as item}
		<CardPostPreview {item} />
	{/each}
</section>

<style lang="scss">
	h1 {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1em;

		margin-top: 1em;

		font-size: 2em;

        :global(.ti) {
            color: var(--color-theme-1);
        }
	}

	section {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: 1em;

		padding: 2em;
		margin-inline: auto;
	}

	@media (max-width: 768px) {
		section {
			padding: 2em 1em;
		}
	}
</style>
