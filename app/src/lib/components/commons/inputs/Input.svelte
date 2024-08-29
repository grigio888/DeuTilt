<script>
	// »»»»» Props
	export let element = 'input';
	export let type = 'text';
	export let name = undefined;
	export let required = undefined;
	export let placeholder = undefined;

	export let value = undefined;
</script>

<svelte:element
	this={element}
	on:focus
	on:blur
	on:input
	{type}
	{name}
	{required}
	{placeholder}
	{value}
/>

<style lang="scss">
	input,
	textarea {
		position: relative;

		width: 100%;

		padding: 0.5em;

		border: var(--border-width) solid var(--color-theme-1);
		border-radius: var(--border-radius);

		background-color: var(--color-background-1);
		color: var(--color-text-1);

		font-family: var(--default-font);

		transition: border-color;
		transition-duration: var(--transition-fast);

		&:focus {
			outline: none;
			border-color: var(--color-theme-2);
		}
	}
</style>
