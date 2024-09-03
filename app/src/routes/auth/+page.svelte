<script>
	// »»»»» Imports
	import { enhance } from '$app/forms';
    import { translate as _ } from '$i18n/translate';

    // »»»»» Components
    import Input from '$comp/commons/inputs/Input.svelte';
    import Button from '$comp/commons/buttons/Button.svelte';

	// »»»»» Logic
	let errorMessage = '';
</script>

<form
	action="?/login"
	method="POST"
	use:enhance={() => {
		return ({ result }) => {
			if (result?.type === 'failure') {
				errorMessage = result.data?.error;
				return;
			}

			window.location.href = '/';
		};
	}}
>
    {#if errorMessage}
        <p>{errorMessage}</p>
    {/if}
    <label for="username">{_("Usuário")}</label>
	<Input type="text" id="username" name="username" placeholder={_("Usuário")} />
    <label for="password">{_("Senha")}</label>
	<Input type="password" id="password" name="password" placeholder={_("Senha")} />
	<Button type="submit">Login</Button>
</form>

<style lang="scss">
    form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 1em;

        height: 74vh;
        width: 30em;

        margin: auto;

        p {
            width: 100%;

            padding: .5em;

            border: var(--border-width) solid hsl(0, 100%, 50%);
            border-radius: var(--border-radius);

            color: hsl(0, 100%, 70%);
            text-align: center;
        }

        > :global(button) {
            width: 100%;
        }
    }

    @media (max-width: 30em) {
        form {
            width: 90%;
        }
    }
</style>
