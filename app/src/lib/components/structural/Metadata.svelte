<script>
	// »»»»» Imports
	import { PUBLIC_APP_URL } from '$env/static/public';
	import { page } from '$app/stores';

	import { translate as _ } from '$i18n/translate.js';

	// »»»»» Props
	let { robots, title, altTitle, description, keywords, image } = $props();

	let params = $state({
		robots: robots ?? 'index, follow',
		title: title ?? '',
		altTitle: altTitle ?? '',
		description: description ?? 'Some description',
		keywords: keywords ?? [],
		image: image ?? 'favicon.ico',
		page_url: $page.url.pathname
	});

	$effect(() => {
		if (params.description.length > 166)
			params.description = params.description.substring(0, 166) + '...';
	});
</script>

<svelte:head>
	<meta name="robots" content={params.robots} />
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />

	<title>Deu Tilt{params.title != '' ? ' - ' + params.title : ''}</title>

	<meta name="apple-mobile-web-app-capable" content="yes" />
	<meta name="apple-mobile-web-app-status-bar-style" content="black" />
	<meta name="apple-mobile-web-app-title" content="Deu Tilt" />
	<link rel="apple-touch-icon" href="{PUBLIC_APP_URL}/{params.image}" />
	<meta name="apple-touch-fullscreen" content="yes" />

	<meta property="og:description" content={params.description} />
	<meta property="og:image" content="{PUBLIC_APP_URL}/{params.image}" />
	<meta property="og:site_name" content="Deu Tilt" />
	<meta
		property="og:title"
		content="Deu Tilt{params.title != '' ? ' - ' + params.title : ''}{params.altTitle
			? params.altTitle
			: ''}"
	/>
	<meta property="og:type" content="website" />
	<meta property="og:url" content="{PUBLIC_APP_URL}{params.page_url}" />

	<meta name="description" content={params.description} />
	<meta
		name="keywords"
		itemprop="keywords"
		content="{_('Deu Tilt')}, {params.keywords.toString()}"
	/>
	<link rel="shortcut icon" href="{PUBLIC_APP_URL}/{params.image}" />
	<link rel="icon" href="{PUBLIC_APP_URL}/{params.image}" />
	<link rel="canonical" href="{PUBLIC_APP_URL}{params.page_url}" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content="@deu_tilt" />
	<meta name="twitter:creator" content="@deu_tilt" />
	<meta name="twitter:title" content="Deu Tilt{params.title != '' ? ' - ' + params.title : ''}" />
	<meta name="twitter:description" content={params.description} />
	<meta name="twitter:image" content="{PUBLIC_APP_URL}/{params.image}" />
</svelte:head>
