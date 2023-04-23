import i18next from 'i18next';
import en from './i18n/en';
import es from './i18n/es';

i18next.addResourceBundle('en', 'destinationsApp', en);
i18next.addResourceBundle('es', 'destinationsApp', es);

// eslint-disable-next-line no-restricted-exports
export { default } from './Destinations';
