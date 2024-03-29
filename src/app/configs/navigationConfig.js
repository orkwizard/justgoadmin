import i18next from 'i18next';
import en from './navigation-i18n/en';
import es from './navigation-i18n/es';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('es', 'navigation', es);

const navigationConfig = [
  {
    id: 'destinations-component',
    title: 'Destinations',
    translate: 'DESTINATIONS',
    type: 'item',
    icon: 'heroicons-outline:ticket',
    url: 'destinations',
  },
  {
    id: 'states-component',
    title: 'States',
    translate: 'STATES',
    type: 'item',
    icon: 'heroicons-outline:view-list',
    url: 'states',
  },
  {
    id: 'countries-component',
    title: 'Countries',
    translate: 'COUNTRIES',
    type: 'item',
    icon: 'material-solid:view_list',
    url: 'countries',
  },
];

export default navigationConfig;
