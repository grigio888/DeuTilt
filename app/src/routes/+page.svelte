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

	@media (max-width: 768px) {
        .header {

            :global(.ti) {
                font-size: 3em;
            }
        }

		section {
			padding: 2em 1em;

		}
	}
</style>
