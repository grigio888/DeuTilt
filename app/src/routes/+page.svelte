<script>
	// »»»»» Imports
	import { translate as _ } from '$i18n/translate';

	// »»»»» Props
	let { data } = $props();
	let { carouselItems } = data;

	// »»»»» Components
	import Metadata from '$comp/structural/Metadata.svelte';
	import Carousel from './Carousel.svelte';
</script>

<Metadata
	title="Pagina Inicial"
	description="Descrição da página inicial"
	keywords={['palavra1', 'palavra2']}
/>

<Carousel items={carouselItems} />

<h1>{_('Welcome to SvelteKit')}</h1>
