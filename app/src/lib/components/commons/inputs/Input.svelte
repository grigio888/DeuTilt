<script>
	// »»»»» Props
	let { element = 'input', type = 'text', name, required, placeholder, value, ...props } = $props();

	// »»»»» Components
	import Icon from '$comp/commons/Icon.svelte';

	// »»»»» Logic
	let elementGenerated;
	let previousType = type;
	let allowPasswordShow = $state(previousType === 'password' ? false : undefined);

	export function insertAtCursor(text) {
		const start = elementGenerated.selectionStart;
		const end = elementGenerated.selectionEnd;
		const before = elementGenerated.value.substring(0, start);
		const after = elementGenerated.value.substring(end, elementGenerated.value.length);
		elementGenerated.value = before + text + after;
		elementGenerated.selectionStart = elementGenerated.selectionEnd = start + text.length;
		elementGenerated.focus();
	}

	// »»»»» Watchers
	function switchState() {
		allowPasswordShow = !allowPasswordShow;
		type = type != 'text' ? 'text' : 'password';
	}
</script>

<div>
	<svelte:element
		this={element}
		bind:this={elementGenerated}
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
