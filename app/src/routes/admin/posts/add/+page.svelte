<script>
	// »»»»» Props
	let { data } = $props();

	// »»»»» Components
	import Form from '../Form.svelte';
</script>

<main>
	<h1>Criar Post</h1>
	<Form {...data} />
</main>

<style lang="scss">
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		margin-inline: auto;

		h1 {
			margin-top: 1em;

			text-align: center;
		}
	}
</style>
