<script>
	// »»»»» Props
	export let element = 'input';
	export let type = 'text';
	export let name = undefined;
	export let required = undefined;
	export let placeholder = undefined;

	export let value = undefined;

	// »»»»» Components
	import Icon from '$comp/commons/Icon.svelte';

	// »»»»» Logic
	let previousType = type;
	let allowPasswordShow = previousType === 'password' ? false : undefined;

	// »»»»» Watchers
	function switchState() {
		allowPasswordShow = !allowPasswordShow;
		type = type != 'text' ? 'text' : 'password';
	}
</script>

<div>
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
	{#if previousType === 'password'}
		<button type="button" on:click={switchState}>
			<Icon icon={allowPasswordShow ? 'eye' : 'eye-closed'} />
		</button>
	{/if}
</div>

<style lang="scss">
	div {
		position: relative;

		width: 100%;

		input,
		textarea {
			position: relative;

			width: 100%;

			padding: 0.5em;

			border: var(--borderWidth) solid var(--themeColor);
			border-radius: var(--borderRadius);

			background-color: var(--backgroundColor);
			color: var(--textColor);

			font-family: var(--defaultFont);

			transition: border-color;
			transition-duration: var(--transitionFast);

			&:focus {
				outline: none;
				border-color: var(--themeColorSecondary);
			}
		}

		button {
			position: absolute;
			top: 55%;
			right: 0.75em;

			transform: translateY(-50%);

			background-color: transparent;
			border: none;

			color: var(--textColor);

			cursor: pointer;

			transition: color;
			transition-duration: var(--transitionFast);
		}
	}
</style>
