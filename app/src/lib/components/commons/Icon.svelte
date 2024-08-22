<script>
    // »»»»» Props
    export let icon = 'question-mark';

    // optional props
    export let title = undefined;
    export let customStyle = undefined;
</script>

<i class="ti ti-{icon}" {title} style="{customStyle}"></i>

<style>
    i {
        font-size: 1.25em;
    }
</style>