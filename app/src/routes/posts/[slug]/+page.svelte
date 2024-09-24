<script>
	// »»»»» Imports
	import { PUBLIC_FEAT_COMMENTS } from '$env/static/public';
	import { marked } from 'marked';

	import { enhance } from '$app/forms';

	import { translate as _ } from '$i18n/translate';
	import { relativeTime } from '$lib/utils/date';

	// »»»»» Props
	let { data } = $props();
	let { post, comments, relatedPosts, user } = data;
    
    let commentPagination = $state(comments)

	// »»»»» Components
	import Metadata from '$comp/structural/Metadata.svelte';
	import Tags from '$comp/design/Tags.svelte';
	import Icon from '$comp/commons/Icon.svelte';
	import Input from '$comp/commons/inputs/Input.svelte';
	import Button from '$comp/commons/buttons/Button.svelte';
    import Pagination from '$comp/commons/pagination/Pagination.svelte';

    // »»»»» Functions
    async function getComments(page) {
        var response = await fetch(`/posts/${post.slug}/comments?page=${page}`)
        var result = await response.json()

        return result
    }

	// »»»»» Logic
	// The comment section is controlled by a FeatureFlag entry.
    //
    // After the page is ready, we load the comment section. With this, we intent
	// to not index the comments section in the search engines crawler. This is
	// to prevent the renewing of pages that are not necessary, which could affect
	// the SEO.
	let commentSection = $state(false);

	$effect(() => {
		commentSection = PUBLIC_FEAT_COMMENTS;
	});
</script>

<Metadata title={post.title} altTitle={post.subTitle} keywords={['palavra1', 'palavra2']} />

