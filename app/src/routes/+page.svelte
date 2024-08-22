<script>
    // »»»»» Imports
    import { translate as _ } from '$i18n/translate';

    // »»»»» Components
    import Metadata from '$comp/structural/Metadata.svelte';

    import Header from '$comp/structural/header/Header.svelte';
</script>

<Metadata title="Pagina Inicial" description="Descrição da página inicial" keywords={['palavra1', 'palavra2']} />

<Header />

<h1>{_("Welcome to SvelteKit")}</h1>
