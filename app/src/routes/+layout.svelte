<script>
    // »»»»» Imports
    import './styles.css';

    import { locale } from '$i18n/store.js';
    
    // »»»»» Props
    export let data;

    // » Refreshing locale
    //   - Auto update when the user changes language in the configuration.
    $: locale.set(data?.lang);
</script>

<slot />
