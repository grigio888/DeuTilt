<script>
    // »»»»» Imports
    import { relativeTime } from '$lib/utils/date';

	// »»»»» Props
	let { item } = $props();

	// »»»»» Components
	import Tags from '$comp/design/Tags.svelte';
    import Icon from '$comp/commons/Icon.svelte';
</script>

<div class="card">
	<a href="/posts/{item.slug}">
		<img src={item.imageHeader} alt={item.title} />
	</a>
    <div class="body">
        <div class="tags">
            {#each item.Tags as tag}
                <Tags {tag} />
            {/each}
        </div>
        <span><Icon icon="clock" /> {relativeTime(item.createdAt)}</span>
        <a href="/posts/{item.slug}">
            <h2>{item.title}</h2>
        </a>
    </div>
</div>

<style lang="scss">
	.card {
		border: var(--border-width) solid var(--color-theme-1);
		border-radius: var(--border-radius);

		width: 100%;
		aspect-ratio: 18/9;

        transition: box-shadow, transform;
        transition-duration: var(--transition-slow);

        &:hover {
            transform: scale(1.01);
            box-shadow: 0 0 1em var(--color-theme-1);
        }

		a {
			display: block;
			height: 100%;
			width: 100%;

			overflow: hidden;

			img {
				object-fit: cover;
				height: 100%;
				width: 100%;

				transition: transform var(--transition-slow);

				&:hover {
					transform: scale(1.05);
				}
			}

			h2 {
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 4;

				height: auto;

				font-size: 1.25rem;
				text-overflow: ellipsis;

				overflow: hidden;
			}
		}

        .body {
            height: 12.5em;

            padding: 0.5em;

            border-top: var(--border-width) solid var(--color-theme-1);

            span {
                display: flex;
                align-items: center;
                gap: 0.25em;
            }

            .tags {
                display: flex;
                gap: 0.5em;
                padding-bottom: 0.5em;
    
                overflow-x: auto;
            }
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
