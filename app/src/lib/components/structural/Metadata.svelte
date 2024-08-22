<script>
	// »»»»» Imports
	import { PUBLIC_APP_URL } from '$env/static/public';
	import { page } from '$app/stores';

	import { translate as _ } from '$i18n/translate.js';

	// »»»»» Props
	export let robots = 'index, follow';
	export let title = '';
	export let page_url = $page.url.pathname;
	export let image = 'favicon.ico';

	export let description = 'Some description';
	export let keywords = [];

	$: if (description.length > 166) description = description.substring(0, 166) + '...';
</script>

<svelte:head>
	<meta name="robots" content={robots} />
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />

	<title>Deu Tilt{title != '' ? ' - ' + title : ''}</title>

	<meta name="apple-mobile-web-app-capable" content="yes" />
	<meta name="apple-mobile-web-app-status-bar-style" content="black" />
	<meta name="apple-mobile-web-app-title" content="Deu Tilt" />
	<link rel="apple-touch-icon" href="{PUBLIC_APP_URL}/{image}" />
	<meta name="apple-touch-fullscreen" content="yes" />

	<meta property="og:description" content={description} />
	<meta property="og:image" content="{PUBLIC_APP_URL}/{image}" />
	<meta property="og:site_name" content="Deu Tilt" />
	<meta property="og:title" content="Deu Tilt{title != '' ? ' - ' + title : ''}" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="{PUBLIC_APP_URL}{page_url}" />

	<meta name="description" content={description} />
	<meta name="keywords" itemprop="keywords" content="{_('Deu Tilt')}, {keywords.toString()}" />
	<link rel="shortcut icon" href="{PUBLIC_APP_URL}/{image}" />
	<link rel="icon" href="{PUBLIC_APP_URL}/{image}" />
	<link rel="canonical" href="{PUBLIC_APP_URL}{page_url}" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content="@deu_tilt" />
	<meta name="twitter:creator" content="@deu_tilt" />
	<meta name="twitter:title" content="Deu Tilt{title != '' ? ' - ' + title : ''}" />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content="{PUBLIC_APP_URL}/{image}" />
</svelte:head>
