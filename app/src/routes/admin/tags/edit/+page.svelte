<script>
	// »»»»» Imports
	import { translate as _ } from '$i18n/translate.js';

	// »»»»» Props
	let { data } = $props();
	let { pagination } = data;

	// »»»»» Components
	import Metadata from '$comp/structural/Metadata.svelte';
	import Tags from '$comp/design/Tags.svelte';
	import Button from '$comp/commons/buttons/Button.svelte';
	import Icon from '$comp/commons/Icon.svelte';
</script>

<Metadata robots="noindex, nofollow" title={_('Tags')} />

<section>
	<h2>{_('Tags')}</h2>

	<div class="group">
		{#each pagination.items as item}
			<div>
				<div class="content">
					<Tags tag={item} />
				</div>
				<div class="actions">
					<Button secondary animated href="/admin/tags/edit/{item.id}">
						<Icon icon="edit" />
					</Button>
					<Button secondary animated href="/admin/tags/delete/{item.id}">
						<Icon icon="trash" />
					</Button>
				</div>
			</div>
		{/each}
	</div>
	<div class="pagination">
		<Button
			notAllowed={!pagination.hasPrevious}
			secondary
			animated
			href="/admin/tags/edit?page={pagination.page - 1}"
		>
			<Icon icon="arrow-left" />
		</Button>
		<span>{_('Página')} {pagination.page} {_('de')} {pagination.totalPages}</span>
		<Button
			notAllowed={!pagination.hasNext}
			secondary
			animated
			href="/admin/tags/edit?page={pagination.page + 1}"
		>
			<Icon icon="arrow-right" />
		</Button>
	</div>
</section>

<style lang="scss">
	section {
		display: grid;
		gap: 1em;

		padding: 2em;

		h2 {
			text-align: center;
		}

		.group {
			display: grid;
			grid-template-columns: repeat(auto-fill, minmax(12em, 1fr));
			gap: 1em;

			width: 90%;

			margin-inline: auto;

			> div {
				display: flex;

				.content {
					flex: 1;

					:global(> *) {
						width: 100%;
						height: 100%;
						font-size: 1em;
						border-top-right-radius: 0;
						border-bottom-right-radius: 0;
					}
				}

				.actions {
					height: 100%;

					--border: var(--border-width) solid var(--color-theme-1);
					border-top: var(--border);
					border-right: var(--border);
					border-bottom: var(--border);
					border-radius: var(--border-radius);
					border-top-left-radius: 0;
					border-bottom-left-radius: 0;

					:global(a) {
						height: 50%;
						border: none;
						border-radius: 0;
					}

					:global(a + a) {
						border-top: var(--border-width) solid var(--color-theme-1);
					}
				}
			}
		}

		.pagination {
			display: flex;
			justify-content: space-between;
			align-items: center;

			width: 90%;

			margin-inline: auto;
		}
	}
</style>
