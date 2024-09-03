<script>
	// »»»»» Imports
	import './styles.css';

	import { locale } from '$i18n/store.js';

	// »»»»» Props
	let { data, children } = $props();

	// »»»»» Components
	import Header from '$comp/structural/header/Header.svelte';
	import Footer from '$comp/structural/footer/Footer.svelte';
	import PageTransition from '$comp/structural/PageTransition.svelte';

	// »»»»» Logic
	// » Refreshing locale
	//   - Auto update when the user changes language in the configuration.
	let language = $state(data?.lang);
	locale.set(language);
</script>

<Header />

<PageTransition refresh={data.url}>
	<!--
        For some reason, this warning does not affect anything, 
        since the documentation says that this is the correct
        way to render children.
    -->
	{@render children()}
</PageTransition>

<Footer />
