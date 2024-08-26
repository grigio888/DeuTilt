<script>
	// »»»»» Imports
	import { marked } from 'marked';
    import { translate as _ } from '$i18n/translate';
    import { relativeTime } from '$lib/utils/date';

	// »»»»» Props
	let { data } = $props();
	let { post } = data;

	// »»»»» Components
	import Tags from '$comp/design/Tags.svelte';
    import Icon from '$comp/commons/Icon.svelte';
</script>

<section>
    <div class="header">
        <div class="tags">
            {#each post.Tags as tag}
                <Tags {tag} />
            {/each}
        </div>
        <h1>
            {post.title}
        </h1>
        <div class="details">
            <p><Icon icon="user" /> {post.Author.firstName + ' ' + post.Author.lastName}</p>
            <p><Icon icon="clock" /> {relativeTime(post.createdAt)}</p>
        </div>
    </div>

	<img src={post.imageHeader} alt={post.title} />

    <div class="body">
        <!-- eslint-disable-next-line svelte/no-at-html-tags -->
        {@html marked(post.content)}
    </div>
</section>

<style lang="scss">
    section {
        display: grid;
        gap: 2em;

        max-width: 70em;

        padding: 2em;
        margin-inline: auto;


        .header {
            display: grid;
            gap: 1em;

            .tags {
                display: flex;
                gap: 0.5em;
                overflow-x: auto;
            }

            h1 {
                font-size: 2em;
            }

            .details {
                display: flex;
                justify-content: space-between;

                p {
                    display: flex;
                    align-items: center;
                    gap: 0.5em;
                }
            }
        }

        img {
            width: 100%;
            height: 20em;
            object-fit: cover;

            border: var(--border-width) solid var(--color-theme-1);
            border-radius: var(--border-radius);

            box-shadow: 0 0 1em var(--color-theme-1);
        }

        .body {
            display: flex;
            flex-direction: column;
            gap: 1em;

            font-size: 1.25em;
        }
    }

    @media (max-width: 768px) {
        section {
            padding: 1em;
        }
    }
</style>