<section class="content">
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
			{#if post.editedAt}
				<p><Icon icon="edit" /> {relativeTime(post.editedAt)}</p>
			{:else}
				<p><Icon icon="clock" /> {relativeTime(post.createdAt)}</p>
			{/if}
		</div>
	</div>

	<img src={post.imageHeader} alt={post.title} />

	<hr />

	{#if user?.Role?.slug === 'admin'}
		<h3>Opções de Admin</h3>
		{#if !post.published}
			<div class="options">
				<Icon icon="info-hexagon-filled" />
				{_('Este post está como rascunho.')}
			</div>
		{/if}
		<div class="options">
			<a href="/admin/posts/edit/{post.id}">
				<Icon icon="pencil" />
				{_('Editar')}
			</a>
			<hr class="vr" />
			{#if post.published}
				<a href="/admin/posts/edit/{post.id}#action">
					<Icon icon="eye-off" />
					{_('Transformar em Rascunho')}
				</a>
			{:else}
				<a href="/admin/posts/edit/{post.id}#action">
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

		<hr />
	{/if}

	<div class="body">
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		{@html marked(post.content)}
	</div>
</section>

<section class="see-more">
	<h2 class="header alt">
		<Icon icon="circuit-resistor" />
		{_('Veja Também')}
		<Icon icon="circuit-resistor" />
	</h2>
	<ul>
		{#each relatedPosts as post}
			<li>
				<a href="/posts/{post.slug}">
					{post.title}
				</a>
			</li>
		{/each}
	</ul>
</section>

{#if commentSection}
	<section class="comments">
		<h2 class="header alt">
			<Icon icon="message-2" />
			{_('Comentários')}
			<Icon icon="message-2" />
		</h2>

        {#if commentPagination.totalItems > 0}
        {#each commentPagination.items as comment, i}
            {#if i != 0}
            <hr>
            {/if}
            <div class="comment">
                <div class="info">
                    <p>
                        <Icon icon="user" />
                        {comment.User.username}
                    </p>
                    <p class="date">
                        <Icon icon="clock" />
                        {relativeTime(comment.createdAt)}
                    </p>
                </div>
                <div class="content">
                    {@html marked(comment.content)}
                </div>
            </div>
        {/each}
        {#key commentPagination.page}
        <Pagination
            pagination={commentPagination}
            prevClick={async () => {
                commentPagination = await getComments(commentPagination.page - 1)
            }}
            nextClick={async () => {
                commentPagination = await getComments(commentPagination.page + 1)
            }}
        />
        {/key}
        {:else}
            <div class="comment">
                <div class="content">
                    <p>{_('Nenhum comentário ainda.')}</p>
                </div>
            </div>
        {/if}

		<div class="wrapper">
			<form method="POST" use:enhance={({ formElement }) => {
                return async ({ result }) => {
                    formElement.reset()
                    commentPagination = result?.data?.comments
                }
            }}>
				<h3>{_('Deixe um comentário')}</h3>
				<div class="inputs">
                    {#if !user}
					<div class="row identity">
						<div class="row">
							<label for="name">{_('Nome')}</label>
							<Input id="name" type="text" name="name" required placeholder={_('Seu nome')} />
						</div>
						<div class="row">
							<label for="email">{_('Email')}</label>
							<Input id="email" type="email" name="email" required placeholder={_('Seu email')} />
						</div>
					</div>
                    {/if}
					<div class="row content">
						<label for="comment">{_('Comentário')}</label>
						<Input
							element="textarea"
							id="comment"
							type="text"
							name="comment"
							placeholder={_('Escreva seu comentário aqui...\n(Aceita Markdown)')}
							required
						/>
					</div>
				</div>
				<div class="buttons">
					<Button type="submit">
						<Icon icon="send" />
						{_('Enviar')}
					</Button>
					<Button secondary animated type="button" onclick={() => console.log('preview')}>
						<Icon icon="search" />
						{_('Pré-visualizar')}
					</Button>
				</div>
			</form>
		</div>
	</section>
{/if}

<style lang="scss">
	section {
		display: grid;
		gap: 2em;

		max-width: 60em;

		padding: 2em;
		margin-inline: auto;

		.header.alt {
			display: flex;
			align-items: center;
			justify-content: center;
			gap: 2em;

			font-size: 1.5em;

			:global(.ti) {
				color: var(--color-theme-1);
			}
		}
	}

	.content {
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
			height: 25em;
			object-fit: cover;

			border: var(--border-width) solid var(--color-theme-1);
			border-radius: var(--border-radius);

			box-shadow: 0 0 1em var(--color-theme-1);
		}

		hr:not(.vr) {
			width: 100%;
			height: var(--border-width);

			border: none;
			background-color: var(--color-theme-1);
		}

		.options {
			display: flex;
			align-items: center;
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
			gap: 2em;

			font-size: 1em;
        }
	}

	.see-more {
		ul {
			display: grid;
			gap: 1em;

			padding: 1em;

			list-style-type: none;

			li {
				display: flex;
				align-items: center;
				gap: 0.5em;

				&:before {
					content: '» ';

					color: var(--color-theme-1);
					font-size: 1.75em;
				}

				a {
					text-decoration: underline;

					transition: color var(--transition-fast);

					&:hover {
						color: var(--color-theme-1);
					}
				}
			}
		}
	}

	.comments {

        hr {
            width: 100%;
            height: var(--border-width);

            border: none;
            background-color: var(--color-theme-1);
        }

        .comment {
            display: grid;
            gap: 1.5em;

            .info {
                display: flex;
                justify-content: space-between;

                text-transform: capitalize;

                p {
                    display: flex;
                    align-items: center;
                    gap: 0.5em;
                }
            }
        }

		.wrapper {
			display: grid;

			border: var(--border-width) solid var(--color-theme-1);
			border-radius: var(--border-radius);

			form {
				--gap: 1em;

				display: grid;
				gap: var(--gap);

				padding: 1em;

				h3 {
					width: 100%;
					text-align: center;
				}

				.inputs {
					flex: 1;
					display: grid;
					gap: var(--gap);

					.row {
						display: grid;
						gap: 0.25em;
					}
					> .identity {
						display: flex;
						gap: var(--gap);

						> div {
							flex: 1;
						}
					}

					.content {
						:global(textarea) {
							min-height: 7.5em;
							resize: vertical;
						}
					}
				}

				.buttons {
					display: flex;
					gap: var(--gap);
					height: 80.75%;

					:global(button) {
                        flex: 1;
						
                        display: flex;
						flex-direction: row;

						height: 100%;

                        padding: 0.75em;
					}
				}
			}
		}
	}

    .content .body,
    .comments .comment .content {
        :global(a) {
            text-decoration: underline;

            transition: color var(--transition-fast);

            &:hover {
                color: var(--color-theme-1);
            }
        }

        :global(ul) {
            list-style-type: disc;
        }

        :global(li) {
            margin-left: 1em;
            list-style: outside;

            &::marker {
                color: var(--color-theme-1);
            }
        }

        :global(li + li) {
            margin-top: 0.5em;
        }

        :global(p:has(img)) {
            display: flex;
            justify-content: center;
            gap: 1em;
        }

        :global(img),
        :global(iframe),
        :global(.polaroid-frame) {
            width: 90%;

            margin-block: 1em;
            margin-inline: auto;
        }

        :global(img),
        :global(iframe),
        :global(.polaroid-frame),
        :global(code) {
            border: var(--border-width) solid var(--color-theme-1);
            border-radius: var(--border-radius);

            box-shadow: 0 0 1em var(--color-theme-1);
        }

        :global(img) {
            position: relative;

            height: auto;

            object-fit: cover;
        }

        :global(iframe) {
            height: 30em;
        }

        :global(blockquote) {
            display: grid;
            gap: 0.5em;

            padding: 1em;
            margin: 1em 0;

            border: 1px solid var(--color-theme-1);
            border-left-width: 4px;
            border-radius: var(--border-radius);

            background-color: var(--color-background-1);
        }

        :global(.polaroid-frame) {
            display: flex;
            flex-direction: column;
            align-items: end;

            background-color: var(--color-background-3);

            overflow: hidden;
        }
        :global(.polaroid-frame img) {
            width: 100%;
            height: auto;
            margin: 0;

            border: none;
            border-bottom: var(--border-width) solid var(--color-theme-1);
            border-radius: 0;
        }
        :global(.polaroid-frame p) {
            font-size: 0.85em;
            padding: 0.5em;
            color: var(--color-text-2);
        }

        :global(code) {
            padding: 0.1em 0.25em;

            background-color: var(--color-background-3);
        }

        :global(hr) {
            width: 75%;
            height: var(--border-width);

            margin-inline: auto;

            border: none;
            background-color: var(--color-theme-1);
        }
    }

	@media (max-width: 768px) {
		section {
			padding: 1em;

			.header {
				justify-content: space-between;
				gap: 0;
			}
		}

		.content {
			font-size: 1.1em;

			.tags {
				:global(> *) {
					font-size: 1em;
				}
			}

			.details {
				display: flex;
				flex-direction: column;
				gap: 1em;
			}

			img {
				height: 12.5em;
			}

			.options {
				flex-direction: column;
				gap: 1em;

				hr {
					width: 100%;
					height: var(--border-width);
				}
			}

			.body {
				:global(img),
				:global(iframe),
				:global(.polaroid-frame) {
					width: 100%;
					height: auto;
				}

				:global(img) {
					height: auto;
				}

				:global(iframe) {
					height: 20em;
				}

				:global(hr) {
					width: 90%;
				}
			}
		}

		.see-more {
			ul {
				padding: 0;
			}
		}

		.comments {
			.wrapper {
				form {
					--gap: 1em;

					display: grid;

					h3 {
						width: 100%;
						text-align: center;
					}

					.inputs {
						display: grid;

						> .identity {
							display: grid;
						}
					}

					.buttons {
						display: flex;
						flex-direction: column-reverse;

						height: auto;

						:global(button) {
							flex-direction: row;
						}
					}
				}
			}
		}
	}
</style>
