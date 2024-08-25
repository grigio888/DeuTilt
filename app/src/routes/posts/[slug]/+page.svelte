<script>
	// »»»»» Imports
	import { marked } from 'marked';

	// »»»»» Props
	let { data } = $props();
	let { post } = data;

	// »»»»» Components
	import Tags from '$comp/design/Tags.svelte';
</script>

<section>
	<img src={post.imageHeader} alt={post.title} />
	<div class="tags">
		{#each post.Tags as tag}
			<Tags {tag} />
		{/each}
	</div>
	<h1>
		{post.title}
	</h1>
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html marked(post.content)}
</section>
