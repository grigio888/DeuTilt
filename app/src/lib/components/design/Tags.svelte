<script>
	// »»»»» Props
	let { tag } = $props();
</script>

<a href="/posts/?tag={tag.slug}" style="--color-1: {tag.color}">
	{tag.title}
</a>

<style lang="scss">
	a {
		--color-2: hsl(from var(--color-1) h s 75%);

		width: fit-content;
		height: fit-content;

		padding: 0.25em 0.5em;

		border: var(--border-width) solid var(--color-1);
		border-radius: var(--border-radius);

		background-color: var(--color-2);

		font-size: 0.8em;
		color: var(--color-1);
		text-align: center;
		text-wrap: nowrap;
	}
</style>
