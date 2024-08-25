<script>
    // »»»»» Props
    let { data } = $props();
    let { pagination } = data;
</script>

{#each pagination.items as item}
    <a href="/posts/{item.slug}">
        <h2>{item.title}</h2>
    </a>
{/each}