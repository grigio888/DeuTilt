<script>
	// »»»»» Imports
	import { marked } from 'marked';

	// »»»»» Props
	let { items } = $props();

	// »»»»» Components
	import Tags from '$comp/design/Tags.svelte';

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
		inView = post;
	}

	$effect(() => {
		refreshOptions();
	});
</script>

<section>
	<div class="in-view">
		<img src={inView.imageHeader} alt={inView.title} />
		<div class="content">
			<div class="tags">
				{#each inView.Tags as tag}
					<Tags {tag} />
				{/each}
			</div>
			<a href="/posts/{inView.slug}">
				<h2>{inView.title}</h2>
				<!-- eslint-disable-next-line svelte/no-at-html-tags -->
				{@html marked(inView.content.slice(0, 100) + '...')}
			</a>
		</div>
	</div>
	<div class="options">
		<button class="selected">
			<h2>{inView.title}</h2>
		</button>
		{#each options as option}
			<hr />
			<button onclick={() => setInView(option)}>
				<h2>{option.title}</h2>
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

				a {
					width: 100%;

					color: var(--color-background-1);

					h2 {
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;

						overflow: hidden;
						text-overflow: ellipsis;
					}
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

				height: calc(calc(var(--height) / 4) * 1.2);
				aspect-ratio: 3/2;

				border: none;

				background-color: transparent;

				cursor: pointer;

				overflow: hidden;

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
					display: flex;

					height: 6em;
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
