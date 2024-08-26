<script>
	// »»»»» Props
	// » Element construction
	export let element = 'button';
	export let id = undefined;
	export let title = undefined;

	// » Style
	export let secondary = false;
	export let animated = false;
	export let standOut = false;
	export let pill = false;
	export let warn = false;

	export let notAllowed = false;
	export let hidden = false;

	// » Form related
	export let formaction = undefined;
	export let type = undefined;

	// » Label related
	export let forLabel = undefined;

	// » If element is a link
	export let href = undefined;
	if (href) element = 'a';
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<svelte:element
	this={element}
	{formaction}
	{title}
	{id}
	class:primary={!secondary}
	class:secondary
	class:animated
	class:stand-out={standOut}
	class:not-allowed={notAllowed || hidden}
	class:hidden
	class:pill
	class:warn
	{type}
	for={forLabel}
	{href}
	on:click
>
	<slot />
</svelte:element>

<style lang="scss">
	button,
	a,
	label {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5em;

		height: 2.5em;

		padding: 0.5em 1em 0.4em;

		border-radius: var(--border-radius);

		font-family: var(--default-font);

		cursor: pointer;
		text-decoration: none;

		transition: border, background-color, color, font-weight, opacity;
		transition-duration: var(--transition-fast);

		&.primary {
			border: none;

			background-color: var(--color-theme-2);
			color: var(--color-background-1);
			font-weight: 700;
		}

		&.secondary {
			border: solid var(--color-theme-1);
			border-width: var(--border-width);

			background-color: transparent;
			color: var(--color-text-1);
		}

		&.animated {
			&:hover {
				background-color: var(--color-theme-1);
				color: var(--color-background-1);
			}
		}

		&.stand-out {
			font-weight: 700;
			text-transform: uppercase;
			letter-spacing: 0.2em;
		}

		&.not-allowed {
			opacity: 0.5;
			pointer-events: none;
		}

		&.pill {
			border-radius: 15em !important;
		}

		&.hidden {
			opacity: 0;
			pointer-events: none;
		}

		&.warn {
			background-color: #ff00005e;
			border-color: #ff0000;
		}
	}

	a {
		font-size: 0.84em;
	}
</style>
