<script>
	// »»»»» Imports
	import { marked } from 'marked';

	import { translate as _ } from '$i18n/translate';
	import { relativeTime } from '$lib/utils/date';

	// »»»»» Props
	let { data } = $props();
	let { post, user } = data;

	// »»»»» Components
	import Metadata from '$comp/structural/Metadata.svelte';
	import Tags from '$comp/design/Tags.svelte';
	import Icon from '$comp/commons/Icon.svelte';
</script>

<Metadata
	title={post.title}
	altTitle="Hardware, Software, Games e Cultura Geek"
	description="Fique por dentro das ultimas noticias de tecnologia, games, cultura geek e muito mais."
	keywords={['palavra1', 'palavra2']}
/>

<section>
	<div class="header">
		<div class="tags">
			{#each post.Tags as tag}
				<Tags {tag} />
			{/each}
		</div>
		<h1>
			{post.title}
			<span>
				<br />{post.subTitle}
			</span>
		</h1>
		<div class="details">
			<p><Icon icon="user" /> {post.Author.firstName + ' ' + post.Author.lastName}</p>
			<p><Icon icon="clock" /> {relativeTime(post.createdAt)}</p>
		</div>
	</div>

	<img src={post.imageHeader} alt={post.title} />

	{#if user.Role?.slug === 'admin'}
		<div class="options">
			<a href="/admin/posts/edit/{post.id}">
				<Icon icon="pencil" />
				{_('Editar')}
			</a>
			<hr class="vr" />
			{#if post.published}
				<a href="/posts/{post.slug}">
					<Icon icon="eye-lash" />
					{_('Transformar em Rascunho')}
				</a>
			{:else}
				<a href="/posts/{post.slug}">
					<Icon icon="eye" />
					{_('Publicar')}
				</a>
			{/if}
			<hr class="vr" />
			<a href="/posts/{post.slug}">
				<Icon icon="trash" />
				{_('Apagar')}
			</a>
		</div>
	{/if}

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

				span {
					color: var(--color-text-3);
					font-size: 0.75em;
				}
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

		.options {
			display: flex;
			gap: 1em;

			padding: 1em;

			border: var(--border-width) solid var(--color-theme-1);
			border-radius: var(--border-radius);

			a {
				display: flex;
				align-items: center;
				gap: 0.5em;
			}
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
