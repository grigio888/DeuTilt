<script>
	// »»»»» Imports
	import { goto } from '$app/navigation';
	import { enhance } from '$app/forms';

	// »»»»» Logic
	let errorMessage = '';
</script>

{#if errorMessage}
	<p>{errorMessage}</p>
{/if}

<form
	action="?/login"
	method="POST"
	use:enhance={() => {
		return ({ result }) => {
			if (result?.type === 'failure') {
				errorMessage = result.data?.error;
				return;
			}

			goto('/admin/');
		};
	}}
>
	<input type="text" name="username" placeholder="Username" />
	<input type="password" name="password" placeholder="Password" />
	<button type="submit">Login</button>
</form>
