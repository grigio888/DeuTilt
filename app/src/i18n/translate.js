import { get } from 'svelte/store';
import Langs from '$i18n/langs/langs.js';

import { locale } from '$i18n/store.js';

export function translate(phrase, ...args) {
	/* 
    This function will be used as the translation function in the
    svelte components

    Since the phrase will be obligatory in english, we can use it
    as the key for the translation object or simply return it if
    the locale is english.
    */
	let map = Langs[get(locale)] || {};
	let phraseTranslated = map[phrase];
	if (!phraseTranslated) phraseTranslated = phrase;

	if (args.length > 0) {
		// If there are arguments, we will replace the placeholders
		// with the arguments. If the value is 'value', then the
		// placeholder will be %(value)s
		args.forEach((value, index) => {
			// eslint-disable-line no-unused-vars
			Object.keys(value).forEach((key) => {
				phraseTranslated = phraseTranslated.replace(`%(${key})s`, value[key]);
			});
		});
	}

	return phraseTranslated;
}
