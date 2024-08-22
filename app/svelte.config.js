import adapter from '@sveltejs/adapter-node';
import { sveltePreprocess } from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: sveltePreprocess(
        {
            scss: true
        }
    ),
    kit: {
		adapter: adapter(),
        alias: {
            $i18n: './src/i18n',
            $comp: './src/lib/components',
        },
        version: {
            name: process.env.PUBLIC_APP_VERSION
        }
	}
};

export default config;
