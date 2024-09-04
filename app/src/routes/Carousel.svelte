<script>
	// »»»»» Imports
	import { fade, fly } from 'svelte/transition';

	import { marked } from 'marked';
	import { relativeTime } from '$lib/utils/date';

	// »»»»» Props
	let { items } = $props();

	// »»»»» Components
	import Tags from '$comp/design/Tags.svelte';
	import Icon from '$comp/commons/Icon.svelte';

	// »»»»» Logic
	// determining which post is in view
	let inView = $state(items[0]);

	// fetching the next 4 posts that comes after the inView post
	let options = $state([]);

	// refreshing the options
	function refreshOptions() {
		// resetting the options
		let newOptions = [];

		// fetching the next 4 posts that comes after the inView post
		for (let i = 1; i < 5; i++) {
			newOptions.push(
				items[(items.findIndex((post) => post.title === inView.title) + i) % items.length]
			);
		}

		options = newOptions;
	}
	refreshOptions();

	function setInView(post) {
		timer = 0;
		inView = post;
	}

	// handle animations
	let animationOut = $state({ x: -150 });
	let animationIn = $state({ x: 150 });

	// handle progress bar
	let timer = $state(0);
	let duration = 10000;
	let interval;

	function removeInterval() {
		clearInterval(interval);
		interval = null;
	}

	function renewInterval() {
		interval = setInterval(() => {
			timer += 100;
			if (timer >= duration) {
				let index = options.findIndex((post) => post.title === inView.title);

				if (index === options.length - 1) {
					setInView(options[0]);
				} else {
					setInView(options[index + 1]);
				}

				timer = 0;
			}
		}, 100);
	}

	$effect(() => {
		refreshOptions();
		renewInterval();

		// handle animations
		if (window.innerWidth <= 768) {
			animationOut = { y: -100 };
			animationIn = { y: 100 };
		} else {
			animationOut = { x: -150 };
			animationIn = { x: 150 };
		}

		return () => removeInterval();
	});
</script>

<section>
	{#key inView}
		<div
			class="in-view"
			role="banner"
			onmouseenter={() => removeInterval()}
			onmouseleave={() => renewInterval()}
			in:fade={{ duration: 250 }}
		>
			<img src={inView.imageHeader} alt={inView.title} />
			<div class="content">
				<div class="tags">
					{#each inView.Tags as tag}
						<Tags {tag} />
					{/each}
				</div>
				<span><Icon icon="clock" /> {relativeTime(inView.createdAt)}</span>
				<a class="text" href="/posts/{inView.slug}">
					<h2>{inView.title}</h2>
					<h3>{inView.subTitle}</h3>
					<!-- eslint-disable-next-line svelte/no-at-html-tags -->
					{@html marked(inView.content.slice(0, 100) + '...')}
				</a>
				<div class="progress-bar" style="width: {(timer / duration) * 100}%"></div>
			</div>
		</div>
	{/key}
	<div class="options">
		<button class="selected">
			{#key inView}
				<h2
					out:fly={{ duration: 1000, ...animationOut }}
					in:fly={{ duration: 1000, ...animationIn }}
				>
					{inView.title}
				</h2>
			{/key}
		</button>
		{#each options as option}
			<hr />
			<button onclick={() => setInView(option)}>
				{#key option}
					<h2
						out:fly={{ duration: 1000, ...animationOut }}
						in:fly={{ duration: 1000, ...animationIn }}
					>
						{option.title}
					</h2>
				{/key}
			</button>
		{/each}
	</div>
</section>

<style lang="scss">
	section {
		--height: 25em;

		position: relative;

		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		border-bottom: var(--border-width) solid var(--color-theme-1);

		.in-view {
			position: relative;

			display: flex;
			flex-direction: column;
			justify-content: flex-end;
			align-items: center;

			height: var(--height);
			width: 100%;

			&:after {
				content: '';
				position: absolute;
				left: 0;
				bottom: 0;

				height: 1em;
				width: 100%;
				background: linear-gradient(0deg, var(--color-background-1), transparent);
				z-index: 10;
			}

			img {
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);

				width: 100%;
				height: 100%;

				object-fit: cover;

				z-index: 1;
			}

			.content {
				position: relative;

				width: 100%;

				padding: 1em;

				background-color: hsla(0, 0%, 100%, 0.5);

				z-index: 2;

				.tags {
					display: flex;
					flex-wrap: nowrap;
					gap: 0.25em;

					padding-bottom: 0.5em;

					overflow: auto;
				}

				span {
					display: flex;
					align-items: center;
					gap: 0.25em;

					color: var(--color-text-highlight-1);
					font-size: 0.8em;
				}

				a {
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 6;
					width: 100%;

					color: var(--color-text-highlight-1);

					overflow: hidden;
					text-overflow: ellipsis;
				}

				.progress-bar {
					position: absolute;
					top: 0;
					left: 0;

					width: 0%;
					height: 0.15em;

					background-color: var(--color-theme-1);

					transition: width 0.25s;
				}
			}
		}

		.options {
			display: flex;
			flex-direction: row;
			justify-content: space-evenly;
			align-items: center;

			height: 100%;
			width: 100%;

			button {
				position: relative;
				flex: 1;

				display: grid;
				place-items: center;

				height: calc(calc(var(--height) / 4) * 1.2);
				aspect-ratio: 3/2;

				padding-inline: 1em;

				border: none;

				background-color: transparent;

				cursor: pointer;

				overflow: hidden;

				& > * {
					grid-area: 1/1/2/2;
				}

				&:after {
					content: '';
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);

					height: 100%;
					width: 100%;

					background: radial-gradient(circle, var(--color-theme-1) 0%, transparent 50%);

					z-index: 1;
					opacity: 0;
					transition: opacity var(--transition-fast);
					pointer-events: none;
				}

				&:hover:after {
					opacity: 0.5;
				}

				&.selected {
					&:after {
						background: radial-gradient(circle, var(--color-theme-1) 0%, transparent 75%);
						opacity: 1;
					}

					&:hover:after {
						opacity: 1;
					}
				}

				h2 {
					position: relative;

					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 3;

					padding: 0.25em;

					color: var(--color-text-1);
					font-size: 1.2em;
					text-overflow: ellipsis;

					pointer-events: none;
					overflow: hidden;

					z-index: 2;
					transition: opacity var(--transition-fast);
				}
			}

			hr {
				height: 4em;
				width: 3px;
				border: none;
				background-color: var(--color-theme-1);
				transform: skewY(355deg) rotateZ(7.5deg);
			}
		}
	}

	@media (max-width: 768px) {
		section {
			--height: 20em;

			.in-view {
				height: var(--height);
				flex: none;

				&:after {
					bottom: -1px;

					height: 1em;
				}

				.content {
					.tags {
						gap: 0.5em;
					}
				}
			}

			.options {
				flex-direction: column;

				border-left: none;
				// border-top: var(--border-width) solid var(--color-theme-1);

				button {
					min-height: 6em;
					aspect-ratio: auto;

					background-color: var(--color-background-1);

					&.selected {
						display: none;
					}

					h2 {
						margin: 0.25em;

						color: var(--color-text-1);
						text-align: start;
						font-weight: 600;
						font-size: 1.15em;

						opacity: 1;
					}
				}

				hr {
					height: 1px;
					width: 100%;
					transform: none;
				}
			}
		}
	}
</style>
