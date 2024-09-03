<script>
	// »»»»» Imports
	import { page } from '$app/stores';
	import { translate as _ } from '$i18n/translate';

	// »»»»» Components
	import Icon from '$comp/commons/Icon.svelte';
	import Button from '$comp/commons/buttons/Button.svelte';

	// »»»»» Logic
	// options for the header menu
	let options = [
		{
			name: _('Início'),
			href: '/',
			icon: 'home'
		},
		{
			name: _('Posts'),
			href: '/posts',
			icon: 'device-gamepad'
		},
		{
			name: _('Procurar'),
			href: '/procurar',
			icon: 'search'
		}
	];

	let user = $state($page.data?.user);
	let isAdmin = $state($page.data?.user?.Role?.slug === 'admin');

	if (user) {
		options.push({
			name: _('Perfil'),
			href: '/perfil',
			icon: 'user'
		});
	}

	// state for the mobile menu
	let mobileMenuActive = $state(false);

	// handle dynamic header position
	let header;

	let lastScrollTop = 0;

	let currentTop = $state('maxTop');

	function handleScroll() {
		let currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

		if (currentScrollTop > lastScrollTop) currentTop = 'minTop';
		else currentTop = 'maxTop';

		lastScrollTop = currentScrollTop;
	}

	// handle theme change
	let currentTheme = $state($page.data?.theme);

	function toggleTheme() {
		document.documentElement.setAttribute(
			'data-theme',
			document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'
		);
		currentTheme = document.documentElement.getAttribute('data-theme');

		let formData = new FormData();
		formData.append('theme', currentTheme);
		fetch('/?/setTheme', {
			method: 'POST',
			body: formData
		});
	}

	$effect(() => {
		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});
</script>

<header bind:this={header} style="--top: var(--{currentTop})">
	<a href="/" class="logo">
		<div class="icon">
			<Icon icon="x" />
			<Icon icon="device-gamepad" />
		</div>
		<p>Deu Tilt</p>
	</a>
	<Button secondary id="mobileMenu" onclick={() => (mobileMenuActive = true)}>
		<Icon icon="menu-2" />
	</Button>
	<nav class:active={mobileMenuActive}>
		<Button secondary onclick={() => (mobileMenuActive = false)}>
			<Icon icon="x" />
		</Button>
		<div class="upper-options">
			{#each options as option}
				<Button
					secondary={option.href != $page.url.pathname}
					animated
					href={option.href}
					onclick={() => (mobileMenuActive = false)}
				>
					<Icon icon={option.icon} />
					{option.name}
				</Button>
			{/each}
			{#if isAdmin}
				<Button
					secondary={$page.url.pathname != '/admin'}
					animated
					href="/admin"
					onclick={() => (mobileMenuActive = false)}
				>
					<Icon icon="crown" />
					{_('Admin')}
				</Button>
			{/if}
		</div>
		<div class="lower-options">
			{#if user}
				<Button
					secondary
					animated
					onclick={() => {
						mobileMenuActive = false;
						fetch('/auth?/logout', { method: 'POST', body: new FormData() }).then(
							() => (window.location.href = '/')
						);
					}}
				>
					<Icon icon="logout" />
					{_('Logout')}
				</Button>
			{:else}
				<Button
					secondary={$page.url.pathname != '/auth'}
					animated
					href="/auth"
					onclick={() => (mobileMenuActive = false)}
				>
					<Icon icon="login" />
					{_('Login')}
				</Button>
			{/if}
			<Button secondary animated onclick={toggleTheme}>
				<span>
					<Icon icon="sun-filled" />
					<Icon icon="toggle-{currentTheme === 'light' ? 'left' : 'right'}" />
					<Icon icon="moon-filled" />
				</span>
			</Button>
		</div>
	</nav>
</header>

<style lang="scss" scoped>
	header {
		--minTop: -100px;
		--maxTop: -1px;

		position: sticky;
		top: var(--top);

		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;

		width: 100%;

		// padding: 0.75em 1em;

		border-bottom: var(--border-width) solid var(--color-theme-1);

		background-color: var(--color-background-faded-1);
		backdrop-filter: blur(3px);

		transition: top var(--transition-medium);
		z-index: 5000; // 5000 is the default z-index of the header component

		.logo {
			display: flex;
			align-items: center;
			gap: 0.5em;

			height: 100%;

			margin-top: 1em;

			font-size: 1.25em;
			font-weight: bolder;
			text-transform: uppercase;

			.icon {
				position: relative;

				display: flex;
				align-items: center;

				:global(i) {
					color: var(--color-theme-1);
					font-size: 2em;
				}

				:global(.ti-x) {
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);

					color: var(--color-theme-2);
					font-size: 2.5em;
				}
			}

			p {
				padding-top: 0.1em;
			}
		}

		> :global(button) {
			display: none;
		}

		nav {
			display: flex;
			justify-content: space-between;
			align-items: start;

			width: 100%;

			> :global(button) {
				display: none;
			}

			.upper-options,
			.lower-options {
				display: flex;

				:global(button span) {
					white-space: nowrap;
				}
			}
		}

		:global(a:not(.logo)),
		:global(button) {
			width: 8em !important;
			height: 2.5em !important;

			font-size: 1em !important;

			border: none !important;
			border-radius: 0 !important;
		}
	}

	@media (max-width: 768px) {
		header {
			--minTop: -75px;

			font-size: 1.15em;

			.logo {
				margin: 0;
				padding: 0.5em;

				font-size: 1.15em;

				p {
					font-size: 1.25em;
				}
			}

			> :global(button) {
				position: absolute;
				top: 56%;
				right: 0;
				transform: translateY(-50%);

				display: block;

				width: 3em !important;
				font-size: 1.25em !important;
			}

			nav {
				position: fixed;
				top: 0;
				right: 0;

				flex-direction: column;
				align-items: end;

				width: 0;
				height: 100vh;
				height: 100dvh;

				font-size: 1.25em;

				background-color: var(--color-background-faded-1);
				backdrop-filter: blur(7px);

				transition: width var(--transition-fast);
				overflow: hidden;

				&.active {
					width: 100vw;
				}

				:global(.primary),
				:global(.secondary) {
					display: flex;
					flex-direction: row-reverse;
					justify-content: flex-start;

					width: 100% !important;
					height: 3em !important;

					padding-inline: 0.75em !important;
				}

				.upper-options,
				.lower-options {
					flex-direction: column;
					// gap: 1em;

					width: 100%;
				}
			}
		}
	}
</style>
