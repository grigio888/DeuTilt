<script>
	// »»»»» Imports
	import { marked } from 'marked';

	// »»»»» Props
	let { posts } = $props();

	if (!posts)
		posts = [
			{
				slug: 'amd-to-establish-two-rd-facilities-in-taiwan',
				title:
					'AMD To Establish Two R&D Facilities In Taiwan, Total Cost Reaching Up To $270 Million',
				imageHeader:
					'https://cdn.wccftech.com/wp-content/uploads/2024/08/DSC_0870.original-728x484.jpg',
				content: `
AMD plans to set up two R&D centers in Taiwan in collaboration with the local government, with total investments planned to be $270 million.

## AMD Is Now Eager To Place Itself At The Heart of Taiwan, Recruiting Local Talent & Collaborating With Supply Chain Partners
The strategic importance of Taiwan for mainstream tech companies like NVIDIA and AMD is growing more than ever. With the AI hype coming into play, tech giants are moving towards closer collaboration with their supply chain partners to ensure a more extensive collaboration and, of course, monitor overall progress. After rumors of both NVIDIA and AMD setting up their facilities in Taiwan, it looks like we now have Team Red's plans of execution, and they sure look interesting.
            `
			},
			{
				slug: 'amd-ryzen-ai-9-hx-370-apu-tested-in-mini-pc',
				title:
					'AMD Ryzen AI 9 HX 370 APU Tested In Mini PC Configuration, Radeon 890M iGPU Shines With Great 1080p Gaming Performance',
				imageHeader:
					'https://cdn.wccftech.com/wp-content/uploads/2024/06/AMD-Ryzen-AI-300-Laptops-Launch-728x410.jpg',
				content: `
The first Mini PC featuring AMD Ryzen AI 9 HX 370 APU has been tested and its Radeon 890M iGPU shines in gaming benchmarks.

AMD Ryzen AI 300 Mini PCs Deliver Much Capable Gaming Performance Thanks To Radeon 890M iGPU
It has been a few weeks since AMD launched its Zen 5-based Ryzen AI 300 APUs aka Strix-Point for gaming laptops and mobile platforms. Several notebook manufacturers have already announced new gaming laptops with the latest Strix APUs but we haven't seen a mini-PC being announced with one of these chips. Although the estimated date for these mini-PCs is early October, ETA Prime has showcased the first benchmarks for one of these Mini PCs before its official launch.
            `
			}
		];

	// »»»»» Logic
	// determining which post is in view
	let inView = $state(posts[0]);

	// fetching the next 4 posts that comes after the inView post
	let options = $state([]);

	// refreshing the options
	function refreshOptions() {
		// resetting the options
		let newOptions = [];

		// fetching the next 4 posts that comes after the inView post
		for (let i = 1; i < 5; i++) {
			newOptions.push(
				posts[(posts.findIndex((post) => post.title === inView.title) + i) % posts.length]
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
	<a href="/posts/{inView.slug}" class="in-view">
		<img src={inView.imageHeader} alt={inView.title} />
		<div>
			<h2>{inView.title}</h2>
			<!-- eslint-disable-next-line svelte/no-at-html-tags -->
			{@html marked(inView.content.slice(0, 100) + '...')}
		</div>
	</a>
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

			div {
				width: 100%;

				padding: 1em;

				background-color: hsla(0, 0%, 100%, 0.5);
				color: var(--color-background-1);

				z-index: 2;

				h2 {
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;

					overflow: hidden;
					text-overflow: ellipsis;
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

			.in-view {
				height: var(--height);
				flex: none;
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
