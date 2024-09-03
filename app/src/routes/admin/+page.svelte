<script>
	// »»»»» Imports
	import { translate as _ } from '$i18n/translate';

	// »»»»» Props
	let { data } = $props();
</script>

<h1>{_('Painel de Admin')}</h1>

<p>{_('Olá,')} {data.user.firstName}!</p>
<p>{_('Seja bem-vindo ao painel de administração do site.')}</p>

<p>{_('Aqui você pode gerenciar todos os conteúdos do site.')}</p>

<p>{_('Escolha uma das opções no menu lateral para começar.')}</p>

<style>
	h1 {
		margin-top: 1em;
	}

	* {
		text-align: center;
	}
</style>
