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
		{#each options as option}
			<button onclick={() => setInView(option)}>
				<img src={option.imageHeader} alt={option.title} />
				<h2>{option.title}</h2>
			</button>
		{/each}
	</div>
</section>

<style lang="scss">
	section {
		--height: 30em;

		position: relative;

		display: flex;
		justify-content: center;
		align-items: center;

		margin-top: 2em;
		margin-inline: 1em;

		border: var(--border-width) solid var(--color-theme-1);
		border-radius: var(--border-radius);

		&:after {
			content: 'Destaques';
			position: absolute;
			top: 0;
			left: 2em;
			transform: translateY(-50%);

			display: block;

			padding: 0.25em 0.5em;

			border: var(--border-width) solid var(--color-theme-1);
			border-radius: var(--border-radius);

			background-color: var(--color-background-1);
			color: var(--color-theme-1);

			z-index: 10;
		}

		.in-view {
			position: relative;

			display: flex;
			flex-direction: column;
			justify-content: flex-end;
			align-items: center;

			flex: 1;
			height: var(--height);
			width: 100%;

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
			flex-direction: column;

			height: 100%;

			border-left: var(--border-width) solid var(--color-theme-1);

			button {
				position: relative;

				height: calc(calc(var(--height) / 4) * 1.2);
				aspect-ratio: 3/2;

				border: none;

				background-color: var(--color-theme-2);

				cursor: pointer;
				transition: border-color var(--transition-fast);

				overflow: hidden;

				&:hover {
					img {
						opacity: 0.5;
					}

					h2 {
						opacity: 1;
					}
				}

				img {
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);

					width: 101%;
					height: 101%;

					object-fit: cover;
					z-index: 1;

					transition: opacity var(--transition-fast);
				}

				h2 {
					position: relative;

					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 3;

					padding: 0.25em;

					font-size: 1.2em;

					opacity: 0;
					pointer-events: none;

					overflow: hidden;
					text-overflow: ellipsis;

					z-index: 2;
					transition: opacity var(--transition-fast);
				}
			}

			button + button {
				border-top: var(--border-width) solid var(--color-theme-1);
			}
		}
	}

	@media (max-width: 768px) {
		section {
			--height: 20em;
			flex-direction: column;

			margin-top: 1.5em;
			margin-inline: 0.5em;

			&:after {
				left: 50%;
				transform: translate(-50%, -50%);

				width: 90%;

				padding: 0em;

				font-size: 1.5em;
				text-align: center;
			}

			.in-view {
				height: var(--height);
				flex: none;

				.content {
					.tags {
						gap: 0.5em;
					}
				}
			}

			.options {
				border-left: none;
				border-top: var(--border-width) solid var(--color-theme-1);

				button {
					display: flex;

					height: 6em;
					aspect-ratio: auto;

					background-color: var(--color-background-1);

					&:hover {
						img {
							opacity: 1;
						}
					}

					img {
						position: static;
						top: auto;
						left: auto;
						transform: none;

						height: 100%;
						width: auto;
						aspect-ratio: 3/2;
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
			}
		}
	}
</style>
