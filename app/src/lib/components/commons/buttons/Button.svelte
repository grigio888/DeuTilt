<script>
	// »»»»» Props
	let {
		// element construction
		element = 'button',
		// style
		secondary,
		animated,
		standOut,
		pill,
		warn,
		notAllowed,
		hidden,
		// form related
		formaction,
		type,
		// label related
		forLabel,
		// link related
		href,
		// children
		children,
		// remaining props
		...props
	} = $props();
	if (href) element = 'a';
</script>

<svelte:element
	this={element}
	{formaction}
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
	{...props}
>
	<!--
        For some reason, this warning does not affect anything, 
        since the documentation says that this is the correct
        way to render children.
    -->
	{@render children()}
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
