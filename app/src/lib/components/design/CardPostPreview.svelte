<script>
	// »»»»» Props
	let { item } = $props();

	// »»»»» Components
	import Tags from '$comp/design/Tags.svelte';
</script>

<div class="card">
	<a href="/posts/{item.slug}">
		<img src={item.imageHeader} alt={item.title} />
	</a>
	<div class="tags">
		{#each item.Tags as tag}
			<Tags {tag} />
		{/each}
	</div>
	<a href="/posts/{item.slug}">
		<h2>{item.title}</h2>
	</a>
</div>

<style lang="scss">
	.card {
		border: var(--border-width) solid var(--color-theme-1);
		border-radius: var(--border-radius);

		width: 100%;
		aspect-ratio: 18/9;

		a {
			display: block;
			height: 100%;
			width: 100%;

			overflow: hidden;

			&:not(:last-child) {
				border-bottom: var(--border-width) solid var(--color-theme-1);
			}

			img {
				object-fit: cover;
				height: 100%;
				width: 100%;

				transition: transform 0.5s;

				&:hover {
					transform: scale(1.1);
				}
			}

			h2 {
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 5;

				height: auto;
				margin: 0.5em;
				margin-top: 0;

				font-size: 1.25rem;
				text-overflow: ellipsis;

				overflow: hidden;
			}
		}

		.tags {
			display: flex;
			gap: 0.5em;
			padding: 0.5em;
		}
	}

	@media (max-width: 768px) {
		.card {
			aspect-ratio: 27/9;

			a {
				h2 {
					-webkit-line-clamp: 3;
				}
			}
		}
	}
</style>
