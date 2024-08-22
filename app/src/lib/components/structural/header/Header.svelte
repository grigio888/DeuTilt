<script>
    // »»»»» Imports
    import { translate as _ } from '$i18n/translate';

    // »»»»» Components
    import Icon from '$comp/commons/Icon.svelte';
    import Button from '$comp/commons/buttons/Button.svelte';

    // »»»»» Logic
    let options = [
        {
            name: _("Posts"),
            href: "/posts",
            icon: "device-gamepad"
        },
        {
            name: _("Procurar"),
            href: "/procurar",
            icon: "search"
        },
    ]
</script>

<header>
    <a href="/" class="logo">
        <div class="icon">
            <Icon icon="x" />
            <Icon icon="device-gamepad" />
        </div>
        Deu Tilt
    </a>
    <nav>
        {#each options as option}
            <Button secondary animated href={option.href}>
                <Icon icon={option.icon} />
                {option.name}
            </Button>
        {/each}
    </nav>
</header>

<style lang="scss" scoped>
	header {
		position: sticky;
		top: 0;

        display: flex;
        justify-content: space-between;

		width: 100%;

		// padding: 0.75em 1em;

		border-bottom: var(--border-width) solid var(--color-theme-1);

		z-index: 5000; // 5000 is the default z-index of the header component

        .logo {
            display: flex;
            align-items: center;
            gap: 0.5em;

            margin-left: 1em;

            font-size: 1.15em;
            font-weight: bolder;
            text-transform: uppercase;

            .icon {
                position: relative;

                display: flex;
                align-items: center;

                :global(i) {
                    color: var(--color-theme-1);
                    font-size: 2em;
                }
                
                :global(.ti-x) {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    
                    color: var(--color-theme-2);
                    font-size: 2.5em;
                }
            }
        }

        nav {
            display: flex;

            :global(a) {
                width: 8em !important;
                height: 3em !important;

                font-size: 1em !important;

                border: none !important;
                border-radius: 0 !important;
            }
        }
    }
</style>
