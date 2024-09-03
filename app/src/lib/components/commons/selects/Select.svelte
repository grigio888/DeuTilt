<script>
	// »»»»» Imports
	import { clickOutside } from '$comp/nodeEvents/clickOutside';

	// »»»»» Props
	let { options, name, id, multiple } = $props();

	// »»»»» Components
	import Icon from '$comp/commons/Icon.svelte';

	// »»»»» Logic
	let defaultSelect;

	// when the page is loaded, the default select must be hidden
	let hidden = $state(false);

	// when the select is open
	let isOpen = $state(false);

	// detect if the select options will overflow the window
	let showOnTop = $state(false);

	function detectOptionsOverflow() {
		// In here, we'll detect if the customSelect is near the limits of the window,
		// either on the top or on the bottom, and then we'll set the showOnTop state
		// to true if it's near the bottom, or false if it's near the top
		// The threshold is 200px, which is the height of the options container + 50px

		let windowHeight = window.outerHeight;
		let selectBottom = defaultSelect.getBoundingClientRect().bottom;

		if (windowHeight - selectBottom < 200) {
			showOnTop = true;
		} else {
			showOnTop = false;
		}
	}

	function toggleOption(value, selected) {
		if (!multiple) {
			options = options.map((option) => ({ ...option, selected: false }));
		}

		options = options.map((option) => {
			if (option.value === value) {
				option.selected = selected;
			}

			return option;
		});

		Array.from(defaultSelect.options).forEach((option) => {
			if (option.value === value) {
				option.selected = selected;
			}
		});
	}

	$effect(() => {
		hidden = true;
		detectOptionsOverflow();
	});
</script>

<select bind:this={defaultSelect} name={`${name}${multiple ? '[]' : ''}`} {id} {multiple} {hidden}>
	{#each options as option}
		<option value={option.value} selected={option.selected}>{option.text}</option>
	{/each}
</select>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class="custom-select"
	{multiple}
	hidden={!hidden}
	onclick={() => {
		isOpen = !isOpen;
	}}
	use:clickOutside
	onclick_outside={() => {
		isOpen = false;
	}}
>
	<div class="selected">
		{#if multiple}
			{#each options.filter((opt) => opt.selected) as option}
				<button type="button" onclick={() => toggleOption(option.value, false)}>
					{option.text}
					<Icon icon="x" />
				</button>
			{/each}
		{:else}
			{options.find((opt) => opt.selected).text}
		{/if}
	</div>
	<Icon icon="chevron-down {isOpen ? 'open' : ''}" />
	<div class="options" class:isOpen class:showOnTop>
		{#each options as option}
			<button type="button" onclick={() => toggleOption(option.value, true)}>
				{option.text}
			</button>
		{/each}
	</div>
</div>

<style lang="scss">
	select,
	.custom-select {
		width: 100%;

		padding: 0.5em;

		border: var(--border-width) solid var(--color-theme-1);
		border-radius: var(--border-radius);
	}

	.custom-select {
		position: relative;

		display: flex;
		justify-content: space-between;
		align-items: center;

		min-height: 2.5em;

		font-size: 0.9em;

		&[hidden] {
			display: none;
		}

		&[multiple] {
			min-height: 3.5em;
		}

		.selected {
			display: flex;
			flex-wrap: wrap;
			gap: 0.5em;

			button {
				display: flex;
				align-items: center;
				gap: 0.5em;

				padding: 0.25em 0.5em;

				border: var(--border-width) solid var(--color-theme-1);
				border-radius: var(--border-radius);

				background-color: transparent;

				color: var(--color-text-1);
				text-align: center;
				font-size: 0.9em;

				transition: background-color, color;
				transition-duration: var(--transition-fast);

				cursor: pointer;

				&:hover {
					background-color: var(--color-theme-1);
					color: var(--color-text-highlight-1);
				}
			}
		}

		:global(i) {
			cursor: pointer;
		}

		:global(i.open) {
			transform: rotate(180deg);
		}

		.options {
			--position-inline: -2px;

			display: none;

			position: absolute;
			top: 100%;
			left: var(--position-inline);
			right: var(--position-inline);

			max-height: 150px;

			border: var(--border-width) solid var(--color-theme-1);
			border-radius: var(--border-radius);

			overflow-y: auto;
			z-index: 2;

			&.isOpen {
				display: grid;
			}

			&.showOnTop {
				top: auto;
				bottom: 100%;
			}

			button {
				padding: 0.5em;

				border: none;

				background-color: var(--color-background-1);

				color: var(--color-text-1);
				text-align: left;

				transition: background-color, color;
				transition-duration: var(--transition-fast);

				cursor: pointer;

				&:hover {
					background-color: var(--color-theme-1);
					color: var(--color-text-highlight-1);
				}
			}
		}
	}

	@media (max-width: 768px) {
		.custom-select {
			.options {
				--position-inline: 0;
			}
		}
	}
</style>
