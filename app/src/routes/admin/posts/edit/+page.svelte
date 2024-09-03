<script>
	// »»»»» Imports
	import { translate as _ } from '$i18n/translate.js';
	import { relativeTime } from '$lib/utils/date';

	// »»»»» Props
	let { data } = $props();
	let { pagination } = data;

	// »»»»» Components
	import Button from '$comp/commons/buttons/Button.svelte';
	import Icon from '$comp/commons/Icon.svelte';
</script>

<section>
	<h2>{_('Posts')}</h2>

	<div class="group">
		{#each pagination.items as item}
			<div>
				<div class="frame">
					<img src={item.imageHeader} alt={item.title} />
				</div>
				<div class="content">
					<div class="upper">
						<p>{item.title}</p>
						<p>{item.subTitle}</p>
					</div>
					<div class="lower">
						<p class="date">
							<Icon icon="clock" />
							{relativeTime(item.createdAt)}
							<Icon icon="user" />
							{item.Author?.firstName}
						</p>
						{#if item.editedAt}
							<p class="date">
								<Icon icon="edit" />
								{relativeTime(item.editedAt)}
							</p>
						{/if}
					</div>
				</div>
				<div class="actions">
					<Button secondary animated href="/posts/{item.slug}">
						<Icon icon="eye" />
					</Button>
					<Button secondary animated href="/admin/posts/edit/{item.id}">
						<Icon icon="edit" />
					</Button>
					<Button secondary animated href="/admin/posts/delete/{item.id}">
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
			href="/admin/posts/edit?page={pagination.page - 1}"
		>
			<Icon icon="arrow-left" />
		</Button>
		<span>{_('Página')} {pagination.page} {_('de')} {pagination.totalPages}</span>
		<Button
			notAllowed={!pagination.hasNext}
			secondary
			animated
			href="/admin/posts/edit?page={pagination.page + 1}"
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
			gap: 1em;

			width: 90%;

			margin-inline: auto;

			> div {
				display: flex;
				gap: 0.5em;

				border: var(--border-width) solid var(--color-theme-1);
				border-radius: var(--border-radius);

				.frame {
					--size: 6em;

					width: var(--size);
					height: var(--size);

					margin: 0.5em;

					border: var(--border-width) solid var(--color-theme-1);
					border-radius: var(--border-radius);

					img {
						width: 100%;
						height: 100%;
						object-fit: cover;
					}
				}

				.content {
					flex: 1;

					display: flex;
					flex-direction: column;
					justify-content: space-between;

					padding: 0.5em;
					padding-left: 0;

					font-size: 0.9em;

					p:not(.date) {
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 1;
						text-overflow: ellipsis;
						overflow: hidden;
					}

					.date {
						display: flex;
						align-items: center;
						gap: 0.25em;
					}
				}

				.actions {
					height: 100%;

					border-left: var(--border-width) solid var(--color-theme-1);

					:global(a) {
						height: 33%;
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
