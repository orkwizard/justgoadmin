import i18next from 'i18next';
import en from './i18n/en';
import es from './i18n/es';

i18next.addResourceBundle('en', 'statesApp', en);
i18next.addResourceBundle('es', 'statesApp', es);

// eslint-disable-next-line no-restricted-exports
export { default } from './States';
