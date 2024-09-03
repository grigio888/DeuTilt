<script>
	// »»»»» Props
    let {
        element = 'input',
        type = 'text',
        name,
        required,
        placeholder,
        value,
        ...props
    } = $props();
	
	// »»»»» Components
	import Icon from '$comp/commons/Icon.svelte';

	// »»»»» Logic
	let previousType = type;
	let allowPasswordShow = $state(previousType === 'password' ? false : undefined);

	// »»»»» Watchers
	function switchState() {
		allowPasswordShow = !allowPasswordShow;
		type = type != 'text' ? 'text' : 'password';
	}
</script>

<div>
	<svelte:element
		this={element}
		{type}
		{name}
		{required}
		{placeholder}
		{value}
        {...props}
	/>
	{#if previousType === 'password'}
		<button type="button" onclick={switchState}>
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

		button {
			position: absolute;
			top: 55%;
			right: 0.75em;

			transform: translateY(-50%);

			background-color: transparent;
			border: none;

			color: var(--color-text-1);

			cursor: pointer;

			transition: color;
			transition-duration: var(--transition-fast);
		}
	}
</style>
