<script>
	// »»»»» Imports
	import './styles.css';

	import { locale } from '$i18n/store.js';

	// »»»»» Props
	export let data;

	// »»»»» Components
	import Header from '$comp/structural/header/Header.svelte';
    import Footer from '$comp/structural/footer/Footer.svelte';
	import PageTransition from '$comp/structural/PageTransition.svelte';

	// »»»»» Logic
	// » Refreshing locale
	//   - Auto update when the user changes language in the configuration.
	$: locale.set(data?.lang);
</script>

<Header />

<PageTransition refresh={data.url}>
	<slot />
</PageTransition>

<Footer />
