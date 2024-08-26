<script>
	// »»»»» Imports
    import { page } from '$app/stores';
	import { translate as _ } from '$i18n/translate';

	// »»»»» Components
	import Icon from '$comp/commons/Icon.svelte';
	import Button from '$comp/commons/buttons/Button.svelte';

	// »»»»» Logic
	let options = [
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

	let mobileMenuActive = $state(false);
    let isAdmin = $state($page.data?.user?.Role?.slug === 'admin');
</script>

<header>
	<a href="/" class="logo">
		<div class="icon">
			<Icon icon="x" />
			<Icon icon="device-gamepad" />
		</div>
		<p>Deu Tilt</p>
	</a>
	<Button secondary on:click={() => (mobileMenuActive = true)}>
		<Icon icon="menu-2" />
	</Button>
	<nav class:active={mobileMenuActive}>
		<Button secondary on:click={() => (mobileMenuActive = false)}>
			<Icon icon="x" />
		</Button>
		{#each options as option}
			<Button secondary={option.href != $page.url.pathname} animated href={option.href} on:click={() => (mobileMenuActive = false)}>
				<Icon icon={option.icon} />
				{option.name}
			</Button>
		{/each}
        {#if isAdmin}
            <Button secondary={$page.url.pathname != "/admin"} animated href="/admin" on:click={() => (mobileMenuActive = false)}>
                <Icon icon="crown" />
                {_('Admin')}
            </Button>
        {/if}
	</nav>
</header>

<style lang="scss" scoped>
	header {
		position: sticky;
		top: 0;

		display: flex;
		align-items: center;
		justify-content: space-between;

		width: 100%;

		// padding: 0.75em 1em;

		border-bottom: var(--border-width) solid var(--color-theme-1);

		background-color: var(--color-background-1);

		z-index: 5000; // 5000 is the default z-index of the header component

		.logo {
			display: flex;
			align-items: center;
			gap: 0.5em;

			height: 100%;

			margin-left: 1em;

			font-size: 1.15em;
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

		nav {
			display: flex;

			:global(button) {
				display: none;
			}
		}

		:global(a:not(.logo)),
		:global(button) {
			width: 8em !important;
			height: 3em !important;

			font-size: 1em !important;

			border: none !important;
			border-radius: 0 !important;
		}

		:global(.ti-menu-2) {
			display: none;
		}
	}

	@media (max-width: 768px) {
		header {
			font-size: 1.15em;

			.logo {
				p {
					font-size: 1.25em;
				}
			}

			> :global(button) {
				width: 3em !important;
				font-size: 1.25em !important;
			}

			:global(.ti-menu-2) {
				display: block;
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

				:global(.secondary) {
					display: flex;
					flex-direction: row-reverse;
					justify-content: flex-start;

					width: 100% !important;
				}
			}
		}
	}
</style>
