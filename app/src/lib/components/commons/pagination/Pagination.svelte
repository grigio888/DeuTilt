<!-- 
    Pagination component, type 1.

    This component has a previous and a next button, which are
    disabled when there is no previous or next page, respectively,
    and a text showing the current page and the total number of pages.
-->

<script>
    // »»»»» Imports
    import { page } from '$app/stores';

    import { translate as _ } from '$i18n/translate';

    // »»»»» Props
    let { pagination, endpoint, prevClick, nextClick } = $props();

    // »»»»» Components
    import Icon from '$lib/components/commons/Icon.svelte';
    import Button from '$lib/components/commons/buttons/Button.svelte';

    // »»»»» Logic
    let destination = endpoint ? endpoint : $page.url.pathname;
</script>

<div class="pagination">
	<Button
		notAllowed={!pagination.hasPrev}
		secondary
		animated
		href={
            pagination.hasPrev && !prevClick
            ? `${destination}?page=${pagination.page - 1}`
            : undefined
        }
        onclick={prevClick}
	>
		<Icon icon="chevron-left" />
	</Button>
	<span>{_('Página %(value1)s de %(value2)s', { value1: pagination.page, value2: pagination.totalPages })}</span>
	<Button
		notAllowed={!pagination.hasNext}
		secondary
		animated
		href={
            pagination.hasNext && !nextClick
            ? `${destination}?page=${pagination.page + 1}`
            : undefined
        }
        onclick={nextClick}
	>
		<Icon icon="chevron-right" />
	</Button>
</div>

<style>
    .pagination {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1em;
	}
</style>